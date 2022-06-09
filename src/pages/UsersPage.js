import GeneralLayout from "../components/layout/GeneralLayout";
import { SourceContext } from "../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Banner from "../components/layout/Banner";
import UsersList from "../components/content/UsersList";

function UsersPage() {
    const {API_URL} = useContext(SourceContext);
    const [users, setUsers] = useState([]);

    const getAllUsers = () => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem("authToken");
        // Send the token through the request "Authorization" Headers
        axios
          .get(`${API_URL}/api/users`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => setUsers(response.data))
          .catch((error) => console.log(error));
      };
    
      // We set this effect will run only once, after the initial render
      // by setting the empty dependency array - []
      useEffect(() => {
        getAllUsers();
      }, []);
    

    return (
        <GeneralLayout >
            <Banner 
                title="Users" 
                text="Check out other user's watchlists"
                image="https://images.pexels.com/photos/2774566/pexels-photo-2774566.jpeg"
            />
            <UsersList 
                listTitle="Newest users" 
                usersList={users} 
                orderFunction={(a,b) => new Date(b.joinDate) - new Date(a.joinDate)}
            />
        </ GeneralLayout>
    );
}

export default UsersPage;