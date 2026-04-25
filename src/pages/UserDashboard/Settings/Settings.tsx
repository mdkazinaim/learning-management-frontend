import Header from "@/common/Header";
import DangerZone from "./Components/DangerZone";
import PersonalInformation from "./Components/PersonalInformation";
import PasswordManagement from "./Components/PasswordManagement";




const Settings = () => {

  return (
    <div className="space-y-6">
      <Header title="Settings" description="Manage your account settings and preferences"/>
      <PersonalInformation/>
      <PasswordManagement/>
      {/* <NotificationPreferences/> */}
      {/* <AccountSettings/> */}
      <DangerZone/>
    </div>
  );
};

export default Settings;