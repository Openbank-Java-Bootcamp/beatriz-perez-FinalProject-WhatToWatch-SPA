import styles from "./Banner.module.scss";
import defaultImage from "../../images/default-banner.jpg";

function Banner({ title, image }) {
  return (
    <div className={styles.banner}>
      <img
        className={styles.banner__image}
        src={image || defaultImage}
        alt={title}
      />
      <h1 className={styles.banner__title}>{title}</h1>
    </div>
  );
}

export default Banner;
