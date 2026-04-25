import { useAdminAnalyticsQuery } from "@/store/Api/Analytics.api";
import { useState } from "react";

// TypeScript interface for course
interface TopSellingCourse {
  courseId: string;
  courseName: string;
  totalEnrollCount: number;
  totalSales: number; // placeholder, currently 0
}

const TopPerformingCourses = () => {
  const { data, isLoading } = useAdminAnalyticsQuery(null);

  // State to store courses
  const [courses, setCourses] = useState<TopSellingCourse[]>([]);

  // Update state when API data arrives
  if (!isLoading && data?.data?.topSellingCourses && courses.length === 0) {
    setCourses(data.data.topSellingCourses);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <h2 className="mb-4">Top Performing Courses</h2>

      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="p-4 bg-primary-white rounded-xl flex justify-between items-center hover:shadow-md transition-all"
          >
            <div>
              <h3 className="mb-1">{course.courseName}</h3>
              <p className="text-sm text-secondary-text">
                {course.totalEnrollCount.toLocaleString()} enrolments
              </p>
            </div>

            <div className="flex items-center gap-8">
              {/* <div className="text-right">
                <p className="text-xs text-secondary-text">Completion</p>
                <p className="font-medium">—</p>
              </div> */}

              <div className="text-right">
                <p className="text-xs text-secondary-text">Revenue</p>
                <p className="font-medium text-primary-green">${course.totalSales}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformingCourses;
