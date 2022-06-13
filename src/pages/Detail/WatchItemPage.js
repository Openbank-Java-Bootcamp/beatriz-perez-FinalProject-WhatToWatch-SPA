// Modules:
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../context/source.context";
import axios from "axios";

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

    useEffect(() => {
        getItem();
    }, [itemId]);

    // Get Item from WTW DB
    const getItem = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/api/items/${itemId}`, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => setItem(response.data))
            .catch((error) => console.log(error));
    };
    
    console.log("DETAILS for: ", item);
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