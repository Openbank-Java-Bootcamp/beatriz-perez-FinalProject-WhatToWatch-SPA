import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import WatchItemDetails from "../components/content/WatchItemDetails";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../context/source.context";
import axios from "axios";

function WatchItemPage() {

    const { externalContent_API_url, externalContent_API_key } = useContext(SourceContext);
    const { id:itemId } = useParams();
    const [item, setItem] = useState([]);

    const getItem = () => {
        axios
        .get(externalContent_API_url + "Title" + externalContent_API_key + "/" + itemId + "/Images,Trailer")
        .then((response) => {
            setItem(response.data);
            console.log("DATA:", response.data);
            })
        .catch((error) => console.log(error));
    };
    
    useEffect(() => {
        console.log(itemId);
        console.log(externalContent_API_url + "Title" + externalContent_API_key + "/" + itemId + "/Images,Trailer");
        getItem();
    }, [itemId]);
    

    return (
        <GeneralLayout >
            {item.title 
            ? (
                <>
                    <Banner 
                        title={item.title} 
                        text={`${item.type} ${item.year} · ${item.genreList.map(i => i.value).join(" · ")}`}
                        image={item.images.items[0].image}
                    />
                    <WatchItemDetails item={item} />
                </>
            ):(
                <p>Loading...</p>
            )
            } 
        </ GeneralLayout>
    );
}

export default WatchItemPage;