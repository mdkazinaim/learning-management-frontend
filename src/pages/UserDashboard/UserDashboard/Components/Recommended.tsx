/* eslint-disable @typescript-eslint/no-explicit-any */
import data from "@/utils/Json/CourseData.json";
import { GoStarFill } from "react-icons/go";
const Recommended = () => {
  return (
    <div className="w-full p-6 space-y-4 border border-border bg-white rounded-xl">
        <div className="">
      <h3>Recommended For You</h3>
      <p>Based on your progress and interests</p>
        </div>
      <div className="space-y-4">
        {data.map((course: any) => (
          <div className="flex items-center justify-between p-2 border border-border bg-primary-white rounded-xl cursor-pointer">
            <div className="flex items-center gap-2">
                <img src={course.image_url} alt="" className="size-10 rounded-xl border border-border" />
                <div className="">
            <h6>{course.title}</h6>
            <p>{course.details.duration_hours} {course.details.duration_hours > 1 ? "hours" : ""}</p>
                </div>
            </div>
            <p className="flex items-center gap-1">
              <GoStarFill className="text-amber-400"/>
              {course.ratings}
            </p>
          </div>
        ))}
      </div>
      <button className="text-primary-blue underline">View All</button>
    </div>
  );
};

export default Recommended;
