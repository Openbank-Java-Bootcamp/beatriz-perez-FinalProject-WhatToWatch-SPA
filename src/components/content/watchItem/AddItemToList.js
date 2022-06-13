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
    const [boxMessage, setBoxMessage] = useState("");

    const [newListName, setNewListName] = useState("");
    const [newListDescription, setNewListDescription] = useState("");
    const handleListName = (e) => setNewListName(e.target.value);
    const handleListDescription = (e) => setNewListDescription(e.target.value);

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
        const requestBody = { id: item.id, };
        const storedToken = localStorage.getItem("authToken");
        axios
            .patch(`${API_URL}/api/items/add-to-list/${listId}`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setBoxMessage("Item added!")
                setTimeout(closeBox, 1500);
            })
            .catch((error) => setErrorMessage(error.response.data.message));
    }
    const closeBox = () => {
        setIsAdding(false);
        setErrorMessage("");
        setBoxMessage("");
    }

    // Add item to a new list
    const  addItemToNewList = (e) => {
        e.preventDefault();
        // Build newListDTO object:
        const requestBody = {
            name: newListName,
            description: newListDescription,
            ownerId: user.id,
        };
        const storedToken = localStorage.getItem("authToken");
        axios
            .post(`${API_URL}/api/lists/new`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                console.log(response.data);
                addItemToList(response.data.id);
            })
            .catch((error) => console.log(error));     

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
                            {userLists.map(list => 
                                <div className={styles.addBox__listBox}>
                                    <div>
                                        <h3 className={styles.listName}>{list.name}</h3>
                                        <p className={styles.listDescription}>{list.description}</p>
                                    </div>
                                    <button onClick={() => {addItemToList(list.id)}} className={[styles.button, styles.buttonSmall].join(" ")} type="button">Add</button>
                                </div>
                            )}
                        </div>
                        <div className={styles.addBox__column} >
                            <h2 className={styles.title} >Create a new WatchList</h2>
                            <form className={styles.form} onSubmit={addItemToNewList}>
                                <input 
                                    className={styles.form__input} 
                                    placeholder="List name"
                                    type="text"
                                    name="newListName"
                                    value={newListName}
                                    onChange={handleListName}
                                />
                                <input 
                                    className={styles.form__input} 
                                    placeholder="List description"
                                    type="text"
                                    name="newListDescription"
                                    value={newListDescription}
                                    onChange={handleListDescription}
                                />
                                <button className={styles.button} type="submit">Add to new list</button>
                            </form>
                        </div>
                    </div>
                    {boxMessage 
                        ? <p className={styles.messageText}>{boxMessage}</p>
                        : <button className={styles.button} onClick={closeBox} type="button" >Cancel</button>
                    }
                </div>
            )}
        </>
    );
}

export default AddItemToList;
