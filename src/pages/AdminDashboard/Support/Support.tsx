import Header from "@/common/Header";
import TicketManagement from "./Components/TicketManagement";
import SupportCard from "./Components/SupportCard";



const Support = () => {

  return (
    <div className="space-y-6">
      <Header title="Support" description="Get help and access resources"/>
      <SupportCard/>
      <TicketManagement/>
    </div>
  );
};

export default Support;