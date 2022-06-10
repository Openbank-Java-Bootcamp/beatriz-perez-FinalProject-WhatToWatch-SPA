import defaultUser from "../../images/default-user-image.png";
import styles from "./UserCard.module.scss";

function UserCard({ user }) {
    return (
        <article className={styles.card}>
            <h2 className={styles.card__username} >{user.username}</h2>
            <h3 className={styles.card__name} >{user.name}</h3>
            <p className={styles.card__date} >{user.joinDate}</p>
            <img className={styles.card__image} src={user.imageUrl || defaultUser} alt="user profile"/>
        </article>
    );
}

export default UserCard;