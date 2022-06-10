import styles from "./WatchItemDetails.module.scss";
import WatchItemsList from "./WatchItemsList";
import { SourceContext } from "../../context/source.context";
import { useContext } from "react";
import axios from "axios";


function WatchItemDetails({ item }) {

    const { API_URL } = useContext(SourceContext);

    const addItem = () => {
        console.log("ADDING ITEM :)")
        const requestBody = {
            imdbId: item.id,
            type: item.type,
            title: item.title,
            synopsis: item.plot,
            imageUrl: item.image,
            rating: item.imDbRating,
        };
        console.log(requestBody)

        axios
        .post(`${API_URL}/api/items/new`, requestBody)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }

    return (
        <section className={styles.section} >
            <h2 className={styles.title} >
                {item.title} 
            </h2>
            <p onClick={addItem} >{item.plot}</p>
            <button onClick={addItem}> Add to DB </button>
            <WatchItemsList list={item.similars} listTitle="Similar titles" />
        </section>
    );
}

export default WatchItemDetails;