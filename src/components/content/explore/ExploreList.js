import styles from "./ExploreList.module.scss";
import { Link } from "react-router-dom";
import { SourceContext } from "../../../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import WatchItemCard from "./../WatchItemCard";

function ExploreList({ listTitle, list }) {

    const [items, setItems] = useState([]);
    
    useEffect(() => {
        setItems(list);
    }, []);
    
    console.log(items);

    return (
        <section className={styles.section} >
            <h2 className={styles.title} >{listTitle}</h2>
            <ul className={styles.list} >
                {items.map(item =>
                    <Link key={item.id} to={`/imdbitem/${item.id}`}>
                        <WatchItemCard item={item} />
                    </Link>
                )}
            </ul>
        </section>
    );
}
export default ExploreList;