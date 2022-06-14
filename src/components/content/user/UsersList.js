// Modules:
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Styles:
import styles from "./UsersList.module.scss";

// Components:
import Usercard from "../UserCard";


function UsersList({ listTitle, usersList, orderFunction }) {

    const [allUsers, setAllUsers] = useState([]);
    
    // const users = usersList.sort(orderFunction);

    const getUsers = () => {}

    useEffect(() => {
        if (usersList) setAllUsers(usersList);
        else getUsers();
    }, [usersList]);
    
    return (
        <section className={styles.section} >
            <h2 className={styles.title} >{listTitle}</h2>
            <ul className={styles.list} >
                {
                    allUsers.map(user =>
                        <Link key={user.id} to={`/users/${user.id}`}>
                            <Usercard user={user} />
                        </Link>
                    )
                }
            </ul>
        </section>
    );
}

export default UsersList;