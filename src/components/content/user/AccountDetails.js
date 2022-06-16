// Modules:
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../../context/source.context";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import axios from "axios";

// Styles:
import styles from "./AccountDetails.module.scss";

// Components:
import DetailsTable from "../../DetailsTable";

function AccountDetails({ accountDetails }) {
  const { API_URL } = useContext(SourceContext);
  const [lists, setLists] = useState(null);

  useEffect(() => {
    getUserLists();
  }, []);

  // Get all user's existing lists
  const getUserLists = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/lists/owner/${accountDetails.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setLists(response.data))
      .catch((error) => setLists([]));
  };

  return (
    <>
      {accountDetails && (
        <>
          <div className={styles.infoBox}>
            <div className={styles.box}>
              <h2>id</h2>
              <p>{accountDetails.id}</p>
            </div>

            <div className={styles.box}>
              <h2>username</h2>
              <p>{accountDetails.username}</p>
            </div>

            <div className={styles.box}>
              <h2>full name</h2>
              <p>{accountDetails.name}</p>
            </div>

            <div className={styles.box}>
              <h2>email</h2>
              <p>{accountDetails.email}</p>
            </div>

            <div className={styles.box}>
              <h2>join date</h2>
              <p>{accountDetails.joinDate}</p>
            </div>
          </div>
          {lists && (
            <div className={styles.data}>
              <h2 className={styles.title}>{`Lists:  ${lists.length}`}</h2>
              <Link to="/home">
                <p className={styles.text}>See lists in home page</p>
              </Link>
              <h2
                className={styles.title}
              >{`Followers: ${accountDetails.followers.length}`}</h2>
              <DetailsTable rows={accountDetails.followers} type="user" />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AccountDetails;
