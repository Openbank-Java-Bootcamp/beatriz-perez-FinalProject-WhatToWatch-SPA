// Modules:
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Styles:
import styles from "./ListsList.module.scss";

// Components:
import ListCard from "./ListCard";

function ListsList({ listTitle, allLists: initiallLists }) {
  const [allLists, setAllLists] = useState([]);

  const getLists = () => {};

  useEffect(() => {
    if (initiallLists) setAllLists(initiallLists);
    else getLists();
  }, [initiallLists]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{listTitle}</h2>
      <ul className={styles.list}>
        {allLists.map((list) => (
          <Link key={list.id} to={`/watchlists/${list.id}`}>
            <ListCard list={list} />
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default ListsList;
