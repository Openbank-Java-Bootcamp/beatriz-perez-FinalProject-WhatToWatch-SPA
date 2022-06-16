// Modules:
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { SourceContext } from "../context/source.context";
import axios from "axios";

// Components:
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import FindListForm from "../components/content/list/FindListForm";
import ListsList from "../components/content/list/ListsList";

// Images:
import bannerImage from "../images/lists-image.jpg";

function WatchListsPage() {
  const { user } = useContext(AuthContext);
  const { API_URL } = useContext(SourceContext);
  const [allLists, setAllLists] = useState([]);

  useEffect(() => {
    getAllLists();
  }, []);

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

  console.log(allLists);

  return (
    <GeneralLayout>
      <Banner title="WatchLists" image={bannerImage} />
      <PaddingSection>
        <FindListForm />
      </PaddingSection>
      <PaddingSection>
        <ListsList
          listTitle="Most popular WatchLists"
          allLists={allLists
            .sort((a, b) => b.followers.length - a.followers.length)
            .slice(0, 10)}
        />
        <ListsList
          listTitle="Most shared watchlists"
          allLists={allLists
            .sort((a, b) => b.participants.length - a.participants.length)
            .slice(0, 10)}
        />
        <ListsList
          listTitle="Newest watchlists"
          allLists={allLists
            .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
            .slice(0, 10)}
        />
      </PaddingSection>
    </GeneralLayout>
  );
}

export default WatchListsPage;
