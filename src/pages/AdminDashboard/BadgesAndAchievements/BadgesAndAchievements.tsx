import Header from "@/common/Header";
import TopBadgeEarners from "./Components/TopBadgeEarners";
import BadgeManagement from "./Components/BadgeManagement";



const BadgesAndAchievements = () => {

  return (
    <div className="space-y-6">
      <Header title="Badge and Achievements" description="Create and manage platform badges"/>
      <BadgeManagement/> 
      <TopBadgeEarners/>
    </div>
  );
};

export default BadgesAndAchievements;