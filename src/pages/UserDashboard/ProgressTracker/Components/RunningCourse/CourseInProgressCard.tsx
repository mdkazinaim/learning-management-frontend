/* eslint-disable @typescript-eslint/no-explicit-any */
import { Progress } from "@/components/ui/progress";

const CourseInProgressCard = ({ course }: any) => {
  const modulesCompleted = course.details.completedModules;
  const totalModules = course.details.totalModules;

  return (
    <div className="bg-gray border border-border rounded-xl p-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h3 className="">
            {course.title}
          </h3>
          <h6 className="">
            {course.description}
          </h6>

          {/* Tag */}
          <span className="inline-block px-3 py-1 bg-primary-text/30 text-primary-blue rounded-md font-medium mt-1">
              {course.course_tag}
            </span>
        </div>

        {/* Percentage */}
        <p className="text-[15px] font-semibold text-primary-blue">
          {course.details.progress_percent}%
        </p>
      </div>

      {/* Progress Bar */}
      <Progress value={course.details.progress_percent} className="h-2 bg-secondary-purple" />

      {/* Modules Completed */}
      <p className="">
        {modulesCompleted} of {totalModules} modules completed
      </p>
    </div>
  );
};

export default CourseInProgressCard;
