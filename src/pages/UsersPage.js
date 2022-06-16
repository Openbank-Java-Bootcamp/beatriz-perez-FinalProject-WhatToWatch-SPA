// Modules:
import { SourceContext } from "../context/source.context";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

// Components:
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import UsersList from "../components/content/user/UsersList";
import FindUserForm from "../components/content/user/FindUserForm";

// Images:
import bannerImage from "../images/users-image.jpg";

function UsersPage() {
  const { API_URL } = useContext(SourceContext);
  const { user } = useContext(AuthContext);
  const [logedinUser, setLogedinUser] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUser();
    getAllUsers();
  }, []);

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
        setUsers(allUsersButMe);
      })
      .catch((error) => console.log(error));
  };

  return (
    <GeneralLayout>
      <Banner title="Users" image={bannerImage} />
      <PaddingSection>
        <FindUserForm />
      </PaddingSection>
      {users && (
        <PaddingSection>
          <UsersList
            listTitle="10 Most popular users"
            usersList={users
              .sort((a, b) => b.followers.length - a.followers.length)
              .slice(0, 10)}
          />
          <UsersList
            listTitle="10 Newest users"
            usersList={users
              .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
              .slice(0, 10)}
          />
          <UsersList
            listTitle="10 Most popular users you follow"
            usersList={users
              .filter((u) => u.followers.some((f) => f.id === user.id))
              .sort((a, b) => b.followers.length - a.followers.length)
              .slice(0, 10)}
          />
          <UsersList
            listTitle="10 Most popular users following you"
            usersList={logedinUser.followers
              .sort((a, b) => b.followers.length - a.followers.length)
              .slice(0, 10)}
          />
        </PaddingSection>
      )}
    </GeneralLayout>
  );
}

export default UsersPage;
