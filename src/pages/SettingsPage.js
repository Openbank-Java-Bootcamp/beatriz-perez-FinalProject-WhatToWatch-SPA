import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";


function SettingsPage() {
    return (
        <GeneralLayout >
        <Banner 
            title="Settings" 
            text="Settings page text"
            image="https://images.pexels.com/photos/2774566/pexels-photo-2774566.jpeg"
        />
    </ GeneralLayout>
    );
}

export default SettingsPage;