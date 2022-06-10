import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import PaddingSection from "../components/layout/PaddingSection";
import WatchItemsList from "../components/content/WatchItemsList";



function ExplorePage() {
    
    return (
        <GeneralLayout >
            <Banner 
                title="Want more?" 
                text="Explore even more titles on IMDb and add them to your lists"
                image="https://images.pexels.com/photos/2774566/pexels-photo-2774566.jpeg"
            />
            <PaddingSection>
                <WatchItemsList 
                    listTitle="Most popular movies on IMDb"
                    searchString="MostPopularMovies"
                />
                <WatchItemsList 
                    listTitle="Most popular TV series on IMDb"
                    searchString="MostPopularTVs"
                />
                <WatchItemsList 
                    listTitle="Top rated movies on IMDb"
                    searchString="Top250Movies"
                />
                <WatchItemsList 
                    listTitle="Top rated TV series on IMDb"
                    searchString="Top250TVs"
                />
            </PaddingSection>
        </ GeneralLayout>
    );
}

export default ExplorePage;