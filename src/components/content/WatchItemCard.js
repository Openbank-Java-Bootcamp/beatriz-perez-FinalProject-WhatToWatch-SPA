import styles from "./WatchItemCard.module.scss";

function WatchItemCard({ item }) {
    return (
        <article className={styles.card}>
            {item.rank && <p className={styles.rank} >{item.rank}</p>}
            <img className={styles.card__image} src={item.image} alt={`${item.title} poster`}/>
            <h2 className={styles.card__title} >{item.title}</h2>
        </article>
    );
}

export default WatchItemCard;