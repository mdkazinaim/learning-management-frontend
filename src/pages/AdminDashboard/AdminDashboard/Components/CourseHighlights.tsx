import { useState } from "react";

// Define TypeScript interfaces
interface Course {
  id: number;
  title: string;
  dropOffRate: number;
  status: string;
}

// // Component Props Interface
// interface HighDropOffCoursesProps {
//   initialCourses?: Course[];
// }

const CourseHighlights = () => {
  const [courses] = useState<Course[]>([
    { id: 1, title: "Advanced Data Analytics", dropOffRate: 45, status: "high" },
    { id: 2, title: "Project Management Basics", dropOffRate: 38, status: "high" },
    { id: 3, title: "Technical Writing Skills", dropOffRate: 32, status: "high" }
  ]);

  const handleReview = (courseId: number) => {
    console.log(`Reviewing course ID: ${courseId}`);
    // In production: navigate to course review page or dispatch review action
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <h2 className="mb-4">Courses with High Drop-off Rates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="bg-red-50 border border-red-200 rounded-xl p-4 hover:shadow-md transition-all"
          >
            <h6 className="mb-4 text-primary-blue">{course.title}</h6>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-primary-red font-medium">{course.dropOffRate}%</span>
                <span className="text-primary-red">drop-off</span>
              </div>
              <button 
                onClick={() => handleReview(course.id)}
                className="text-primary-blue underline hover:underline text-base font-medium"
                aria-label={`Review course ${course.title}`}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseHighlights;
