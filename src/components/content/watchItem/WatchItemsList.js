import styles from "./WatchItemsList.module.scss";
import { Link } from "react-router-dom";
import { SourceContext } from "../../../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import WatchItemCard from "./WatchItemCard";

function WatchItemsList({ listTitle, list, searchString }) {
  const { API_URL } = useContext(SourceContext);
  const [items, setItems] = useState([]);

  const getDBItems = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/items${searchString}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Showing a list from a parent element
    if (list) setItems(list);
    // Showing list from WTW DB
    else getDBItems();
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{listTitle}</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <Link key={item.id} to={`/watchitem/${item.id}`}>
            <WatchItemCard item={item} />
          </Link>
        ))}
      </ul>
    </section>
  );
}
export default WatchItemsList;
