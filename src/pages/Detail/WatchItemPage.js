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

function WatchItemPage() {

    const { API_URL } = useContext(SourceContext);
    const { id:itemId } = useParams();
    const [item, setItem] = useState(null);

    const { user:logedinUser } = useContext(AuthContext);
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
            .get(`${API_URL}/api/items/${itemId}`, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => {
                setItem(response.data)
                setIsLiker(response.data.likers.filter(i => i.id === logedinUser.id).length > 0);
                setIsWatcher(response.data.watchers.filter(i => i.id === logedinUser.id).length > 0);
            })
            .catch((error) => console.log(error));
    };

    // Watch item (set as watched)
    const addToWatchers = () => {
        setEditing(true);
        const requestBody = { id: logedinUser.id, };
        const storedToken = localStorage.getItem("authToken");
        const url = `${API_URL}/api/items/watch/${itemId}`;
        axios
            .patch(url, requestBody, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => {
                console.log(response.data);
                setEditing(false);
            })
            .catch((error) => console.log(error.response.data.message));
    }

    // Like or unlike item
    const changeLiking = () => {
        setEditing(true);
        const requestBody = { id: logedinUser.id, };
        const storedToken = localStorage.getItem("authToken");
        const url = isLiker 
            ? `${API_URL}/api/items/unlike/${itemId}`
            : `${API_URL}/api/items/like/${itemId}`
        axios
            .patch(url, requestBody, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => {
                console.log(response.data);
                setEditing(false);
            })
            .catch((error) => console.log(error.response.data.message));
    }
    
    
    
    console.log("DETAILS for: ", item);
    console.log(isWatcher);
    return (
        <GeneralLayout >
            {item ? (
                <>
                    <Banner 
                        title={item.title} 
                        text={`${item.type} ${item.year} · ${item.genres.map(i => i.name).join(" · ")}`}
                        image={item.banner}
                    />
                    <PaddingSection>
                        {!isWatcher 
                            ? <button onClick={addToWatchers}>Set as watched</button>
                            : <p>WATCHED!</p>
                        }
                        <svg onClick={changeLiking} className={!isLiker ? styles.icon : styles.iconLiked} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                        </svg>
                        <AddItemToList  item={item} />
                    </PaddingSection>
                    <PaddingSection>
                        <div>
                            <p>{`id: ${item.id}`}</p>
                            <p>{`creationDate: ${item.creationDate}`}</p>
                            <p>{`imdbId: ${item.imdbId}`}</p>
                            <p>{`rating: ${item.rating}`}</p>
                            <p>{`title: ${item.title}`}</p>
                            <p>{`synopsis: ${item.synopsis}`}</p>
                            <p>{`likes: ${item.likers.length}`}</p>
                            <p>{`watchers: ${item.watchers.length}`}</p>
                        </div>
                    </PaddingSection>
                    <PaddingSection>
                        <ExploreList listTitle="Similar titles" list={item.similars}  />
                    </PaddingSection>
                </>
            ):(
                <p>Loading...</p>
            )
            } 
        </ GeneralLayout>
    );
}

export default WatchItemPage;