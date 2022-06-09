import styles from "./Banner.module.scss";

function Banner({ title, text, image}) {
    return (
        <div className={styles.banner}>
            <img className={styles.banner__image} src={image} alt={title} />
            <div className={styles.banner__textBox}>
                <h1 className={styles.banner__title} >{title}</h1>
                <p className={styles.banner__text} >{text}</p>
            </div>
        </div>
    );
}

export default Banner;