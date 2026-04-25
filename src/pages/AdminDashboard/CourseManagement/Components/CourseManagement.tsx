import Header from "@/common/Header";
import CourseTable from "./CourseTable/CourseTable";

const CourseManagement = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Course Management"
        description="Create and manage courses"
      />
      <CourseTable />
    </div>
  );
};

export default CourseManagement;
