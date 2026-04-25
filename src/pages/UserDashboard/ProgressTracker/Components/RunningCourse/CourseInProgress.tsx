/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseInProgressCard from "./CourseInProgressCard";
import courses from "@/utils/Json/CourseData.json";
const CourseInProgress = () => {
  return (
    <div className="p-6 bg-white rounded-xl border border-border space-y-6">
      <h2 className="text-xl font-semibold">Courses In Progress</h2>
      <div className="space-y-4">
        {courses
          .filter((c: any) => c.status === "Running")
          .map((course: any) => (
            <CourseInProgressCard key={course._id} course={course} />
          ))}
      </div>
    </div>
  );
};

export default CourseInProgress;
