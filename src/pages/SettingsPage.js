// Components:
import GeneralLayout from "../components/layout/GeneralLayout";
import Banner from "../components/layout/Banner";
import SettingsForm from "../components/layout/SettingsForm";

// Images:
import bannerImage from "../images/settings-image.jpg";
import PaddingSection from "../components/layout/PaddingSection";

function SettingsPage() {
  return (
    <GeneralLayout>
      <Banner title="Settings" image={bannerImage} />
      <PaddingSection>
        <SettingsForm />
      </PaddingSection>
    </GeneralLayout>
  );
}

export default SettingsPage;
