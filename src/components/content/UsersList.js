import { Link } from "react-router-dom";
import Usercard from "./UserCard";
import styles from "./UsersList.module.scss";

function UsersList({ listTitle, usersList, orderFunction }) {

    const users = usersList.sort(orderFunction);
    

    return (
        <section className={styles.section} >
            <h2 className={styles.title} >{listTitle}</h2>
            <ul className={styles.list} >
                {
                    users.map(user =>
                        <Link key={user.id} to="/home">
                            <Usercard user={user} />
                        </Link>
                    )
                }
            </ul>
        </section>
    );
}

export default UsersList;