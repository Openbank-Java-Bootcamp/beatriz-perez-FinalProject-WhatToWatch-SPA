// Components:
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import SettingsForm from "../components/layout/SettingsForm";

// Images:
import bannerImage from "../images/settings-image.avif";

function SettingsPage() {
  return (
    <GeneralLayout>
      <Banner title="Settings" image={bannerImage} />
      <SettingsForm />
    </GeneralLayout>
  );
}

export default SettingsPage;
