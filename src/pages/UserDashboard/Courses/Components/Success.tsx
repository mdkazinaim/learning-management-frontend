/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import course from "@/utils/Json/CourseData.json";
import { Progress } from "@/components/ui/progress";
import { FaRegCirclePlay } from "react-icons/fa6";
import { GoBook, GoStopwatch } from "react-icons/go";
import { PiCertificateLight } from "react-icons/pi";
import PrimaryButton from "@/common/PrimaryButton";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const Success = () => {
  const { id } = useParams();

  const selectedCourse = course.find((course) => course._id === id)!;

  const totalLessons = selectedCourse.course_curriculam.reduce(
    (sum, item) => sum + item.lessons!,
    0
  );

  // Fire confetti on first page load
  useEffect(() => {
    confetti({
      particleCount: 300,
      spread: 90,
      origin: { y: 0.4, x: 0.6 },
    });
     setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { x: 0.5, y: 0.6 }
    });
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { x: 0.7, y: 0.6 }
    });
  }, 400);


  }, []);

  return (
    <div className="relative ">
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 relative z-1">
        <img src="/Group.png" alt="" className="z-90" />

        <div
          className="w-96 h-80 bg-primary-red rounded-xl flex items-center justify-center absolute blur-[250px] z-1 -top-40"
        ></div>

        <div className="text-center space-y-2 z-90">
          <h1>Enrollment Successful!</h1>
          <h6>
            You're all set to begin your learning journey. Let's get started!
          </h6>
        </div>
      </div>

      <div className="space-y-6 md:flex items-start gap-6 absolute z-90">
        <div className="space-y-6 md:min-w-2/3">
          <div className="space-y-4 p-6 rounded-xl border border-border bg-white flex items-center gap-4">
            <img
              src={selectedCourse.image_url}
              alt=""
              className="size-30 rounded-xl border border-border object-cover"
            />
            <div>
              <div className="space-y-1">
                <h2>{selectedCourse.title}</h2>
                <p className="md:w-2/3">
                  {selectedCourse.about_this_course}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src={selectedCourse.course_instructor.image}
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
                <p>{selectedCourse.course_instructor.name}</p>
                <h6 className="ml-2 px-4 bg-primary-white text-primary-text rounded-md">
                  {selectedCourse.details.duration_hours}h
                </h6>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-6 rounded-xl border border-border bg-white">
            <div className="flex items-center justify-between">
              <h2>Your Progress</h2>
              <p className="px-4 py-0.5 rounded-md bg-light-gray/20 text-primary-blue">
                0% Completed
              </p>
            </div>
            <Progress value={1} className="h-2 bg-secondary-purple" />
            <p>
              You haven't started any lessons yet. Click{" "}
              <a href="#" className="text-primary-blue font-semibold">
                “Start Learning”
              </a>{" "}
              to begin your first lesson!
            </p>
          </div>

          <div className="space-y-4 p-6 rounded-xl border border-border bg-white">
            <h2>Course Curriculum</h2>

            <div className="space-y-4">
              {selectedCourse.course_curriculam.map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-border bg-primary-white"
                  >
                    <div className="flex items-center justify-between">
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

                      <h6 className="text-light-gray">
                        {selectedCourse.details?.duration_hours}h
                      </h6>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full space-y-4 p-6 rounded-xl border border-border bg-white sticky top-0">
          <h2>Ready to Start?</h2>
          <Link to={`/user/course/course-player/${selectedCourse._id}`}>
          <PrimaryButton
            type="Primary"
            title="Start Learning"
            leftIcon={<FaRegCirclePlay />}
            className="bg-light-blue text-white text-base rounded-md w-full"
          />
          </Link>
          <hr className="border border-border" />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="size-9 bg-light-blue/10 rounded-xl flex text-light-blue items-center justify-center">
                <GoBook size={20} />
              </span>
              <div>
                <h3>{totalLessons} Lessons</h3>
                <p>Access anytime</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="size-9 bg-light-blue/10 rounded-xl flex text-light-blue items-center justify-center">
                <PiCertificateLight size={20} />
              </span>
              <div>
                <h3>{selectedCourse.details.duration_hours} hours</h3>
                <p>Self-paced learning</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="size-9 bg-light-blue/10 rounded-xl flex text-light-blue items-center justify-center">
                <GoStopwatch size={20} />
              </span>
              <div>
                <h3>Certificate</h3>
                <p>Upon Completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
