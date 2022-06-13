// Modules:
import { SourceContext } from "../../../context/source.context";
import { useContext, useState } from "react";
import axios from "axios";

// Styles:
import styles from "./FindUserForm.module.scss";

// Components:
import UsersList from "./UsersList";

function FindUserForm() {
    const {API_URL} = useContext(SourceContext);
    
    const [ searchText, setSearchText] = useState("");
    const [ searching, setSearching] = useState(false);
    const [ searchResults, setSearchResults] = useState([]);
    
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
                .get(API_URL+ "/api/users/search/"+ searchText)
                // Save results in state variable
                .then((response) => {
                    console.log(response.data);
                    setSearchResults(response.data);
                    // Reset form input
                    setSearchText("")
                    setSearching(false);
                })
                .catch((error) => {
                    console.log(error.response.data.message)
                });
        }
    };

    return (
        <>
            <h2 className={styles.title}>Find other users</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <svg className={styles.form__icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
                <input 
                    className={styles.form__input} 
                    placeholder="Search by username or email"
                    type="text"
                    name="searchText"
                    value={searchText}
                    onChange={handleSearchText}
                />
                <button className={styles.form__button} type="submit">Search</button>
                {searching && <p>loading...</p>}
            </form>
            {
                searchResults && searchResults.map(i=> i.name)
                
            }
        </>
    );
}

export default FindUserForm;