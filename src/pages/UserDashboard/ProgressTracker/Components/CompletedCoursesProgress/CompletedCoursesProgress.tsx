/* eslint-disable @typescript-eslint/no-explicit-any */
import courses from "@/utils/Json/CourseData.json";
import CompletedCoursesProgressCard from "./CompletedCoursesProgressCard";

const CompletedCoursesProgress = () => {

  return (
    <div className="p-6 bg-white rounded-xl border border-border space-y-4">
      <h2 className="">Completed Courses</h2>
      <div className="space-y-4">
        {courses
          .filter((c: any) => c.status === "Completed")
          .map((course: any) => (
            <CompletedCoursesProgressCard key={course._id} course={course} />
          ))}
      </div>
    </div>
  );
};

export default CompletedCoursesProgress;