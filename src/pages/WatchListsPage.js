// Modules:
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { SourceContext } from "../context/source.context";
import axios from "axios";

// Components:
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import NewListForm from "../components/content/list/NewListForm";
import FindListForm from "../components/content/list/FindListForm";
import ListsList from "../components/content/list/ListsList";

function WatchListsPage() {

    const { user } = useContext(AuthContext);
    const {API_URL} = useContext(SourceContext);

    const [allLists, setAllLists] = useState([]);
    const [editing, setEditing] = useState(false);

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
    
    useEffect(() => {
        getAllLists();
    }, [editing]);

    return (
        <GeneralLayout >
            <Banner
                title="WatchLists" 
                text="WatchLists page text"
                image={null}
            />
            <PaddingSection>
                <NewListForm editing={editing} setEditing={setEditing}/>
            </PaddingSection>
            <PaddingSection>
              <FindListForm />
            </PaddingSection>
            <PaddingSection>
              <ListsList 
                  listTitle="All WatchLists" 
                  allLists={allLists} 
              />
              <ListsList 
                  listTitle="Newest WatchLists" 
                  allLists={allLists} 
              />
            </PaddingSection>

        </ GeneralLayout>      
    );
}

export default WatchListsPage;