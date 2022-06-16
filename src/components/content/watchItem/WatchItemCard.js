import styles from "./WatchItemCard.module.scss";

function WatchItemCard({ item }) {
  return (
    <article className={styles.card}>
      <img
        className={styles.card__image}
        src={item.image}
        alt={`${item.title} poster`}
      />
      <div className={styles.infoBox}>
        <div className={styles.typeBox}>
          <p className={styles.typeText}>{item.type.replace("TV", "")}</p>
          {item.type === "Movie" ? (
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <line x1="8" y1="4" x2="8" y2="20" />
              <line x1="16" y1="4" x2="16" y2="20" />
              <line x1="4" y1="8" x2="8" y2="8" />
              <line x1="4" y1="16" x2="8" y2="16" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="16" y1="8" x2="20" y2="8" />
              <line x1="16" y1="16" x2="20" y2="16" />
            </svg>
          ) : (
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <polyline points="16 3 12 7 8 3" />
            </svg>
          )}
        </div>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.likesBox}>
            <svg
              className={styles.iconFilled}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            <p className={styles.likes}>{item.likers.length}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default WatchItemCard;
