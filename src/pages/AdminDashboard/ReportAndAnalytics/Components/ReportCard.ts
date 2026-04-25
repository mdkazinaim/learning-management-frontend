import { FiUsers, FiBarChart2, FiDollarSign } from "react-icons/fi";
import { GoBook } from "react-icons/go";

const reportCard = [
  {
    _id: "7a8b9c0d1e2f",
    title: "Total Users",
    value: "12,458",
    trend: {
      percentage: 12.5,
      direction: "up",
      isVisible: true,
    },
    subText: null,
    icon: FiUsers,
    iconColor: "text-light-blue", // Adjusted to standard Tailwind blue
  },
  {
    _id: "7a8b9c0d1e3g",
    title: "Active Courses",
    value: "156",
    trend: {
      percentage: 0,
      direction: "neutral",
      isVisible: false,
    },
    subText: "Available courses",
    icon: GoBook,
    iconColor: "text-primary-yellow", // Adjusted to match yellow icon
  },
  {
    _id: "7a8b9c0d1e4h",
    title: "Completion Rate",
    value: "68%",
    trend: {
      percentage: 8.3,
      direction: "up",
      isVisible: true,
    },
    subText: null,
    icon: FiBarChart2, // Changed to a Chart icon
    iconColor: "text-secondary-green", // Adjusted to match green icon
  },
  {
    _id: "7a8b9c0d1e5i",
    title: "Revenue",
    value: "$45.2K",
    trend: {
      percentage: 15.2,
      direction: "up",
      isVisible: true,
    },
    subText: null,
    icon: FiDollarSign, // Changed to Dollar icon
    iconColor: "text-primary-red", // Adjusted to match red icon
  }
];
export default reportCard