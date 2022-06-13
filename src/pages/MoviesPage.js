import GeneralLayout from "../components/layout/GeneralLayout";
import { SourceContext } from "../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";

function MoviesPage() {
    const type = "Movie";
    const {API_URL} = useContext(SourceContext);
    const [allMovies, setAllMovies] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const getAllGenres = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
          .get(`${API_URL}/api/genres`, {headers: { Authorization: `Bearer ${storedToken}` }, })
          .then((response) => setAllGenres(response.data))
          .catch((error) => console.log(error));
      };
    const getAllMovies = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
          .get(`${API_URL}/api/items/type/${type}`, {headers: { Authorization: `Bearer ${storedToken}` }, })
          .then((response) => setAllMovies(response.data))
          .catch((error) => console.log(error));
      };
    
      useEffect(() => {
        getAllGenres();
        getAllMovies();
      }, []);

    return (
        <GeneralLayout >
            <Banner
                title="Movies" 
                text="Movies page text"
                image="https://images.pexels.com/photos/2774566/pexels-photo-2774566.jpeg"
            />
            <PaddingSection>
              <h2>Movies Page</h2>
              <h3>Added genres:</h3>
              {allGenres.map(i => <p key={i.id} >{i.name}</p>)}
              <h3>Added movies:</h3>
              {allMovies.map(i => <p key={i.id} >{i.title}</p>)}
            </PaddingSection>
        </ GeneralLayout>
    );
}

export default MoviesPage;