// Images:
import defaultList from "../../../images/default-list.png";

// Styles:
import styles from "./ListCard.module.scss";
import ListsList from "./ListsList";

function ListCard({ list }) {
  const collage = (
    <div className={styles.collage}>
      {[...list.watchItems].slice(0, 4).map((i, index) => (
        <img
          key={index}
          className={styles.collageImage}
          src={
            list.watchItems.length > 0
              ? list.watchItems[index].image
              : defaultList
          }
          alt="user profile"
        />
      ))}
    </div>
  );

  return (
    <article className={styles.card}>
      {list.watchItems.length > 3 ? (
        collage
      ) : (
        <img
          className={
            list.watchItems.length > 0 ? styles.image : styles.defaultIimage
          }
          src={
            list.watchItems.length > 0 ? list.watchItems[0].image : defaultList
          }
          alt="user profile"
        />
      )}

      <h2 className={styles.name}>{list.name}</h2>
      <h3 className={styles.description}>{list.description}</h3>

      <div className={styles.infoBox}>
        <div className={styles.followersBox}>
          <svg
            className={styles.iconFilled}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
          <p className={styles.followers}>{list.followers.length}</p>
        </div>
        <div className={styles.participantsBox}>
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
          <p className={styles.participants}>{list.participants.length}</p>
        </div>
      </div>
      <div className={[styles.infoBox, styles.secondBox].join(" ")}>
        <div className={styles.seriesBox}>
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <polyline points="16 3 12 7 8 3" />
          </svg>
          <p className={styles.series}>
            {list.watchItems.filter((i) => i.type === "TVSeries").length}
          </p>
        </div>
        <div className={styles.moviesBox}>
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
          <p className={styles.movies}>
            {list.watchItems.filter((i) => i.type === "Movie").length}
          </p>
        </div>
      </div>
      <p className={styles.creation}>
        Created by <strong>{list.owner.username}</strong>
      </p>
    </article>
  );
}

export default ListCard;
