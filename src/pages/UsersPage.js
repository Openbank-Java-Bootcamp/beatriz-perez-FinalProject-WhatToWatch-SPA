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

function UsersPage() {
  const {API_URL} = useContext(SourceContext);
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    console.log("inside get all users function");

      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
      // Send the token through the request "Authorization" Headers
      axios
        .get(`${API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // Filter users to exclude logged in user (so I dont see myself on the list)
          const allUsersButMe = response.data.filter(u => u.id !== user.id);
          // Save list of users in state variable
          setUsers(allUsersButMe);
        })
        .catch((error) => console.log(error));
  };
    
  useEffect(() => {
    getAllUsers();
  }, []);
    
  console.log(users);

  return (
    <GeneralLayout >
      <Banner 
          title="Users" 
          text="Check out other user's watchlists"
          image="https://images.pexels.com/photos/2774566/pexels-photo-2774566.jpeg"
      />
      <PaddingSection>
        <FindUserForm />
      </PaddingSection>
      <PaddingSection>
        <UsersList 
            listTitle="Users you follow" 
            usersList={users} 
            orderFunction={(a,b) => new Date(b.joinDate) - new Date(a.joinDate)}
        />
        <UsersList 
            listTitle="Newest users" 
            usersList={users} 
            orderFunction={(a,b) => new Date(b.joinDate) - new Date(a.joinDate)}
        />
      </PaddingSection>
    </ GeneralLayout>
  );
}

export default UsersPage;