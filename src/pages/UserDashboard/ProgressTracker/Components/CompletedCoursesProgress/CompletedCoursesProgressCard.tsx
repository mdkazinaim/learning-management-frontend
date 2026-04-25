/* eslint-disable @typescript-eslint/no-explicit-any */

import PrimaryButton from "@/common/PrimaryButton";
import { PiCertificateFill } from "react-icons/pi";

const CompletedCoursesProgressCard = ({ course }: any) => {
  
  return (
    <div className="bg-gray border border-border rounded-xl p-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h3 className="">{course.title}</h3>
          {/* Tag */}
          <div className="flex items-center gap-4">
            <span className="inline-block px-3 py-1 bg-primary-text/30 text-primary-blue rounded-md font-medium mt-1">
              {course.course_tag}
            </span>
            <h6>Completed: {course.details.completion_date}</h6>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton
            type="Primary"
            title="Certified"
            leftIcon={<PiCertificateFill className="text-white! size-6"/>}
            className="bg-primary-yellow text-white text-lg! font-medium! cursor-default"
          />
          <img src="/Certified.png" alt=""/>
        </div>
      </div>
    </div>
  );
};

export default CompletedCoursesProgressCard;
