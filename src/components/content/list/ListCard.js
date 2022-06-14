// Images:
import defaultBanner from "../../../images/default-banner.jpg";

// Styles:
import styles from "./ListCard.module.scss";

function ListCard({ list }) {
    return (
        <article className={styles.card}>
            <h2 className={styles.card__username} >{list.name}</h2>
            <h3 className={styles.card__name} >{list.description}</h3>
            <p> {`participants: ${list.participants.length}`} </p>
            <p> {`WatchItems: ${list.watchItems.length}`} </p>
            <img className={styles.card__image} src={list.imageUrl || defaultBanner} alt="user profile"/>
        </article>
    );
}

export default ListCard;