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
import DetailsTable from "../../components/DetailsTable";

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

  const [showingOption, setShowingOption] = useState("WatchItems");

  useEffect(() => {
    getList();
  }, [listId, editing]);

  const handleListName = (e) => setListName(e.target.value);
  const handleListDescription = (e) => setListDescription(e.target.value);
  const handleShowingOption = (e) => setShowingOption(e.target.value);

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
      .catch((error) => {
        console.log("ERROR MESSAGE: ", error.response.data.message);
        navigate("/home");
      });
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
      .then((response) => {
        navigate("/home");
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
              <button
                value="WatchItems"
                onClick={handleShowingOption}
                type="button"
                className={styles.option}
              >
                {"All WatchItems "}
                <strong>{list.watchItems.length}</strong>
              </button>
              <button
                value="Movies"
                onClick={handleShowingOption}
                type="button"
                className={styles.option}
              >
                {"Movies "}
                <strong>
                  {list.watchItems.filter((i) => i.type === "Movie").length}
                </strong>
              </button>
              <button
                value="Series"
                onClick={handleShowingOption}
                type="button"
                className={styles.option}
              >
                {"Series "}
                <strong>
                  {list.watchItems.filter((i) => i.type === "TVSeries").length}
                </strong>
              </button>
              <button
                value="Participants"
                onClick={handleShowingOption}
                type="button"
                className={styles.option}
              >
                {"participants "} <strong>{list.participants.length}</strong>
              </button>
              <button
                value="Followers"
                onClick={handleShowingOption}
                type="button"
                className={styles.option}
              >
                {"followers "} <strong>{list.followers.length}</strong>
              </button>
            </div>

            {/* showing info  --------------------------------------------------------------------- */}
            <div className={styles.optionTable}>
              <h3 className={styles.optionTitle}>{showingOption}</h3>
              {showingOption === "WatchItems" && (
                <DetailsTable
                  rows={list.watchItems}
                  type="item"
                  showEdit={showEdit}
                  task={removeItem}
                  userId={user.id}
                  isOwner={isOwner}
                />
              )}
              {showingOption === "Movies" && (
                <DetailsTable
                  rows={list.watchItems.filter((i) => i.type === "Movie")}
                  type="item"
                  showEdit={showEdit}
                  task={removeItem}
                  userId={user.id}
                  isOwner={isOwner}
                />
              )}
              {showingOption === "Series" && (
                <DetailsTable
                  rows={list.watchItems.filter((i) => i.type === "TVSeries")}
                  type="item"
                  showEdit={showEdit}
                  task={removeItem}
                  userId={user.id}
                  isOwner={isOwner}
                />
              )}
              {showingOption === "Participants" && (
                <DetailsTable
                  rows={list.participants}
                  type="user"
                  showEdit={showEdit}
                  task={removeParticipant}
                  userId={user.id}
                  isOwner={isOwner}
                />
              )}
              {showingOption === "Followers" && (
                <DetailsTable rows={list.followers} type="user" />
              )}
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
