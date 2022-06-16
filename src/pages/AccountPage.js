import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { SourceContext } from "../context/source.context";
import axios from "axios";
import Banner from "../components/layout/Banner";
import GeneralLayout from "../components/layout/GeneralLayout";
import PaddingSection from "../components/layout/PaddingSection";
import AccountDetails from "../components/content/user/AccountDetails";

function AccountPage() {
  const { user } = useContext(AuthContext);
  const { API_URL } = useContext(SourceContext);

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

  return (
    <>
      {accountDetails && (
        <GeneralLayout>
          <Banner title="Account" text="Account page text" image={null} />
          <PaddingSection>
            <AccountDetails accountDetails={accountDetails} />
          </PaddingSection>
        </GeneralLayout>
      )}
    </>
  );
}

export default AccountPage;
