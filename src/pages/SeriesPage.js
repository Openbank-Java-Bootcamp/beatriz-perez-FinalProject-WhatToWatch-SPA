// Modules:
import { SourceContext } from "../context/source.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

// Components
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import WatchItemsList from "../components/content/WatchItemsList";

// Images:
import bannerImage from "../images/series-image.jpg";

function SeriesPage() {
  const type = "TVSeries";
  const { API_URL } = useContext(SourceContext);
  const [allSeries, setAllSeries] = useState(null);

  useEffect(() => {
    getAllSeries();
  }, []);

  const getAllSeries = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/items/type/${type}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAllSeries(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <GeneralLayout>
      <Banner title="Series" image={bannerImage} />
      {allSeries && (
        <PaddingSection>
          <WatchItemsList
            listTitle="Most liked series on WhatToWatch"
            list={[...allSeries]
              .sort((a, b) => b.likers.length - a.likers.length)
              .slice(0, 10)}
          />
          <WatchItemsList
            listTitle="Most watched series on WhatToWatch"
            list={[...allSeries]
              .sort((a, b) => b.watchers.length - a.watchers.length)
              .slice(0, 10)}
          />
          <WatchItemsList
            listTitle="Best rated series"
            list={[...allSeries]
              .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
              .slice(0, 10)}
          />
        </PaddingSection>
      )}
    </GeneralLayout>
  );
}

export default SeriesPage;
