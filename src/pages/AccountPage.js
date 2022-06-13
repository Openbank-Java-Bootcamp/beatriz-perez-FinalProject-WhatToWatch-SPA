import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { SourceContext } from "../context/source.context";
import axios from "axios";
import Banner from "../components/layout/Banner";
import GeneralLayout from "../components/layout/GeneralLayout";
import PaddingSection from "../components/layout/PaddingSection";

function AccountPage() {

    const { user } = useContext(AuthContext);
    const {API_URL} = useContext(SourceContext);

    console.log("Account Page - user id: " + user.id);
    const [accountDetails, setAccountDetails] = useState(null);
    const getAccountDetails = () => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem("authToken");
        // Send the token through the request "Authorization" Headers
        axios
        .get(`${API_URL}/api/users/${user.id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => setAccountDetails(response.data))
        .catch((error) => console.log(error));
    };
    
    useEffect(() => {
        getAccountDetails();
    }, []);

    console.log(accountDetails);

    return (
        <GeneralLayout >
            <Banner
                title="Account" 
                text="Account page text"
                image={null}
            />
            <PaddingSection>
                {accountDetails 
                    ? (<>
                        <h2>Account details</h2>
                        <p>{`id: ${accountDetails.id}`}</p>
                        <p>{`joinDate: ${accountDetails.joinDate}`}</p>
                        <p>{`name: ${accountDetails.name}`}</p>
                        <p>{`username: ${accountDetails.username}`}</p>
                        <p>{`email: ${accountDetails.email}`}</p>
                        <p>{`imageUrl: ${accountDetails.imageUrl}`}</p>
                    </>)
                    : <p>Loading...</p>
                }
            </PaddingSection>
        </ GeneralLayout>
    );
}

export default AccountPage;