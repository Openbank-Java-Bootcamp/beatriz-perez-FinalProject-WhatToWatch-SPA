// Modules:
import { useContext, useState } from "react";
import { SourceContext } from "../../../context/source.context";
import { AuthContext } from "../../../context/auth.context";
import axios from "axios";

// Styles:
import styles from "./AddItemToList.module.scss";

function AddItemToList({ item }) {
    const { API_URL } = useContext(SourceContext);
    const { user } = useContext(AuthContext);

    const [isAdding, setIsAdding] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Get all user's existing lists
    const getUserLists = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/api/lists/owner/${user.id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => setUserLists(response.data))
            .then(setIsAdding(true))
            .catch((error) => console.log(error));
    }
    // Add item to selected list
    const addItemToList = (listId) => {
        const requestBody = {
            id: item.id,
        };
        const storedToken = localStorage.getItem("authToken");
        axios
            .patch(`${API_URL}/api/items/add-to-list/${listId}`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setErrorMessage("Item added!")
                setTimeout(closeBox, 1500);
            })
            .catch((error) => setErrorMessage(error.response.data.message));
    }
    const closeBox = () => {
        setIsAdding(false);
        setErrorMessage("");
    }

    return (
        <>
            <button className={styles.button} onClick={getUserLists}>Add to watchlist</button>
            {isAdding && (
                <div className={styles.wrapper}>
                    <div className={styles.addBox}>
                        <div className={styles.addBox__column} >
                            <h2 className={styles.title} >Select one of your Watchlists</h2>
                            <p className={styles.warning}>{errorMessage}</p>
                            <form>
                                {userLists.map(list => 
                                    <div className={styles.addBox__listBox}>
                                        <div>
                                            <h3 className={styles.listName}>{list.name}</h3>
                                            <p className={styles.listDescription}>{list.description}</p>
                                        </div>
                                        <button onClick={() => {addItemToList(list.id)}} className={[styles.button, styles.buttonSmall].join(" ")} type="button">Add</button>
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className={styles.addBox__column} >
                            <h2 className={styles.title} >Create a new WatchList</h2>
                            <form>
                                <button type="submit">Create and add</button>
                            </form>
                        </div>
                    </div>
                    <button className={styles.button} onClick={closeBox} type="button" >Cancel</button>
                </div>
            )}
        </>
    );
}

export default AddItemToList;
