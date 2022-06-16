// Modules:
import { SourceContext } from "../context/source.context";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

// Components:
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import WatchItemsList from "../components/content/watchItem/WatchItemsList";
import ListsList from "../components/content/list/ListsList";
import NewListForm from "../components/content/list/NewListForm";

// Images:
import bannerImage from "../images/home-image.jpg";
import UsersList from "../components/content/user/UsersList";

function HomePage() {
  const { user } = useContext(AuthContext);
  const { API_URL } = useContext(SourceContext);
  const [allLists, setAllLists] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getAllLists();
    getAllUsers();
  }, [editing]);

  // Get all lists
  const getAllLists = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/lists`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAllLists(response.data))
      .catch((error) => console.log(error));
  };
  // Get All users but Logedin User from WTW DB
  const getAllUsers = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Filter users to exclude logged in user (so I dont see myself on the list)
        const allUsersButMe = response.data.filter((u) => u.id !== user.id);
        // Save list of users in state variable
        setAllUsers(allUsersButMe);
      })
      .catch((error) => console.log(error));
  };

  return (
    <GeneralLayout>
      <Banner title="Home" image={bannerImage} />

      <PaddingSection>
        <NewListForm editing={editing} setEditing={setEditing} />
      </PaddingSection>

      <PaddingSection>
        {/* --- Lists --------------------------------------------------------- */}
        <ListsList
          listTitle="Your lists"
          allLists={allLists.filter((l) => l.owner.id === user.id)}
        />
        <ListsList
          listTitle="Lists you participate in"
          allLists={allLists
            .filter((l) => l.participants.some((u) => u.id === user.id))
            .filter((l) => l.owner.id !== user.id)}
        />
        <ListsList
          listTitle="Lists you follow"
          allLists={allLists.filter((l) =>
            l.followers.some((u) => u.id === user.id)
          )}
        />
        {/* --- Users --------------------------------------------------------- */}
        <UsersList
          listTitle="Users you follow"
          usersList={allUsers.filter((u) =>
            u.followers.some((f) => f.id === user.id)
          )}
        />
      </PaddingSection>
    </GeneralLayout>
  );
}

export default HomePage;
