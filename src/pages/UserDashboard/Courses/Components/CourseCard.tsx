/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock, Star, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }: any) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  const isCompleted = course.status === "Completed";
  const isRunning = course.status === "Running";

  const handleEnroll = () => {
    setIsEnrolled(true);
    navigate(`course-details/${course._id}`);
  };

  return (
    <div className="h-full">
      <div
        className="
          bg-white rounded-xl shadow-sm border border-border 
          overflow-hidden hover:shadow-md transition-shadow 
          flex flex-col h-full
        "
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover"
          />

          {isCompleted && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Completed
            </div>
          )}
          {isRunning && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Running
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Tags */}
          <div className="flex gap-2 mb-3">
            <span className="px-2 py-1 bg-gray-100 text-secondary-text text-xs rounded-full">
              {course.course_tag}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-secondary-text text-xs rounded-full">
              {course.course_lvl}
            </span>
          </div>
          {/* Title */}
          <h3 className="text-lg font-semibold text-primary-text mb-2 line-clamp-2 flex-grow">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-secondary-text mb-3 line-clamp-2">
            {course.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-secondary-text mb-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{course.details.duration_hours || 6} hours</span>
            </div>

            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{course.enrolled_count} enrolled</span>
            </div>

            <div className="flex items-center gap-1">
              <Star size={14} fill="#FFD700" stroke="#FFD700" />
              <span>{course.ratings}.0</span>
            </div>
          </div>

          {/* Button (sticks to bottom) */}
          <div className="mt-auto">
            <button
              onClick={handleEnroll}
              disabled={isEnrolled}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                isEnrolled
                  ? "bg-gray-200 text-secondary-text cursor-not-allowed"
                  : "bg-primary-blue text-white hover:bg-primary-blue/90"
              }`}
            >
              {isEnrolled ? "Enrolled" : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
