// Modules:
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../context/source.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

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
    const [isOwner, setIsOwner] = useState(false);
    const { id:listId } = useParams();
    const [list, setList] = useState(null)
    const [editing, setEditing] = useState(false);


    useEffect(() => {
        getList();
    }, [listId, editing]);

    // Get User from WTW DB
    const getList = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/api/lists/${listId}`, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => {
                setList(response.data)
                if(response.data.owner.id === user.id) setIsOwner(true)
                else setIsOwner(false)
            })
            .catch((error) => console.log("ERROR MESSAGE: ", error.response.data.message));
    };

    // Remove user from participants
    const removeParticipant = (removedUserId) => {
        setEditing(true);
        const storedToken = localStorage.getItem("authToken");
        const editedList = {...list};
        const filteredParticipants = editedList.participants.filter(p => p.id !== removedUserId);
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
    }
    // Remove item from watchItems
    const removeItem = (removedItemId) => {
        setEditing(true);
        const storedToken = localStorage.getItem("authToken");
        const editedList = {...list};
        const filteredItems = editedList.watchItems.filter(i => i.id !== removedItemId);
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
    }
    // Delete list
    const deleteList = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
          .delete(`${API_URL}/api/lists/${listId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then(() => {
            navigate("/watchlists");
          })
          .catch((error) => console.log(error.response.data));
    };
    

    console.log(list);

    return (
        <GeneralLayout >
            {list ? (
                <>
                    <Banner 
                        title={list.name} 
                        text={list.description}
                        image={defaultBanner}
                    />
                    <PaddingSection>
                        {isOwner && <button onClick={deleteList}>Delete list</button>}
                        <div>
                            <p>{`id: ${list.id}`}</p>
                            <p>{`name: ${list.name}`}</p>
                            <p>{`created by: ${list.owner.username}`}</p>
                            <p>{`participants: ${list.participants.length}`}</p>
                            <p>{`WatchItems: ${list.watchItems.length}`}</p>
                            <br/>
                            <h3>WatchItems</h3>
                            {list.watchItems.map(item =>
                                <div key={item.id}>
                                    <p>{item.title}</p>
                                    {isOwner && 
                                        <button onClick={() => {removeItem(item.id)}} type="button" >X</button>
                                    }
                                </div>
                            )}
                            <h3>Participants</h3>
                            {list.participants.map(user =>
                                <div key={user.id}>
                                    <p>{user.username}</p>
                                    {isOwner && 
                                        ( user.id !== list.owner.id  && 
                                            <button onClick={() => {removeParticipant(user.id)}} type="button" >X</button>
                                        )
                                    }
                                </div>
                            )}
                        </div>
                    </PaddingSection>
                </>
            ):(
                <p>Loading...</p>
            )
            } 
        </ GeneralLayout>
    );
}

export default WatchListDetailsPage;