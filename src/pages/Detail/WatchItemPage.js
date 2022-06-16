// Modules:
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../context/source.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

// Styles:
import styles from "./WatchItemPage.module.scss";

// Components:
import GeneralLayout from "../../components/layout/GeneralLayout";
import Banner from "../../components/layout/Banner";
import ExploreList from "../../components/content/explore/ExploreList";
import AddItemToList from "../../components/content/watchItem/AddItemToList";
import PaddingSection from "../../components/layout/PaddingSection";
import DetailsTable from "../../components/DetailsTable";

function WatchItemPage() {
  const { API_URL } = useContext(SourceContext);
  const { id: itemId } = useParams();
  const [item, setItem] = useState(null);

  const { user: logedinUser } = useContext(AuthContext);
  const [isLiker, setIsLiker] = useState(false);
  const [isWatcher, setIsWatcher] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getItem();
  }, [itemId, editing]);

  // Get Item from WTW DB
  const getItem = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/items/${itemId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setItem(response.data);
        setIsLiker(
          response.data.likers.filter((i) => i.id === logedinUser.id).length > 0
        );
        setIsWatcher(
          response.data.watchers.filter((i) => i.id === logedinUser.id).length >
            0
        );
      })
      .catch((error) => console.log(error));
  };

  // Watch item (set as watched)
  const addToWatchers = () => {
    setEditing(true);
    const requestBody = { id: logedinUser.id };
    const storedToken = localStorage.getItem("authToken");
    const url = `${API_URL}/api/items/watch/${itemId}`;
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

  // Like or unlike item
  const changeLiking = () => {
    setEditing(true);
    const requestBody = { id: logedinUser.id };
    const storedToken = localStorage.getItem("authToken");
    const url = isLiker
      ? `${API_URL}/api/items/unlike/${itemId}`
      : `${API_URL}/api/items/like/${itemId}`;
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

  return (
    <GeneralLayout>
      {item ? (
        <>
          <Banner
            title={item.title}
            text={`${item.type} ${item.year} · ${item.genres
              .map((i) => i.name)
              .join(" · ")}`}
            image={item.banner}
          />
          <PaddingSection>
            <div className={styles.section}>
              {!isWatcher ? (
                <a className={styles.button} onClick={addToWatchers}>
                  <svg
                    className={styles.icon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <line x1="3" y1="3" x2="21" y2="21" />
                    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                    <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                  </svg>
                </a>
              ) : (
                <svg
                  className={styles.iconWatched}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 19c-4 0 -7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7c-.42 .736 -.858 1.414 -1.311 2.033" />
                  <path d="M15 19l2 2l4 -4" />
                </svg>
              )}
              <svg
                onClick={changeLiking}
                className={!isLiker ? styles.icon : styles.iconLiked}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
              <AddItemToList item={item} />
            </div>
          </PaddingSection>
          <PaddingSection>
            <div className={styles.infoSection}>
              <div className={styles.dataBox}>
                <p className={styles.data}>
                  {`watchers: `}
                  <strong>{item.watchers.length}</strong>
                </p>
                <p className={styles.data}>
                  {`likes: `}
                  <strong>{item.likers.length}</strong>
                </p>
                <p className={styles.data}>
                  {`rating: `}
                  <strong>{item.rating}</strong>
                </p>
                <p className={styles.data}>
                  {`added to WhatToWatch on: `}
                  <strong>{item.creationDate}</strong>
                </p>
              </div>
              <p className={styles.infoTitle}>Trailer</p>
              <a
                className={styles.infoText}
                href={item.trailer}
                target="_blank"
                rel="noopener noreferrer"
              >
                watch on IMDb
              </a>

              <p className={styles.infoTitle}>Synopsis</p>
              <p className={styles.infoText}>{item.synopsis}</p>

              <p className={styles.infoTitle}>Companies</p>
              <p className={styles.infoText}>{item.companies}</p>

              <p className={styles.infoTitle}>Directors</p>
              <p className={styles.infoText}>{item.directors}</p>

              <p className={styles.infoTitle}>Actors</p>
              <div className={styles.actors}>
                {item.actors.map((a, index) => (
                  <div key={index} className={styles.actor}>
                    <p className={styles.actorName}>{a.name}</p>
                    <img
                      className={styles.actorImage}
                      src={a.image}
                      alt={a.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </PaddingSection>
          <PaddingSection>
            <ExploreList listTitle="Similar titles" list={item.similars} />
          </PaddingSection>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </GeneralLayout>
  );
}

export default WatchItemPage;
