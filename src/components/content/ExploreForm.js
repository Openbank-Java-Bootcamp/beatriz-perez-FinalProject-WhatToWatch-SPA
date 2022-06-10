import { SourceContext } from "../../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import styles from "./ExploreForm.module.scss";

function Exploreform() {
    const { externalContent_API_url, externalContent_API_key } = useContext(SourceContext);
    const [ search, setSearch] = useState("");
    const [ result, setResult] = useState(null);
    const handleSearch = (e) => setSearch(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get(externalContent_API_url + "Search" + externalContent_API_key + search)
            .then((response) => {
                setResult(response.data);
              })
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
                    name="search"
                    value={search}
                    onChange={handleSearch}
                />
            </form>
            {result && 
                <div>
                    <h2>{result.expression}</h2>
                    {result.results.map(item => <p>{item.title}</p>)}
                </div>
            }
        </>
    );
}

export default Exploreform;