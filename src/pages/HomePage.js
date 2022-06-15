// Modules:
import { SourceContext } from "../context/source.context";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

// Components:
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import WatchItemsList from "../components/content/WatchItemsList";
import ListsList from "../components/content/list/ListsList";
import NewListForm from "../components/content/list/NewListForm";

function HomePage() {
  const { user } = useContext(AuthContext);
  const { API_URL } = useContext(SourceContext);
  const [logedinUser, setLogedinUser] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUser();
    getUserLists();
    getAllItems();
  }, [editing]);

  // Get Logedin User from WTW DB
  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/${user.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setLogedinUser(response.data);
      })
      .catch((error) =>
        console.log("ERROR MESSAGE: ", error.response.data.message)
      );
  };
  // Get all user's existing lists
  const getUserLists = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/lists/owner/${user.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setUserLists(response.data))
      .catch((error) => console.log(error));
  };
  // Get all existing items
  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/items`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setAllItems(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <GeneralLayout>
      <Banner
        title="Home"
        text="Let's find something great to watch!"
        image="https://images.pexels.com/photos/2774566/pexels-photo-2774566.jpeg"
      />
      <PaddingSection>
        <NewListForm editing={editing} setEditing={setEditing} />
      </PaddingSection>
      <PaddingSection>
        <ListsList listTitle="Your lists" allLists={userLists} />
        {allItems && (
          <WatchItemsList
            listTitle="Movies and series you like"
            list={allItems.filter((i) => i.likers.includes(logedinUser))}
          />
        )}
        <WatchItemsList
          listTitle="Movies and series on your lists you have not watched yet"
          searchString=""
        />

        <ListsList listTitle="Lists you participate in" allLists={userLists} />
        <ListsList listTitle="Lists you follow" allLists={userLists} />
        <h2>Users you follow</h2>
        <WatchItemsList
          listTitle="Movies and series you like but have not watched yet"
          searchString=""
        />
      </PaddingSection>
    </GeneralLayout>
  );
}

export default HomePage;
