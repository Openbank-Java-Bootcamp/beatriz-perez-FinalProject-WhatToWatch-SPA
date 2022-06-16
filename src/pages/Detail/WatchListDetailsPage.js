// Modules:
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../context/source.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

// Styles:
import styles from "./WatchListDetailsPage.module.scss";
// Images:
import defaultBanner from "../../images/default-banner.jpg";

// Components:
import GeneralLayout from "../../components/layout/GeneralLayout";
import Banner from "../../components/layout/Banner";
import PaddingSection from "../../components/layout/PaddingSection";

function WatchListDetailsPage() {
  const navigate = useNavigate();
  const { API_URL } = useContext(SourceContext);
  const { user } = useContext(AuthContext);
  const { id: listId } = useParams();

  const [isOwner, setIsOwner] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [list, setList] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getList();
  }, [listId, editing]);

  const handleListName = (e) => setListName(e.target.value);
  const handleListDescription = (e) => setListDescription(e.target.value);

  // Get User from WTW DB
  const getList = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/lists/${listId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setList(response.data);
        setListName(response.data.name);
        setListDescription(response.data.description);
        setIsOwner(response.data.owner.id === user.id);
        setIsFollower(
          response.data.followers.filter((i) => i.id === user.id).length > 0
        );
      })
      .catch((error) =>
        console.log("ERROR MESSAGE: ", error.response.data.message)
      );
  };

  // Follow or unfollow list
  const changeFollowing = () => {
    setEditing(true);
    const requestBody = { id: user.id };
    const storedToken = localStorage.getItem("authToken");
    const url = isFollower
      ? `${API_URL}/api/lists/unfollow/${listId}`
      : `${API_URL}/api/lists/follow/${listId}`;
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

  // Edit list details
  const editListDetails = () => {
    setEditing(true);
    const storedToken = localStorage.getItem("authToken");
    const editedList = { ...list };
    editedList.name = listName;
    editedList.description = listDescription;
    const requestBody = editedList;
    axios
      .put(`${API_URL}/api/lists/${listId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setEditing(false);
      })
      .catch((error) => console.log(error.response.data));
  };
  // Remove user from participants
  const removeParticipant = (removedUserId) => {
    setEditing(true);
    const storedToken = localStorage.getItem("authToken");
    const editedList = { ...list };
    const filteredParticipants = editedList.participants.filter(
      (p) => p.id !== removedUserId
    );
    editedList.participants = filteredParticipants;
    const requestBody = editedList;
    axios
      .put(`${API_URL}/api/lists/${listId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setEditing(false);
      })
      .catch((error) => console.log(error.response.data));
  };
  // Remove item from watchItems
  const removeItem = (removedItemId) => {
    setEditing(true);
    const storedToken = localStorage.getItem("authToken");
    const editedList = { ...list };
    const filteredItems = editedList.watchItems.filter(
      (i) => i.id !== removedItemId
    );
    editedList.watchItems = filteredItems;
    const requestBody = editedList;
    axios
      .put(`${API_URL}/api/lists/${listId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setEditing(false);
      })
      .catch((error) => console.log(error.response.data));
  };
  // Delete list
  const deleteList = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/lists/${listId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <GeneralLayout>
      {list ? (
        <>
          <Banner
            title={list.name}
            text={list.description}
            image={defaultBanner}
          />
          <PaddingSection>
            {/* description and owner ------------------------------------------------- */}
            <p className={styles.description}>{list.description}</p>
            <p className={styles.owner}>
              {"created by "} <strong>{list.owner.username}</strong>
              {` on ${list.creationDate}`}
            </p>
            {/* edit list ------------------------------------------------------------ */}
            {isOwner ? (
              <button
                className={styles.button}
                onClick={() => {
                  setShowEdit(!showEdit);
                }}
              >
                Edit list
              </button>
            ) : (
              <div className={styles.followBox}>
                <svg
                  onClick={changeFollowing}
                  className={!isFollower ? styles.icon : styles.iconFollowed}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>
                <p className={styles.followText}>
                  {!isFollower ? "follow list" : "unfollow list"}
                </p>
              </div>
            )}
            {showEdit && (
              <div>
                <form className={styles.form} onSubmit={editListDetails}>
                  <input
                    className={styles.form__input}
                    type="text"
                    name="name"
                    value={listName}
                    onChange={handleListName}
                  />
                  <input
                    className={styles.form__input}
                    type="text"
                    name="description"
                    value={listDescription}
                    onChange={handleListDescription}
                  />
                  <button className={styles.button} type="submit">
                    Update list
                  </button>
                  <button className={styles.button} onClick={deleteList}>
                    Delete list
                  </button>
                </form>
              </div>
            )}

            {/* showing info options ------------------------------------------------------------ */}
            <div className={styles.optionsBox}>
              <p className={styles.option}>
                {"All WatchItems "}
                <strong>{list.watchItems.length}</strong>
              </p>
              <p className={styles.option}>
                {"Movies "}
                <strong>
                  {list.watchItems.filter((i) => i.type === "Movie").length}
                </strong>
              </p>
              <p className={styles.option}>
                {"Series "}
                <strong>
                  {list.watchItems.filter((i) => i.type === "TVSeries").length}
                </strong>
              </p>
              <p className={styles.option}>
                {"participants "} <strong>{list.participants.length}</strong>
              </p>
              <p className={styles.option}>
                {"followers "} <strong>{list.followers.length}</strong>
              </p>
            </div>

            {/* showing info  --------------------------------------------------------------------- */}

            {/* items  --------------------------------------------------------------------- */}
            <div className={styles.optionTable}>
              <h3 className={styles.optionTitle}>WatchItems</h3>
              {list.watchItems.map((item) => (
                <div key={item.id} className={styles.itemRow}>
                  <img
                    className={styles.image}
                    src={item.image}
                    alt={`${item.title} poster`}
                  />
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.title}>{item.year}</p>
                  <p className={styles.title}>{item.type}</p>
                  {showEdit && (
                    <svg
                      className={styles.removeIcon}
                      onClick={() => {
                        removeItem(item.id);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <line x1="9" y1="12" x2="15" y2="12" />
                    </svg>
                  )}
                </div>
              ))}
              <h3>Participants</h3>
              {list.participants.map((participant) => (
                <div key={participant.id}>
                  <p>{participant.username}</p>
                  {showEdit && participant.id !== list.owner.id && (
                    <button
                      onClick={() => {
                        removeParticipant(participant.id);
                      }}
                      type="button"
                    >
                      X
                    </button>
                  )}
                  {user.id === participant.id && user.id !== list.owner.id && (
                    <button
                      onClick={() => {
                        removeParticipant(participant.id);
                      }}
                      type="button"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>
          </PaddingSection>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </GeneralLayout>
  );
}

export default WatchListDetailsPage;
