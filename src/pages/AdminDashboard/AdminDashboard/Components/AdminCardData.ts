import { CiTrophy } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { GoBook } from "react-icons/go";

export interface AdminCardItem {
  _id: string;
  title: string;
  value: number | string;
  trend: {
    percentage: number;
    direction: "up" | "down" | "neutral";
    isVisible: boolean;
  };
  subText: string | null;
  icon: any;
  iconColor: string;
}

// Function to generate card data from API response
export const generateCardData = (apiData: any): AdminCardItem[] => {
  return [
    {
      _id: "total-users",
      title: "Total Users",
      value: apiData?.totalUser || 0,
      trend: {
        percentage: 0,
        direction: "neutral",
        isVisible: false,
      },
      subText: null,
      icon: FiUsers,
      iconColor: "text-light-blue",
    },
    {
      _id: "active-learners",
      title: "Active Learners",
      value: apiData?.activeLerner || 0,
      trend: {
        percentage: 0,
        direction: "neutral",
        isVisible: false,
      },
      subText: null,
      icon: GoBook,
      iconColor: "text-secondary-green",
    },
    {
      _id: "total-courses",
      title: "Total Courses",
      value: apiData?.totalCourse || 0,
      trend: {
        percentage: 0,
        direction: "neutral",
        isVisible: false,
      },
      subText: `${apiData?.totalActiveCourse || 0} active courses`,
      icon: GoBook,
      iconColor: "text-primary-yellow",
    },
    {
      _id: "total-revenue",
      title: "Total Revenue",
      value: `$${apiData?.revenue?.totalSell || 0}`,
      trend: {
        percentage: 0,
        direction: "neutral",
        isVisible: false,
      },
      subText: `${apiData?.revenue?.totalEnrollCount || 0} enrollments`,
      icon: CiTrophy,
      iconColor: "text-orange-600",
    },
  ];
};