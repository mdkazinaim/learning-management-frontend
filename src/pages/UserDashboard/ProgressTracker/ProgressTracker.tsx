import Header from "@/common/Header";
import ProgressCard from "./Components/ProgressCard";
import { GoTrophy } from "react-icons/go";
import { BsRainbow } from "react-icons/bs";
import { SlGraph } from "react-icons/sl";
import { GrCertificate } from "react-icons/gr";
import CourseInProgress from "./Components/RunningCourse/CourseInProgress";
import CompletedCoursesProgress from "./Components/CompletedCoursesProgress/CompletedCoursesProgress";
import MilestonesAndAchievements from "./Components/MilestonesAndAchievements/MilestonesAndAchievements";

const StatsCardData = [
  {
    id: "course_completed",
    title: "Course Completed",
    value: "8",
    icon: {
      icon: <GoTrophy size={20} />,
      colorClass: "bg-primary-green/10 text-primary-green",
    },
    footer: null,
  },
  {
    id: "current_level",
    title: "Current Level",
    value: "Level 2",
    icon: {
      icon: <BsRainbow size={20} />,
      colorClass: "bg-indigo-100 text-indigo-600",
    },
    footer: {
      type: "progress",
      current: 1250,
      target: 2000,
      label: "1250/2000 XP",
    },
  },
  {
    id: "total_xp",
    title: "Total XP Earned",
    value: "1250",
    icon: {
      icon: <SlGraph size={20} />,
      colorClass: "bg-violet-100 text-violet-600",
    },
    footer: {
      type: "text",
      content: "Keep learning to earn more!",
    },
  },
  {
    id: "certificates_earned",
    title: "Certificates Earned",
    value: "6",
    icon: {
      icon: <GrCertificate size={20} />,
      colorClass: "bg-amber-100 text-amber-600",
    },
    footer: {
      type: "link",
      content: "View all certificates",
      linkUrl: "#",
    },
  },
];

const ProgressTracker = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Progress Tracker"
        description="Track your learning journey and achievements"
      />
      <ProgressCard data={StatsCardData} />
      <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <CourseInProgress />
        <CompletedCoursesProgress />
      </div>
      <div className="col-span-1">
        <MilestonesAndAchievements />
      </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
