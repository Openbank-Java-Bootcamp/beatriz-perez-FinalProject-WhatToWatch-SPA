// Modules:
import { useNavigate } from "react-router-dom"; //  <== IMPORT
import { SourceContext } from "../../../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
// Styles:
import styles from "./ExploreList.module.scss";
// Components:
import ExploreItemCard from "./ExploreItemCard";

function ExploreList({ listTitle, searchString, list }) {
  const navigate = useNavigate();
  const { API_URL, externalContent_API_url, externalContent_API_key } =
    useContext(SourceContext);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (list) setListItems(list);
    else getItemsFromImdb();
  }, [list]);

  // RANKING ITEMS:

  // Get items from IMDb API by specified "searchString"
  const getItemsFromImdb = () => {
    // Check if items are stored already, then get them
    const storedItems = JSON.parse(localStorage.getItem(searchString));
    if (storedItems) {
      // Get items from Local Storage
      console.log(
        "ExploreRanking " + searchString + ": getting items from LOCAL STORAGE"
      );
      setListItems(storedItems);
    } else {
      // Get items from IMDb API
      console.log(
        "ExploreRanking " + searchString + ": getting items from IMDb API"
      );
      axios
        .get(externalContent_API_url + searchString + externalContent_API_key)
        .then((response) => {
          // Get only top 10 results (API returns 250)
          const tenFirstItems = [...response.data.items].slice(0, 10);
          setListItems(tenFirstItems);
          storeItems(tenFirstItems);
        })
        .catch((error) => {
          console.log(error);
        });
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

  // Save discovered item to DB
  const saveItemToDb = (id) => {
    // Check if item exists on db
    console.log("CHECKING ITEM: " + id);
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/items/imdb/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // If item exists on db navigate to details page
        navigate(`/watchitem/${response.data.id}`);
      })
      .catch((error) => {
        // If item does NOT exists on db, get details from IMDb API
        console.log("Getting details from IMDB for id " + id);
        axios
          .get(
            externalContent_API_url +
              "Title" +
              externalContent_API_key +
              "/" +
              id +
              "/Images,Trailer"
          )
          .then((response) => {
            // Then save details in WTW DB
            console.log("Adding to WTW DB item: " + response.data.id);
            const item = response.data;
            const requestBody = {
              imdbId: item.id,
              type: item.type,
              title: item.title,
              synopsis: item.plot,
              image: item.image,
              rating: item.imDbRating,
              year: item.year,
              banner: item.images.items[0].image,
              companies: item.companies,
              directors: item.directors,
              actors: item.actorList,
              similars: item.similars,
              trailer: item.trailer.link,
              genres: item.genreList.map((i) => {
                return { name: i.value };
              }),
            };
            console.log(requestBody);
            axios
              .post(`${API_URL}/api/items/new`, requestBody)
              .then((response) => {
                // Then navigate to details page
                navigate(`/watchitem/${response.data.id}`);
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>
        {listTitle}
        {!list && (
          <button onClick={updateListData}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </svg>
          </button>
        )}
      </h2>
      <ul className={styles.list}>
        {listItems.map((item) => (
          <div
            onClick={() => {
              saveItemToDb(item.id);
            }}
            key={item.id}
          >
            <ExploreItemCard item={item} />
          </div>
        ))}
      </ul>
    </div>
  );
}
export default ExploreList;
