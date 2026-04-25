import Header from "@/common/Header";
import EarnedBadges from "./Components/Badge/EarnedBadges";
import EarnMoreBadges from "./Components/EarnMoreBadges";
import BadgesStats from "./Components/BadgesStats/BadgesStats";


const BadgeAndAchievement= () => {

  return (
    <div className="space-y-6">
      <Header title = "Badge and Achievements" description="Track your accomplishments and unlock new badges"/>
      <BadgesStats/>
      <EarnedBadges />
      <EarnMoreBadges />
    </div>
  );
};

export default BadgeAndAchievement;