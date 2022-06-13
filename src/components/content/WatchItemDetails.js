import styles from "./WatchItemDetails.module.scss";
import WatchItemsList from "./WatchItemsList";
import { SourceContext } from "../../context/source.context";
import { useContext } from "react";
import axios from "axios";
import ExploreList from "../../components/content/explore/ExploreList";



function WatchItemDetails({ item }) {

    const { API_URL } = useContext(SourceContext);

    const addItem = () => {
        console.log("ADDING ITEM :)")
        const requestBody = {
            imdbId: item.id,
            type: item.type,
            title: item.title,
            synopsis: item.plot,
            image: item.image,
            rating: item.imDbRating,
            genres: item.genreList.map(i => { return {name: i.value}})
        };
        console.log(requestBody)

        axios
        .post(`${API_URL}/api/items/new`, requestBody)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
    console.log(item.similars)

    return (
        <section className={styles.section} >
            <h2 className={styles.title} >{item.title}</h2>
            <p >{item.plot}</p>

            <button onClick={addItem}> Add to DB </button>

            <ExploreList listTitle="Similar titles" source="list" list={item.similars} />
        </section>
    );
}

export default WatchItemDetails;