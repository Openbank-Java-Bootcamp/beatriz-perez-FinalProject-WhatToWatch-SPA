// Modules:
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../../context/source.context";
import { AuthContext } from "../../../context/auth.context";
import axios from "axios";

// Images:
import defaultUser from "../../../images/default-user-image.png";

// Styles:
import styles from "./UserCard.module.scss";

function UserCard({ user }) {
  const { API_URL } = useContext(SourceContext);
  const [lists, setLists] = useState(null);

  useEffect(() => {
    getUserLists();
  }, []);

  // Get all user's existing lists
  const getUserLists = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/lists/owner/${user.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setLists(response.data))
      .catch((error) => setLists([]));
  };

  return (
    <>
      {lists && (
        <article className={styles.card}>
          <img
            className={styles.image}
            src={user.imageUrl || defaultUser}
            alt="user profile"
          />
          <h2 className={styles.username}>{user.username}</h2>
          <h2 className={styles.name}>{user.name}</h2>
          <h2 className={styles.joinDate}>{"joined: " + user.joinDate}</h2>
          <div className={styles.infoBox}>
            <div className={styles.followersBox}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
              <p className={styles.followers}>{user.followers.length}</p>
            </div>
            <div className={styles.listsBox}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <line x1="9" y1="6" x2="20" y2="6" />
                <line x1="9" y1="12" x2="20" y2="12" />
                <line x1="9" y1="18" x2="20" y2="18" />
                <line x1="5" y1="6" x2="5" y2="6.01" />
                <line x1="5" y1="12" x2="5" y2="12.01" />
                <line x1="5" y1="18" x2="5" y2="18.01" />
              </svg>{" "}
              <p className={styles.lists}>{lists.length}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export default UserCard;
