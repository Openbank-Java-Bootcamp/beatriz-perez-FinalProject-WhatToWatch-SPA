// Components;
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import Exploreform from "../components/content/explore/ExploreForm";
import ExploreList from "../components/content/explore/ExploreList";

// Images:
import bannerImage from "../images/explore-image.jpg";

function ExplorePage() {
  return (
    <GeneralLayout>
      <Banner title="Explore" image={bannerImage} />
      <PaddingSection>
        <Exploreform />
      </PaddingSection>
      <PaddingSection>
        <ExploreList
          listTitle="Most popular movies on IMDb"
          searchString="MostPopularMovies"
        />
        <ExploreList
          listTitle="Most popular TV series on IMDb"
          searchString="MostPopularTVs"
        />
        <ExploreList
          listTitle="Top rated movies on IMDb"
          searchString="Top250Movies"
        />
        <ExploreList
          listTitle="Top rated TV series on IMDb"
          searchString="Top250TVs"
        />
      </PaddingSection>
    </GeneralLayout>
  );
}

export default ExplorePage;
