import { SourceContext } from "../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import WatchItemsList from "../components/content/WatchItemsList";


function HomePage() {    
    const {API_URL} = useContext(SourceContext);
    const [allItems, setAllItems] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const getAllGenres = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
          .get(`${API_URL}/api/genres`, {headers: { Authorization: `Bearer ${storedToken}` }, })
          .then((response) => setAllGenres(response.data))
          .catch((error) => console.log(error));
      };
    const getAllItems = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
          .get(`${API_URL}/api/items`, {headers: { Authorization: `Bearer ${storedToken}` }, })
          .then((response) => setAllItems(response.data))
          .catch((error) => console.log(error));
      };
    
      useEffect(() => {
        getAllGenres();
        getAllItems();
      }, []);

    return (
        <GeneralLayout >
            <Banner
                title="Home" 
                text="Home page text"
                image="https://images.pexels.com/photos/2774566/pexels-photo-2774566.jpeg"
            />
            <PaddingSection>
              <h2>Home Page</h2>
              <h3>Added genres:</h3>
              {allGenres.map(i => <p key={i.id} >{i.name}</p>)}
              <h3>Added items:</h3>
              {allItems.map(i => <p key={i.id} >{`${i.title} - ${i.type}`}</p>)}
            </PaddingSection>
            <PaddingSection>
              <WatchItemsList
                listTitle="All WhatToWatch DB items"
                searchString=""
              />
            </PaddingSection>
        </ GeneralLayout>
    );
}

export default HomePage;