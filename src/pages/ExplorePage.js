import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import Exploreform from "../components/content/explore/ExploreForm";
import ExploreList from "../components/content/explore/ExploreList";



function ExplorePage() {
    
    return (
        <GeneralLayout >
            <Banner 
                title="Want more?" 
                text="Explore even more titles on IMDb and add them to your lists"
                image="https://images.pexels.com/photos/2774566/pexels-photo-2774566.jpeg"
            />
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
        </ GeneralLayout>
    );
}

export default ExplorePage;