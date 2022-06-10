import styles from "./WatchItemsList.module.scss";
import { Link } from "react-router-dom";
import { SourceContext } from "../../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import WatchItemCard from "./WatchItemCard";

function WatchItemsList({ list, listTitle, searchString }) {

    const { externalContent_API_url, externalContent_API_key } = useContext(SourceContext);
    const [items, setItems] = useState([]);
    const [showingItems, setShowingItems] = useState([]);

    const storeItems = (items) => {
        localStorage.setItem(searchString, JSON.stringify(items));
    };
    const updateListData = () => {
        localStorage.removeItem(searchString);
        getAllItems();
    };
    const getAllItems = () => {
        const storedItems = JSON.parse(localStorage.getItem(searchString));
        if(storedItems) {
            console.log(searchString + "GETTING ITEMS FROM LOCAL STORAGE")
            setItems(storedItems);
            setShowingItems([...storedItems].slice(0, 5));
        } else {
            console.log(searchString + "GETTING ITEMS FROM IMDb API")
            axios
            .get(externalContent_API_url + searchString + externalContent_API_key)
            .then((response) => {
                setItems(response.data.items);
                storeItems(response.data.items);
                setShowingItems([...response.data.items].slice(0, 5));
              })
            .catch((error) => console.log(error));
        }
    };
    
    useEffect(() => {
    if(list){
        setItems(list);
        setShowingItems([...list].slice(0, 5));
    } else getAllItems() ;
    }, []);
    
    console.log(showingItems);

    return (
        <section className={styles.section} >
            <h2 className={styles.title} >
                {listTitle}
                {
                    !list && 
                    <button onClick={updateListData}>
                        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                        </svg>
                    </button>
                }
            </h2>
            <ul className={styles.list} >
                {
                    showingItems.map(item =>
                        <Link key={item.id} to={`/title/${item.id}`}>
                            <WatchItemCard item={item} />
                        </Link>
                    )
                }
            </ul>
        </section>
    );
}
export default WatchItemsList;