import Header from "@/common/Header";
import AdminDashboardStats from "./Components/AdminDashboardStats";
import TopPerformingCourses from "./Components/TopPerformingCourses";
import RecentActivity from "./Components/RecentActivity";
import CourseHighlights from "./Components/CourseHighlights";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Welcome, Super Admin!"
        description="Platform Overview and Dashboard Management "
      />
      <AdminDashboardStats />
      <div className="space-y-6 xl:space-y-0 xl:flex items-start gap-6">
        <div className="flex-2">
          <TopPerformingCourses />
        </div>
        <RecentActivity />
      </div>
      <CourseHighlights />
    </div>
  );
};

export default AdminDashboard;
