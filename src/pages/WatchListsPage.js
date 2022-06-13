import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { SourceContext } from "../context/source.context";
import axios from "axios";
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import NewListForm from "../components/content/NewListForm";

function WatchListsPage() {

    const { user } = useContext(AuthContext);
    const {API_URL} = useContext(SourceContext);

    const [allLists, setAllLists] = useState([]);
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
    }, []);

    return (
        <GeneralLayout >
            <Banner
                title="WatchLists" 
                text="WatchLists page text"
                image={null}
            />
            <PaddingSection>
                <h2>Create a new WatchList</h2>
                <NewListForm />
                <h2>All lists:</h2>
                {
                    allLists.map(list => 
                        <ul>
                            <li key={list.id}>
                                <p>
                                    <strong>{list.name}</strong>
                                    {`
                                         - ${list.description}, 
                                        participants: ${list.participants.length}, 
                                        watchItems: ${list.watchItems.length} 
                                    `}
                                </p>
                            </li>
                        </ul>
                    )
                }
            </PaddingSection>
        </ GeneralLayout>
    );
}

export default WatchListsPage;