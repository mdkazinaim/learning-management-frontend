import Header from "@/common/Header";
// import ReportCardStats from "./Components/ReportCardStats";
import ReportCharts from "./Components/ReportCharts";
import TopPerformingCourses from "./Components/TopPerformingCourses";
import AdminDashboardStats from "../AdminDashboard/Components/AdminDashboardStats";

const ReportAndAnalytics = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Report and Analytics"
        description="Platform insights and performance metrics"
      />
      {/* <ReportCardStats /> */}
      <AdminDashboardStats />
      <ReportCharts />
      <TopPerformingCourses />
    </div>
  );
};

export default ReportAndAnalytics;
