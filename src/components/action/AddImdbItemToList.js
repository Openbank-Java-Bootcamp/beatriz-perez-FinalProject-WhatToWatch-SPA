import { useContext, useState } from "react";
import { SourceContext } from "../../context/source.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";


function AddImdbItemToList({ item }) {

    const { API_URL } = useContext(SourceContext);
    const { user } = useContext(AuthContext);

    const [isAdding, setIsAdding] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [listId, setListId] = useState([]);
    const handleList = (e) => setListId(e.target.value);


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
    // const addItemToDbAndList = () => {
    //     const storedToken = localStorage.getItem("authToken");
    //     const requestBody = {
    //         imdbId: item.id,
    //         type: item.type,
    //         title: item.title,
    //         synopsis: item.plot,
    //         image: item.image,
    //         rating: item.imDbRating,
    //         genres: item.genreList.map(i => { return {name: i.value}})
    //     };
    //     axios
    //         .post(`${API_URL}/api/items/new/add-to-list/${list}`, requestBody, {
    //             headers: { Authorization: `Bearer ${storedToken}` },
    //         })
    //         .then((response) => console.log("ADDING ITEM TO DB" + response))
    //         .catch((error) => console.log(error));
    // }

    // const handleAddToListSubmit = (e) => {
    //     e.preventDefault();
    //     addItemToDbAndList();
    // }

    const addItemToList = (newItem) => {
        const requestBody = {
            id: newItem.id,
        };
        const storedToken = localStorage.getItem("authToken");
        axios
            .patch(`${API_URL}/api/items/add-to-list/${listId}`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => console.log("ADDING ITEM TO LIST" + response.data))
            .catch((error) => console.log(error));
    }

    const saveItemAndAddToList = () => {
        const requestBody = {
            imdbId: item.id,
            type: item.type,
            title: item.title,
            synopsis: item.plot,
            image: item.image,
            rating: item.imDbRating,
            genres: item.genreList.map(i => { return {name: i.value}})
        };
        const storedToken = localStorage.getItem("authToken");
        axios
        .post(`${API_URL}/api/items/new`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
            })
        .then((response) => {
            console.log("SAVEDRESPONSE" + response.data);
            addItemToList(response.data);
        })
        .then(addItemToList())
        .catch((error) => console.log(error));
    }

    const handleAddToListSubmit = (e) => {
        e.preventDefault();
        saveItemAndAddToList();
    }

    return (
        <>
            <button onClick={getLists}>Add to watchlist</button>
            {
                isAdding && (
                    <>
                        {userLists.length > 0 && 
                            <form onSubmit={handleAddToListSubmit}>
                                <p>Select one of your watchlists:</p>
                                <select name="select" onChange={handleList}>
                                    <option key="0" value={null} selected={true} disabled>Choose a list</option> 
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
                )
            }
        </>
    );
}

export default AddImdbItemToList;