import { Play, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";
import courseData from "@/utils/Json/CourseData.json";
import { useParams } from "react-router-dom";
const CoursePlayer = () => {
  const [expandedSections, setExpandedSections] = useState(new Set([0]));
  const [isPlaying, setIsPlaying] = useState(false);
  const {id} = useParams()
  const course = courseData.find(item => item._id === id)!

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) newExpanded.delete(index);
    else newExpanded.add(index);
    setExpandedSections(newExpanded);
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-2 space-y-6">

            {/* COURSE INFO */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-start gap-3">
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="size-20 rounded-md object-cover"
                />
                <div>
                  <h3 className="">{course.title}</h3>
                  <p className="mt-1">{course.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="mt-3 flex items-center gap-2">
                  <img
                    src={course.course_instructor.image}
                    alt={course.course_instructor.name}
                    className="size-8 rounded-full object-cover"
                  />
                  <p className="">{course.course_instructor.name}</p>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Clock size={14} className="text-secondary-text" />
                  <span className="text-xs text-secondary-text">
                    {course.details.duration_hours} hours
                  </span>
                </div>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
              <h3 className="mb-2">Your Progress</h3>

              <div className="w-full bg-gray rounded-full h-2">
                <div
                  className="bg-primary-blue h-2 rounded-full"
                  style={{ width: `${course.details.progress_percent}%` }}
                ></div>
              </div>

              <p className="mt-1">{course.details.progress_percent}% Complete</p>
            </div>

            {/* CURRICULUM */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h3 className="mb-4">Course Curriculum</h3>

              <div className="space-y-3">
                {course.course_curriculam.map((section, index) => (
                  <div key={index} className="border border-border rounded-lg overflow-hidden cursor-pointer">
                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full px-4 py-3 flex justify-between items-center transition-colors bg-gray"
                    >
                      <div className="flex items-center gap-3 cursor-pointer w-full">
                        <div className="size-8 bg-light-blue text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>

                        <div className="text-start cursor-pointer">
                          <h6 className="text-primary-text">{section.title}</h6>
                          <p className="text-xs text-secondary-text">
                            {section.lessons} lessons
                          </p>
                        </div>
                      </div>

                      {expandedSections.has(index) ? (
                        <ChevronUp size={16} className="text-secondary-text cursor-pointer" />
                      ) : (
                        <ChevronDown size={16} className="text-secondary-text cursor-pointer" />
                      )}
                    </button>

                    {expandedSections.has(index) && (
                      <div className="px-4 pb-3 bg-gray cursor-pointer">
                        <ul className="space-y-2 cursor-pointer">
                          <li className="flex items-center gap-2 text-sm text-secondary-text">
                            <div className="w-4 h-4 bg-primary-white rounded-full"></div>
                            <span>
                              {section.completedLessons} / {section.lessons} Lessons Completed
                            </span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-secondary-text">
                            <div className="w-4 h-4 rounded-full"></div>
                            <span>Duration: {section.time}</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VIDEO PLAYER */}
          <div className="lg:col-span-3">
            <div className="sticky top-0">
              <div className="bg-black rounded-xl overflow-hidden aspect-video relative">
                <img
                  src="https://placehold.co/800x450/319795/ffffff?text=Video+Player"
                  alt="Course video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center hover:bg-primary-blue/90 transition-colors"
                  >
                    <Play size={24} className="text-white ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
