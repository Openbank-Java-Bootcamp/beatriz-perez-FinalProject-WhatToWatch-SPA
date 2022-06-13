import GeneralLayout from "../../components/layout/GeneralLayout";
import Banner from "../../components/layout/Banner";
import WatchItemDetails from "../../components/content/WatchItemDetails";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../context/source.context";
import axios from "axios";
import AddImdbItemToList from "../../components/action/AddImdbItemToList";

function ImdbItemPage() {

    const { API_URL, externalContent_API_url, externalContent_API_key } = useContext(SourceContext);
    const { id:itemId } = useParams();
    const [item, setItem] = useState([]);
    const [itemGenres, setItemGenres] = useState([]);

    const getItem = () => {
            axios
            .get(externalContent_API_url + "Title" + externalContent_API_key + "/" + itemId + "/Images,Trailer")
            .then((response) => {
                console.log("DATA FROM IMDb:", response.data);
                setItem(response.data);
                setItemGenres(response.data.genreList.map(i => i.value))
                })
            .catch((error) => console.log(error));
    };
    
    useEffect(() => {
        getItem();
    }, [itemId]);
    
    return (
        <GeneralLayout >
            {item.title 
            ? (
                <>
                    <Banner 
                        title={item.title} 
                        text={`${item.type} ${item.year} · ${itemGenres.join(" · ")}`}
                        image={item.images.items[0].image}
                    />
                    <AddImdbItemToList item={item} />

                    <WatchItemDetails item={item} />
                </>
            ):(
                <p>Loading...</p>
            )
            } 
        </ GeneralLayout>
    );
}

export default ImdbItemPage;