// Modules:
import { SourceContext } from "../../../context/source.context";
import { useContext, useState } from "react";
import axios from "axios";

// Styles:
import styles from "./FindListForm.module.scss";

// Components:
import ListsList from "./ListsList";

function FindListForm() {
    const {API_URL} = useContext(SourceContext);
    
    const [ searchText, setSearchText] = useState("");
    const [ searching, setSearching] = useState(false);
    const [ searchResults, setSearchResults] = useState([]);
    const [ errorMessage, setErrorMessage] = useState("");
    
    // SEARCH TEXT:
    const handleSearchText = (e) => setSearchText(e.target.value);

    // SEARCH RESULTS:
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("SEARCH", searchText);
        if(searchText.length > 0) {
            setSearching(true);
            setSearchResults([]);
            axios
                // Call external IMDb API
                .get(API_URL+ "/api/lists/name/"+ searchText)
                // Save results in state variable
                .then((response) => {
                    console.log(response.data);
                    setSearchResults(response.data);
                    // Reset form input
                    setSearchText("");
                    setErrorMessage("");
                    setSearching(false);
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                    setErrorMessage(`${error.response.data.message} for "${searchText}"`);
                    setSearchText("")
                    setSearching(false);
                });
        }
    };

    return (
        <>
            <h2 className={styles.title}>Find WatchLists</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <svg className={styles.form__icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
                <input 
                    className={styles.form__input} 
                    placeholder="Search by WatchList name"
                    type="text"
                    name="searchText"
                    value={searchText}
                    onChange={handleSearchText}
                />
                <button className={styles.form__button} type="submit">Search</button>
                {searching && <p>loading...</p>}
            </form>
            {searchResults.length > 0 && 
                <ListsList listTitle="Results for your search" allLists={searchResults} />
            }
            {errorMessage !== "" && <p className={styles.messageText}>{errorMessage}</p>}
        </>
    );
}

export default FindListForm;