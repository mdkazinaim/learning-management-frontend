/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import course from "@/utils/Json/CourseData.json";
import PrimaryButton from "@/common/PrimaryButton";
import { BsStopwatch } from "react-icons/bs";
import { TiStarFullOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GoBook } from "react-icons/go";
import { PiCertificateLight } from "react-icons/pi";

const CourseDetails = () => {
  // Retrieve dynamic course ID from URL
  const { id } = useParams();

  // Identify the selected course by matching the route param with JSON data
  const selectedCourse = course.find((course) => course._id === id);

  // Debugging: Track completed module count in console for validation
  console.log(selectedCourse?.details.completedModules);

  return (
    <div className="">
      <div className="relative">
        {selectedCourse && (
          <div className="space-y-6">
            {/* Course Category Badge */}
            <PrimaryButton
              type="Badge"
              title={selectedCourse.course_tag}
              className="bg-light-gray/30 text-primary-blue rounded-xl text-sm! px-2! py-0.5!"
            />

            {/* Course Title + Description */}
            <div className="space-y-2">
              <h2 className="">{selectedCourse.title}</h2>
              <p>{selectedCourse.description}</p>
            </div>

            {/* Meta Information: Duration, Enrolled Count, Rating */}
            
            <div className="flex items-center gap-6">
              <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                <BsStopwatch size={20} />
                {selectedCourse.details.duration_hours}
              </h6>

              <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                <FiUsers size={20} />
                {selectedCourse.enrolled_count}
              </h6>

              <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                <TiStarFullOutline size={20} className="text-primary-yellow" />
                {selectedCourse.ratings}
              </h6>
            </div>
            <div className="flex items-start gap-6">
            <div className="space-y-6 min-w-2/3">
            {/* Course Banner / Large Image */}
            <div className="flex gap-6 relative">
              <div className="w-full h-[60vh] rounded-xl">
                <img
                  src={selectedCourse.image_url}
                  alt=""
                  className="rounded-xl object-cover w-full h-full"
                />
              </div>
            </div>

            {/* About This Course Section */}
            <div className="space-y-4 p-6 rounded-xl border border-border bg-white ">
              <h2>About This Course</h2>
              <p>{selectedCourse.about_this_course}</p>
            </div>

            {/* What You Will Learn Section */}
            <div className="space-y-4 p-6 rounded-xl border border-border bg-white ">
              <h2>What You'll Learn</h2>

              {/* Bullet grid with icon + skill */}
              <div className="grid grid-cols-2 gap-3">
                {selectedCourse.what_you_learn.map(
                  (item: any, index: number) => (
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

            {/* Course Curriculum Section */}
            <div className="space-y-4 p-6 rounded-xl border border-border bg-white ">
              <h2>Course Curriculum</h2>

              {/* Each module rendered as clean card */}
              <div className="space-y-4">
                {selectedCourse.course_curriculam.map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl border border-border bg-primary-white "
                    >
                      <div className="flex items-center justify-between">
                        {/* Module Number + Title */}
                        <div className="flex items-center gap-2">
                          <div className="size-10 rounded-full text-white bg-light-blue flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <h6>{item.title}</h6>
                            <p className="text-light-gray">
                              Modules: {item.lessons}
                            </p>
                          </div>
                        </div>

                        {/* Course duration (static from course details) */}
                        <h6 className="text-light-gray">
                          {selectedCourse.details?.duration_hours}h
                        </h6>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Instructor Section */}
            <div className="space-y-4 p-6 rounded-xl border border-border bg-white ">
              <h2>Your Instructor</h2>

              {/* Instructor Image + Bio */}
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src={selectedCourse.course_instructor.image}
                    alt=""
                    className="size-24 rounded-full border border-border"
                  />

                  <div className="space-y-2">
                    {/* Instructor Name + Expertise */}
                    <div className="space-y-1">
                      <h3>{selectedCourse.course_instructor.name}</h3>
                      <p>{selectedCourse.course_instructor.expertise}</p>
                    </div>

                    {/* Instructor Description */}
                    <p>{selectedCourse.course_instructor.description}</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
                {/* Price Card Section */}
              <div className=" space-y-4 p-6 rounded-xl border border-border bg-white w-full h-fit sticky top-0">
                <div className="space-y-1">
                <h2>${selectedCourse.price}</h2>
                <h6>One Time Payment</h6>
                </div>
                <hr className="border border-border" />
                <h6 className="mb-4">This course includes :</h6>
                <div className="flex flex-col items-baseline gap-3 mb-8!">
                  <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                    <BsStopwatch size={20} />
                    {selectedCourse.details.duration_hours}hours on-demand
                    content
                  </h6>

                  <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                    <GoBook size={20} />
                    {selectedCourse.details.totalModules} modules
                  </h6>

                  <h6 className="flex items-center gap-1.5 text-light-gray justify-center">
                    <PiCertificateLight size={20} />
                    Certificate of completion
                  </h6>
                </div>
                <Link to={`/user/course/checkout/${selectedCourse._id}`}>
                <PrimaryButton type="Primary" title="Enroll Now" className="bg-light-blue text-white text-lg w-full"/>
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
