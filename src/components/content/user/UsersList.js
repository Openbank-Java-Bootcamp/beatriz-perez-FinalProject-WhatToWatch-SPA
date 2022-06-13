// Modules:
import { Link } from "react-router-dom";

// Styles:
import styles from "./UsersList.module.scss";

// Components:
import Usercard from "../UserCard";
import { useState } from "react";

function UsersList({ listTitle, usersList, orderFunction }) {

    const [allUsers, setAllUsers] = useState([]);
    
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