// Modules:
import { SourceContext } from "../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

// Components
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import WatchItemsList from "../components/content/watchItem/WatchItemsList";

// Images:
import bannerImage from "../images/movies-image.jpg";

function MoviesPage() {
  const type = "Movie";
  const { API_URL } = useContext(SourceContext);
  const [allMovies, setAllMovies] = useState(null);

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/items/type/${type}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAllMovies(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <GeneralLayout>
      <Banner title="Movies" image={bannerImage} />
      {allMovies && (
        <PaddingSection>
          <WatchItemsList
            listTitle="Most liked movies on WhatToWatch"
            list={[...allMovies]
              .sort((a, b) => b.likers.length - a.likers.length)
              .slice(0, 10)}
          />
          <WatchItemsList
            listTitle="Most watched movies on WhatToWatch"
            list={[...allMovies]
              .sort((a, b) => b.watchers.length - a.watchers.length)
              .slice(0, 10)}
          />
          <WatchItemsList
            listTitle="Best rated movies"
            list={[...allMovies]
              .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
              .slice(0, 10)}
          />
        </PaddingSection>
      )}
    </GeneralLayout>
  );
}

export default MoviesPage;
