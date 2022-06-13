import { useContext, useState } from "react";
import { SourceContext } from "../../context/source.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";


function AddWatchItemToList({ item }) {
    const [isAdding, setIsAdding] = useState(false);
    const [userLists, setUserLists] = useState([]);

    const { API_URL } = useContext(SourceContext);
    const { user } = useContext(AuthContext);

    const getLists = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/api/lists/owner/${user.id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => setUserLists(response.data))
            .then(setIsAdding(true))
            .catch((error) => console.log(error));
    }
    

    const [listId, setListId] = useState([]);
    const handleList = (e) => setListId(e.target.value);

    const addItemToList = () => {
        const requestBody = {
            id: item.id,
        };
        const storedToken = localStorage.getItem("authToken");
        axios
            .patch(`${API_URL}/api/items/add-to-list/${listId}`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => console.log("ADDING ITEM TO LIST" + response))
            .catch((error) => console.log(error));
    }

    const handleAddToListSubmit = (e) => {
        e.preventDefault();
        addItemToList()
    }

    console.log(userLists);
    console.log(listId);
    console.log(`${API_URL}/api/items/add-to-list/${listId}`);

    return (
        <>
            <button onClick={getLists}>Add to watchlist</button>
            {isAdding && (
                <>
                    {userLists.length > 0 && 
                        <form onSubmit={handleAddToListSubmit}>
                            <p>Select one of your watchlists:</p>
                            <select name="select" defaultValue={"default"} onChange={handleList}>
                                <option key="0" value="default" disabled>Choose a list</option> 
                                {userLists.map(list => <option key={list.id} value={list.id}>{list.name}</option>)}
                            </select>
                            <button type="submit">Add</button>
                        </form>
                    }
                    <form>
                        <p>Create a new watchlist:</p>
                        <button type="submit">Create and add</button>
                    </form>
                </>
            )}
        </>
    );
}

export default AddWatchItemToList;