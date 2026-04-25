import Header from "@/common/Header";
import LoginHistory from "./Components/LoginHistory";
import PaymentGateway from "./Components/PaymentGateway";
import SecuritySettings from "./Components/SecuritySettings";
import SiteInformation from "./Components/SiteInformation";



const Settings = () => {

  return (
    <div className="space-y-6">
      <Header title="Platform Settings" description="Configure platform-wide settings"/>
      <SiteInformation/>
      <SecuritySettings/>
      <PaymentGateway />
      <LoginHistory/>
    </div>
  );
};

export default Settings;