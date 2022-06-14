// Modules:
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../context/source.context";
import axios from "axios";

// Components:
import GeneralLayout from "../../components/layout/GeneralLayout";
import Banner from "../../components/layout/Banner";
import PaddingSection from "../../components/layout/PaddingSection";
import AddUserToList from "../../components/content/user/AddUserToList";



function UserDetailsPage() {

    const { API_URL } = useContext(SourceContext);
    const { id:userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, [userId]);

    // Get User from WTW DB
    const getUser = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/api/users/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => setUser(response.data))
            .catch((error) => console.log("ERROR MESSAGE: ", error.response.data.message));
    };
    

    return (
        <GeneralLayout >
            {user ? (
                <>
                    <Banner 
                        title={user.username} 
                        text={`In WhatToWatch since ${user.joinDate}`}
                        image={user.imageUrl}
                    />
                    <PaddingSection>
                        <AddUserToList  participant={user} />
                    </PaddingSection>
                    <PaddingSection>
                        <div>
                            <p>{`id: ${user.id}`}</p>
                            <p>{`email: ${user.email}`}</p>
                            <p>{`username: ${user.username}`}</p>
                            <p>{`name: ${user.name}`}</p>
                        </div>
                    </PaddingSection>
                </>
            ):(
                <p>Loading...</p>
            )
            } 
        </ GeneralLayout>
    );
}

export default UserDetailsPage;