import Header from "@/common/Header";
import StatsCard from "@/common/StatsCard";
import RunningCourses from "./Components/RunningCourses";
import CompletedCourses from "./Components/CompletedCourses";
import Recommended from "./Components/Recommended";
import KeepGoing from "./Components/KeepGoing";
import useGetMe from "@/hooks/useGetMe";
import { useUserAnalyticsQuery } from "@/store/Api/Analytics.api";
import { Suspense } from "react";
import { FaTruckLoading } from "react-icons/fa";

const StatsCardData = [
  {
    id: "current_level",
    title: "Current Level",
    img: "/Frame.png",
    level: {
      number: 2,
      name: "Customer Service Professional",
      progress_percentage: 75,
    },
  },
  {
    id: "total_points",
    title: "Total Points",
    img: "/Frame (1).png",
    points: {
      total: 200,
      description: "Available to spend",
    },
  },
  {
    id: "badges",
    title: "Badge Earned",
    img: "/Frame (2).png",
    badges: {
      earned: 3,
      total: 20,
      list: [
        { badge_id: 1, img: "/Badge1.png", bg: "bg-primary-blue" },
        { badge_id: 2, img: "/Badge2.png", bg: "bg-secondary-green" },
        { badge_id: 3, img: "/Badge3.png", bg: "bg-light-blue" },
      ],
      cta_label: "View Available Badges",
      cta_link: "/badges",
    },
  },
];

const Loader = () => (
  <div className="flex items-center justify-center h-96">
    <p className="text-primary-blue text-lg animate-pulse">
      <FaTruckLoading />
    </p>
  </div>
);

const UserDashboard = () => {
  const { fullName, isLoading: userLoading } = useGetMe() || {};
  const { data, isLoading: analyticsLoading } = useUserAnalyticsQuery({});
  const loading = userLoading || analyticsLoading;
  console.log(data);

  return (
    <Suspense fallback={<Loader />}>
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          <Header title={`Welcome, ${fullName || ""}`} />
          <StatsCard data={StatsCardData} />
          <div className="grid xl:grid-cols-3 gap-6 w-full">
            <div className="xl:col-span-2 space-y-6 w-full">
              <RunningCourses />
              <CompletedCourses />
            </div>
            <div className="w-full space-y-6">
              <Recommended />
              <KeepGoing />
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default UserDashboard;
