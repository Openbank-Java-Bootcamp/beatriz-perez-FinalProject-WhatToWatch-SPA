import { SourceContext } from "../../../context/source.context";
import { useContext, useState } from "react";
import axios from "axios";
import styles from "./ExploreForm.module.scss";
import ExploreList from "./ExploreList";

function Exploreform() {
    const { externalContent_API_url, externalContent_API_key } = useContext(SourceContext);
    
    const [ searchText, setSearchText] = useState("");
    const [ searchResults, setSearchResults] = useState([]);
    
    // SEARCH TEXT:
    const handleSearchText = (e) => setSearchText(e.target.value);

    // SEARCH RESULTS:
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            // Call external IMDb API
            .get(externalContent_API_url + "SearchTitle" + externalContent_API_key + "/"+ searchText)
            // Save results in state variable
            .then((response) => {setSearchResults(response.data.results);})
            // Reset form input
            .then(setSearchText(""))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <h2 className={styles.title}>Search the IMDb data base</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <svg className={styles.form__icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
                <input 
                    className={styles.form__input} 
                    placeholder="Search content by title"
                    type="text"
                    name="searchText"
                    value={searchText}
                    onChange={handleSearchText}
                />
                <button className={styles.form__button} type="submit">Search</button>
            </form>
            {searchResults.length > 0 && 
                <ExploreList listTitle="Results for your search" list={searchResults} />
            }
        </>
    );
}

export default Exploreform;