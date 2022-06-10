import styles from "./WatchItemDetails.module.scss";
import WatchItemsList from "./WatchItemsList";

function WatchItemDetails({ item }) {
    return (
        <section className={styles.section} >
            <h2 className={styles.title} >
                {item.title} 
            </h2>
            <p>{item.plot}</p>
            <WatchItemsList list={item.similars} listTitle="Similar titles" />
        </section>
    );
}

export default WatchItemDetails;