import styles from "./ExploreItemCard.module.scss";

function ExploreItemCard({ item }) {
  return (
    <article className={styles.card}>
      {item.rank && <p className={styles.rank}>{item.rank}</p>}
      <img
        className={styles.card__image}
        src={item.image}
        alt={`${item.title} poster`}
      />
      <div className={styles.infoBox}>
        <div className={styles.ratingBox}>
          <p className={styles.ratingText}>rating</p>
          <p className={styles.rating}>{item.imDbRating}</p>
        </div>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.year}>{item.year}</p>
        </div>
      </div>
    </article>
  );
}

export default ExploreItemCard;
