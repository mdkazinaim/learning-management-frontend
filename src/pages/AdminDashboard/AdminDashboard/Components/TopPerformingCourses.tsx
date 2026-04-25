import { useAdminAnalyticsQuery } from "@/store/Api/Analytics.api";

const TopPerformingCourses = () => {
  const { data, isLoading } = useAdminAnalyticsQuery(null);

  const courses = data?.data?.topSellingCourses || [];
  console.log(courses);
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="">Top Performing Courses</h2>
      </div>
      
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 bg-gray-100 rounded-xl animate-pulse h-20"></div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-8 text-secondary-text">
          No course data available
        </div>
      ) : (
        <div className="space-y-3">
          {courses.map((course: any) => (
            <div key={course.courseId} className="p-4 bg-primary-white rounded-xl flex justify-between items-center border border-border">
              <div>
                <h3 className="mb-1">{course.courseName}</h3>
                <div className="flex items-center gap-4 text-sm text-secondary-text">
                  <span>{course.totalEnrollCount} enrolments</span>
                </div>
              </div>
              {/* <div className="flex items-center gap-1">
                <Star size={20} fill="#FFD700" stroke="#FFD700" />
                <span className="text-sm text-primary-text">4.8</span>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopPerformingCourses;