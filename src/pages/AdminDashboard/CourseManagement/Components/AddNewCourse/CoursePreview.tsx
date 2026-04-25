/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PrimaryButton from "@/common/PrimaryButton";
import { BsStopwatch } from "react-icons/bs";
import { TiStarFullOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GoBook } from "react-icons/go";
import { PiCertificateLight } from "react-icons/pi";
import { useGetCourseByIdQuery } from "@/store/Api/Course.api";
import { useAppSelector } from "@/hooks/useRedux";

const CoursePreview = () => {
  const role = useAppSelector((state) => state.auth.user?.role);
  const { courseId } = useParams();
  const { data } = useGetCourseByIdQuery(courseId as string);
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const selectedCourse = data?.data;

  // 🔹 Mapping layer
  const course = selectedCourse && {
    ...selectedCourse,
    image_url: selectedCourse.thumbnail,
    price: selectedCourse.prices,
    what_you_learn: selectedCourse.whatsUserLearn,
    enrolled_count: selectedCourse.totalLessons,
    ratings: "4.8",
    about_this_course: selectedCourse.description,
    details: {
      duration_hours: `${Math.floor(selectedCourse.totalDuration / 60)}h ${
        selectedCourse.totalDuration % 60
      }m`,
    },
    course_curriculam: selectedCourse.modules?.map((module: any) => ({
      ...module,
      id: module._id,
    })),
  };

  const toggleModule = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  return (
    <div className="">
      <div className="relative">
        {course && (
          <div className="space-y-6">
            <PrimaryButton
              type="Badge"
              title={course.courseTag}
              className="bg-light-gray/30 text-primary-blue rounded-xl text-sm! px-2! py-0.5!"
            />

            <div className="space-y-2">
              <h2 className="">{course.title}</h2>
              <p>{course.description}</p>
            </div>

            <div className="flex items-center gap-6">
              <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                <BsStopwatch size={20} />
                {course.details.duration_hours}
              </h6>

              <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                <FiUsers size={20} />
                {course.enrolled_count}
              </h6>

              <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                <TiStarFullOutline size={20} className="text-primary-yellow" />
                {course.ratings}
              </h6>
            </div>

            <div className="flex items-start gap-6">
              <div className="space-y-6 min-w-2/3">
                <div className="flex gap-6 relative">
                  <div className="w-full h-[60vh] rounded-xl">
                    <img
                      src={course.image_url}
                      alt=""
                      className="rounded-xl object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="space-y-4 p-6 rounded-xl border border-border bg-white ">
                  <h2>About This Course</h2>
                  <p>{course.about_this_course}</p>
                </div>

                <div className="space-y-4 p-6 rounded-xl border border-border bg-white ">
                  <h2>What You'll Learn</h2>

                  <div className="grid grid-cols-2 gap-3">
                    {course.what_you_learn?.map(
                      (item: string, index: number) => (
                        <h6
                          key={index}
                          className="flex items-center gap-1 text-light-gray font-normal"
                        >
                          <IoMdCheckmarkCircleOutline
                            size={20}
                            className="text-light-blue"
                          />
                          {item}
                        </h6>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-4 p-6 rounded-xl border border-border bg-white ">
                  <h2>Course Curriculum</h2>

                  <div className="space-y-4">
                    {course.course_curriculam?.map(
                      (module: any, index: number) => {
                        const isExpanded = expandedModules.includes(module.id);
                        return (
                          <div
                            key={module.id}
                            className="p-6 rounded-xl border border-border bg-primary-white cursor-pointer"
                          >
                            <div
                              className="flex items-center justify-between"
                              onClick={() => toggleModule(module.id)}
                            >
                              <div className="flex items-center gap-2">
                                <div className="size-10 rounded-full text-white bg-light-blue flex items-center justify-center">
                                  {index + 1}
                                </div>
                                <div>
                                  <h6>{module.moduleName}</h6>
                                  <p className="text-light-gray">
                                    Lessons: {module.lessons.length}
                                  </p>
                                </div>
                              </div>

                              <h6 className="text-light-gray">
                                {course.details.duration_hours}
                              </h6>
                            </div>

                            {isExpanded && (
                              <div className="mt-4 pl-8 space-y-2">
                                {module.lessons.map((lesson: any) => (
                                  <div
                                    key={lesson._id}
                                    className="p-2 border border-border rounded bg-gray/10"
                                  >
                                    <h6 className="font-medium">
                                      {lesson.lessonName}
                                    </h6>
                                    {lesson.duration > 0 && (
                                      <p className="text-xs text-light-gray">
                                        Duration:{" "}
                                        {Math.floor(lesson.duration / 60)}h{" "}
                                        {lesson.duration % 60}m
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="space-y-4 p-6 rounded-xl border border-border bg-white ">
                  <h2>Your Instructor</h2>

                  <div className="flex items-center gap-2">
                    <img
                      src={course.instructorProfile}
                      alt=""
                      className="size-24 rounded-full border border-border"
                    />

                    <div className="space-y-2">
                      <div className="space-y-1">
                        <h3>{course.instructorName}</h3>
                        <p>{course.instructorTitle}</p>
                      </div>
                      <p>{course.instructorDescription}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-fit sticky top-0">
                <div className="mb-6">
                  <PrimaryButton
                    type="Primary"
                    title="Edit Course Details"
                    className="bg-secondary-green text-white text-lg place-self-end"
                    onClick={() =>
                      navigate("/admin/course-management/add-new-course")
                    }
                  />
                </div>

                <div className="space-y-4 p-6 rounded-xl border border-border bg-white ">
                  <div className="space-y-1">
                    <h2>${course.price}</h2>
                    <h6>One Time Payment</h6>
                  </div>

                  <hr className="border border-border" />

                  <h6 className="mb-4">This course includes :</h6>

                  <div className="flex flex-col items-baseline gap-3 mb-8!">
                    <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                      <BsStopwatch size={20} />
                      {course.details.duration_hours} hours on-demand content
                    </h6>

                    <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                      <GoBook size={20} />
                      {course.totalModules} modules
                    </h6>

                    <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                      <PiCertificateLight size={20} />
                      Certificate of completion
                    </h6>
                  </div>

                  {role === "ADMIN" ? (
                    <PrimaryButton
                      type="Primary"
                      title="Publish Course"
                      onClick={() => {
                        navigate(`/admin/course-management`);
                        localStorage.removeItem("courseId");
                      }}
                      className="bg-secondary-green text-white text-lg w-full"
                    />
                  ) : (
                    <Link to={`/user/course/checkout/${course._id}`}>
                      <PrimaryButton
                        type="Primary"
                        title="Enroll Now"
                        className="bg-light-blue text-white text-lg w-full"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePreview;
