/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseCard from "@/common/CourseCard";
import data from "@/utils/Json/CourseData.json";

const RunningCourses = () => {
  return (
    <div className="p-4 border border-border bg-white rounded-xl">
      <h2>Running Courses</h2>
      <div className="grid gap-10 p-4">
        {data.filter(item=> item.status === "Running").map((course: any) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default RunningCourses;