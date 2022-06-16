// Modules:
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../context/source.context";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";

// Styles:
import styles from "./UserDetailsPage.module.scss";
// Images:
import defaultList from "../../images/default-list.png";

// Components:
import GeneralLayout from "../../components/layout/GeneralLayout";
import Banner from "../../components/layout/Banner";
import PaddingSection from "../../components/layout/PaddingSection";
import AddUserToList from "../../components/content/user/AddUserToList";
import DetailsTable from "../../components/DetailsTable";

function UserDetailsPage() {
  const { API_URL } = useContext(SourceContext);
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);

  const { user: logedinUser } = useContext(AuthContext);
  const [isFollower, setIsFollower] = useState(false);
  const [editing, setEditing] = useState(false);
  const [lists, setLists] = useState(null);

  useEffect(() => {
    getUser();
    getUserLists();
  }, [userId, editing]);

  // Get User from WTW DB
  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);
        setIsFollower(
          response.data.followers.filter((i) => i.id === logedinUser.id)
            .length > 0
        );
      })
      .catch((error) =>
        console.log("ERROR MESSAGE: ", error.response.data.message)
      );
  };
  // Get all user's existing lists
  const getUserLists = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/lists/owner/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setLists(response.data))
      .catch((error) => setLists([]));
  };

  // Follow or unfollow user
  const changeFollowing = () => {
    setEditing(true);
    const requestBody = { id: logedinUser.id };
    const storedToken = localStorage.getItem("authToken");
    const url = isFollower
      ? `${API_URL}/api/users/unfollow/${userId}`
      : `${API_URL}/api/users/follow/${userId}`;
    axios
      .patch(url, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setEditing(false);
      })
      .catch((error) => console.log(error.response.data.message));
  };

  // List image - collage
  const collage = (l) => {
    return (
      <div className={styles.collage}>
        {[...l.watchItems].slice(0, 4).map((i, index) => (
          <img
            key={index}
            className={styles.collageImage}
            src={
              l.watchItems.length > 0 ? l.watchItems[index].image : defaultList
            }
            alt="user profile"
          />
        ))}
      </div>
    );
  };

  console.log(user);
  return (
    <GeneralLayout>
      {user ? (
        <>
          <Banner
            title={user.username}
            text={`In WhatToWatch since ${user.joinDate}`}
            image={user.imageUrl}
          />
          <PaddingSection>
            <div className={styles.section}>
              <svg
                onClick={changeFollowing}
                className={!isFollower ? styles.icon : styles.iconFollowed}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
              <AddUserToList participant={user} />
            </div>
          </PaddingSection>
          <PaddingSection>
            <div className={styles.infoSection}>
              {/* --- Info ---------------------------------------- */}
              <div className={styles.dataBox}>
                <p className={styles.data}>
                  {`followers: `}
                  <strong>{user.followers.length}</strong>
                </p>
                <p className={styles.data}>
                  {`lists: `}
                  <strong>{lists ? lists.length : ""}</strong>
                </p>
              </div>
              <p className={styles.infoTitle}>Full name</p>
              <a className={styles.infoText}>{user.name}</a>

              <p className={styles.infoTitle}>Email</p>
              <a className={styles.infoText}>{user.email}</a>

              {/* --- Lists ---------------------------------------- */}
              <p className={styles.infoTitle}>Lists</p>
              <div className={styles.listsBox}>
                {lists &&
                  lists.map((l, index) => (
                    <Link
                      key={l.id}
                      to={`/watchlists/${l.id}`}
                      className={styles.link}
                    >
                      <div className={styles.list}>
                        {l.watchItems.length > 3 ? (
                          collage(l)
                        ) : (
                          <img
                            className={
                              l.watchItems.length > 0
                                ? styles.image
                                : styles.defaultIimage
                            }
                            src={
                              l.watchItems.length > 0
                                ? l.watchItems[0].image
                                : defaultList
                            }
                            alt="user profile"
                          />
                        )}
                        <div className={styles.listInfo}>
                          <p className={styles.listName}>{l.name}</p>
                          <p className={styles.listDescription}>
                            {l.description}
                          </p>
                          <p className={styles.listStats}>
                            {"WatchItems: "}
                            {l.watchItems.length}
                            {", Followers: "}
                            {l.followers.length}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              {/* --- Followers ---------------------------------------- */}
              <p className={styles.infoTitle}>Followers</p>
              <DetailsTable rows={user.followers} type="user" />
              <br />
              <br />
            </div>
          </PaddingSection>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </GeneralLayout>
  );
}

export default UserDetailsPage;
