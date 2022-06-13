import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import Exploreform from "../components/content/explore/ExploreForm";
import ExploreRanking from "../components/content/explore/ExploreRanking";



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
                <ExploreRanking 
                    listTitle="Most popular movies on IMDb"
                    searchString="MostPopularMovies"
                />
                <ExploreRanking 
                    listTitle="Most popular TV series on IMDb"
                    searchString="MostPopularTVs"
                />
                <ExploreRanking 
                    listTitle="Top rated movies on IMDb"
                    searchString="Top250Movies"
                />
                <ExploreRanking 
                    listTitle="Top rated TV series on IMDb"
                    searchString="Top250TVs"
                />
            </PaddingSection>
        </ GeneralLayout>
    );
}

export default ExplorePage;