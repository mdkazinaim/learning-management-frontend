/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/common/Header";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { useGetAllCourseQuery } from "@/store/Api/Course.api";

const CourseCatalog = () => {
  const { data, isLoading } = useGetAllCourseQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  useEffect(() => {
    if (data?.data) setCourses(data.data);
  }, [data]);

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      course.courseTag === selectedCategory;

    const matchesLevel =
      selectedLevel === "All Levels" ||
      course.courseLevel === selectedLevel ||
      course.course_lvl === selectedLevel; // fallback

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header
          title="Course Catalog"
          description="Browse and enroll in courses to enhance your skills"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: coursesPerPage }).map((_, idx) => (
            <div
              key={idx}
              className="h-60 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title="Course Catalog"
        description="Browse and enroll in courses to enhance your skills"
      />
      <div>
        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text"
                size={18}
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                <option>All Categories</option>
                {[...new Set(courses.map((c) => c.courseTag))].map((tag) => (
                  <option key={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="md:w-48">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                <option>All Levels</option>
                {[...new Set(courses.map((c) => c.courseLevel || c.course_lvl))]
                  .filter(Boolean)
                  .map((lvl) => (
                    <option key={lvl}>{lvl}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {currentCourses.length === 0 ? (
          <p className="text-center text-secondary-text">No courses found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === 1
                  ? "bg-gray-100 text-secondary-text cursor-not-allowed"
                  : "bg-white text-primary-text hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === index + 1
                    ? "bg-primary-blue text-white"
                    : "bg-white text-primary-text hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === totalPages
                  ? "bg-gray-100 text-secondary-text cursor-not-allowed"
                  : "bg-white text-primary-text hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
