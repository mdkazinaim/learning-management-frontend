import AdminDashboard from "@/pages/AdminDashboard/AdminDashboard/AdminDashboard";
import BadgesAndAchievements from "@/pages/AdminDashboard/BadgesAndAchievements/BadgesAndAchievements";
import CourseManagement from "@/pages/AdminDashboard/CourseManagement/Components/CourseManagement";
import ReportAndAnalytics from "@/pages/AdminDashboard/ReportAndAnalytics/ReportAndAnalytics";
import UserManagement from "@/pages/AdminDashboard/UserManagement/Components/UserManagement";
import { FaUserGraduate } from "react-icons/fa";
import {
  MdDashboardCustomize,
  MdManageSearch,
  MdSupportAgent,
} from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { RiMedal2Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import Settings from "@/pages/AdminDashboard/Settings/Settings";
import Support from "@/pages/AdminDashboard/Support/Support";
import AddNewCourse from "@/pages/AdminDashboard/CourseManagement/Components/AddNewCourse/AddNewCourse";
import CourseContainer from "@/pages/AdminDashboard/CourseManagement/CourseContainer";
import CoursePreview from "@/pages/AdminDashboard/CourseManagement/Components/AddNewCourse/CoursePreview";
import UserManagementContainer from "@/pages/AdminDashboard/UserManagement/UserManagementContainer";
import EmployeeManagement from "@/pages/AdminDashboard/UserManagement/Components/EmployeeManagement/EmployeeManagement";
export const adminRoutes = [
  {
    name: "Dashboard",
    icon: MdDashboardCustomize,
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    icon: FaUserGraduate,
    path: "user-management",
    element: <UserManagementContainer />,
    children: [
      {
        index: true,
        element: <UserManagement />,
      },
      {
        path: "employee-management",
        element: <EmployeeManagement />,
      },
    ],
  },
  {
    name: "Course Management",
    icon: MdManageSearch,
    path: "course-management",
    element: <CourseContainer />,
    children: [
      {
        index: true,
        element: <CourseManagement />,
      },
      {
        name: "Add New Course",
        path: "add-new-course",
        element: <AddNewCourse />,
      },
      {
        name: "Course Preview",
        path: "course-preview/:courseId",
        element: <CoursePreview />,
      },
    ],
  },
  {
    name: "Report & Analytics",
    icon: TbReportSearch,
    path: "report-and-analytics",
    element: <ReportAndAnalytics />,
  },
  {
    name: "Badges & Achievements",
    icon: RiMedal2Fill,
    path: "badges-and-achievements",
    element: <BadgesAndAchievements />,
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
