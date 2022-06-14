// Modules:
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SourceContext } from "../../context/source.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

// Styles:
import styles from "./UserDetailsPage.module.scss";

// Components:
import GeneralLayout from "../../components/layout/GeneralLayout";
import Banner from "../../components/layout/Banner";
import PaddingSection from "../../components/layout/PaddingSection";
import AddUserToList from "../../components/content/user/AddUserToList";



function UserDetailsPage() {

    const { API_URL } = useContext(SourceContext);
    const { id:userId } = useParams();
    const [user, setUser] = useState(null);

    const { user:logedinUser } = useContext(AuthContext);
    const [isFollower, setIsFollower] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        getUser();
    }, [userId, editing]);

    // Get User from WTW DB
    const getUser = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/api/users/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => {
                setUser(response.data);
                setIsFollower(response.data.followers.filter(i => i.id === logedinUser.id).length > 0);
            })
            .catch((error) => console.log("ERROR MESSAGE: ", error.response.data.message));
    };

    // Follow or unfollow user
    const changeFollowing = () => {
        setEditing(true);
        const requestBody = { id: logedinUser.id, };
        const storedToken = localStorage.getItem("authToken");
        const url = isFollower 
            ? `${API_URL}/api/users/unfollow/${userId}`
            : `${API_URL}/api/users/follow/${userId}`
        axios
            .patch(url, requestBody, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => {
                console.log(response.data);
                setEditing(false);
            })
            .catch((error) => console.log(error.response.data.message));
    }
    
    

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
                        <svg onClick={changeFollowing} className={!isFollower ? styles.icon : styles.iconFollowed} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                        <AddUserToList  participant={user} />
                    </PaddingSection>
                    <PaddingSection>
                        <div>
                            <p>{`id: ${user.id}`}</p>
                            <p>{`email: ${user.email}`}</p>
                            <p>{`username: ${user.username}`}</p>
                            <p>{`name: ${user.name}`}</p>
                            <p>{`followers: ${user.followers.length}`}</p>
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