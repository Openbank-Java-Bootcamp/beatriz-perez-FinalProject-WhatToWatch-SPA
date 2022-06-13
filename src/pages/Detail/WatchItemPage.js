import GeneralLayout from "../../components/layout/GeneralLayout";
import Banner from "../../components/layout/Banner";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../context/source.context";
import axios from "axios";
import AddWatchItemToList from "../../components/action/AddWatchItemToList";

function WatchItemPage() {

    const { API_URL } = useContext(SourceContext);
    const { id:itemId } = useParams();
    const [item, setItem] = useState(null);

    const getItem = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
        .get(`${API_URL}/api/items/${itemId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => setItem(response.data))
        .catch((error) => console.log(error));
    };
    
    useEffect(() => {
        getItem();
    }, [itemId]);
    
    console.log(item);
    return (
        <GeneralLayout >
            {item ? (
                <>
                    <Banner 
                        title={item.title} 
                        text={`${item.type} ${item.year} · ${item.genres.map(i => i.name).join(" · ")}`}
                        image={item.image}
                    />
                    <AddWatchItemToList item={item} />
                    <div>
                        <p>{`id: ${item.id}`}</p>
                        <p>{`creationDate: ${item.creationDate}`}</p>
                        <p>{`imdbId: ${item.imdbId}`}</p>
                        <p>{`rating: ${item.rating}`}</p>
                        <p>{`title: ${item.title}`}</p>
                        <p>{`synopsis: ${item.synopsis}`}</p>
                    </div>
                </>
            ):(
                <p>Loading...</p>
            )
            } 
        </ GeneralLayout>
    );
}

export default WatchItemPage;