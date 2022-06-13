// Modules:
import { useNavigate } from "react-router-dom"; //  <== IMPORT
import { SourceContext } from "../../../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
// Styles:
import styles from "./ExploreRanking.module.scss";
// Components:
import ExploreItemCard from "./ExploreItemCard";

function ExploreRanking({ listTitle, searchString }) {

    const navigate = useNavigate();
    const { API_URL, externalContent_API_url, externalContent_API_key } = useContext(SourceContext);
    const [rankingItems, setRankingItems] = useState([]);

    useEffect(() => {
        getItemsFromImdb();
    }, []);

    // RANKING ITEMS:

    // Get items from IMDb API by specified "searchString"
    const getItemsFromImdb = () => {
        // Check if items are stored already, then get them
        const storedItems = JSON.parse(localStorage.getItem(searchString));
        if(storedItems) {
            // Get items from Local Storage
            console.log("ExploreRanking " + searchString + ": getting items from LOCAL STORAGE")
            setRankingItems(storedItems);
        } else {
            // Get items from IMDb API
            console.log("ExploreRanking " + searchString + ": getting items from IMDb API")
            axios
                .get(externalContent_API_url + searchString + externalContent_API_key)
                .then((response) => {
                    // Get only top 10 results (API returns 250)
                    const tenFirstItems = [...response.data.items].slice(0, 10);
                    setRankingItems(tenFirstItems);
                    storeItems(tenFirstItems);
                })
                .catch((error) => {console.log(error)});
        }
    };
    // Store results on Local Storage to avoid repeatedly calling the external API
    const storeItems = (items) => {
        localStorage.setItem(searchString, JSON.stringify(items));
    };
    // Update results to get any changes on the external API
    const updateListData = () => {
        localStorage.removeItem(searchString);
        getItemsFromImdb();
    };


    // SELECTED ITEM DETAILS:

    function checkDbItem(id) {
        return new Promise ((resolve, reject) => {
            console.log("CHECKING ITEM: " + id)
            const storedToken = localStorage.getItem("authToken");
            let result = null;
            axios
                .get(`${API_URL}/api/items/imdb/${id}`, { headers: { Authorization: `Bearer ${storedToken}` }, })
                .then((response) =>  result = response.data)
                .catch((error) => {});

            // Resolve or reject the promise
            if (!result) {
                reject("Item does not exist yet on WTW DB")
            }
            else {
                resolve(result);
            }
        })
    }
    function getItemDetails(id) {
        return new Promise ((resolve, reject) => {
            console.log("Getting details from IMDB for id " + id);
            let result = null;
            axios
                .get(externalContent_API_url + "Title" + externalContent_API_key + "/" + id + "/Images,Trailer")
                .then((response) =>  {
                    result = response.data;
                    console.log(response.data);
                })
                .catch((error) => {console.log(error)});

            console.log("HEYYYYY", result);
            // Resolve or reject the promise
            if (!result) {
                reject("ERROR")
            }
            else {
                resolve(result);
            }
        })
    }
    // Save discovered item to DB
    async function saveItemToDb(id) {
        // Check if item exists on db
        try {
            debugger;
            const dbResult = await checkDbItem(id);
            console.log("Check result: " + dbResult);
            // Navigate to title details page
            navigate(`/watchitem/${dbResult.id}`);
        }catch (error) {
            console.log("Check result: " + error);
            // Fetch item details from IMDb API
            try {
                const imdbResult = await getItemDetails(id);
                console.log("Fetch result: " + imdbResult);
                // Save item on WTW DB

                // Navigate to title details page

            } catch (error) {
                console.log("Fetch result: " + error);
            }
        }
    }
    
    
    
    return (
        <div className={styles.section} >
            <h2 className={styles.title} >
                {listTitle}
                <button onClick={updateListData}>
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                    </svg>
                </button>
            </h2>
            <ul className={styles.list} >
                {rankingItems.map(item =>
                    <div onClick={() => {saveItemToDb(item.id)}} key={item.id} >
                        <ExploreItemCard item={item} />
                    </div>
                )}
            </ul>
        </div>
    );
}
export default ExploreRanking;