/* eslint-disable @typescript-eslint/no-explicit-any */

import { Progress } from "@/components/ui/progress";
import PrimaryButton from "./PrimaryButton";
import { BsStopwatch } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";

const CourseCard = ({ course }: any) => {
  return (
    <div className="rounded-lg bg-primary-white border border-border p-4 space-y-5">
      <div className="lg:flex items-center justify-between space-y-4 gap-4">
        <div className="flex items-center lg:w-3/4 gap-4">
          <img
            src={course.image_url}
            alt=""
            className="size-20 rounded-xl border border-border object-cover"
          />
          <div className="space-y-1">
            <h3>{course.title}</h3>
            <p className="">{course.description}</p>
            <div className="">
              {course.status === "Running" ? (
                <div className="flex items-center gap-4">
                  <p className="flex items-center gap-1 text-xs">
                    <BsStopwatch />
                    {course.details.duration_hours}h
                  </p>
                  <p className="flex items-center gap-1 text-xs">
                    <GoCalendar />
                    Due : {course.details.due_date}
                  </p>
                </div>
              ) : (
                <p className="flex items-center gap-1">
                  <GoCalendar />
                  Completed on {course.details.completion_date}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="">
          {course.status === "Running" ? (
            <PrimaryButton
              title="Continue"
              type="Primary"
              className="w-full px-20! py-6!"
            />
          ) : (
            <img src="/Completed.png" alt="" className="size-10 hidden lg:flex"/>
          )}
        </div>
      </div>
      {course.status === "Running" && (
        <div className="space-y-4">
          <Progress value={course.details.progress_percent} className="" />
          <h6 className="font-normal text-light-gray">
            {course.details.progress_percent}% Completed
          </h6>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
