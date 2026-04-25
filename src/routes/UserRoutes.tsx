import Courses from "@/pages/UserDashboard/Courses/Courses";
import UserDashboard from "@/pages/UserDashboard/UserDashboard/UserDashboard";
import { MdDashboardCustomize, MdSupportAgent } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { GiStarMedal } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import ProgressTracker from "@/pages/UserDashboard/ProgressTracker/ProgressTracker";
import BadgeAndAchievement from "@/pages/UserDashboard/BadgeAndAchievement/BadgeAndAchievement";
import Settings from "@/pages/UserDashboard/Settings/Settings";
import CourseDetails from "@/pages/UserDashboard/Courses/Components/CourseDetails";
import CourseCatalog from "@/pages/UserDashboard/Courses/Components/CourseCatalog";
import CourseCheckout from "@/pages/UserDashboard/Courses/Components/CourseCeckout";
import Success from "@/pages/UserDashboard/Courses/Components/Success";
import CoursePlayer from "@/pages/UserDashboard/Courses/Components/CoursePlayer";
import Support from "@/pages/UserDashboard/Support/Support";
export const userRoutes = [
  {
    name: "Dashboard",
    icon: MdDashboardCustomize,
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Course",
    icon: FaUserGraduate,
    path: "course",
    element: <Courses />,
    children: [
      {
        index: true,
        element: <CourseCatalog />,
      },
      {
        name: "Course Details",
        path: "course-details/:id",
        element: <CourseDetails />,
      },
      {
        name: "Course Checkout",
        path: "checkout/:id",
        element: <CourseCheckout />,
      },
      {
        name: "Success",
        path: "success/:id",
        element: <Success />,
      },
      {
        name: "Course Player",
        path: "course-player/:id",
        element: <CoursePlayer />,
      },
    ],
  },
  {
    name: "Progress Tracker",
    icon: GiProgression,
    path: "progress-tracker",
    element: <ProgressTracker />,
  },
  {
    name: "Badges & Achievement",
    icon: GiStarMedal,
    path: "badges",
    element: <BadgeAndAchievement />,
  },
  {
    name: "Settings",
    icon: IoMdSettings,
    path: "settings",
    element: <Settings />,
  },
  {
    name: "Support",
    icon: MdSupportAgent,
    path: "support",
    element: <Support />,
  },
];
