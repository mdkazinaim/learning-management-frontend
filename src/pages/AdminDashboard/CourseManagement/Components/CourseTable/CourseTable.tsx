import { Trash, Pencil } from "lucide-react";
import { useCourseTable } from "./useCourseTable";
import { useNavigate } from "react-router-dom";
import { EditCourseModal } from "./EditcourseModal";

import CourseTableSkeleton from "./CourseTableSkeleton";
import DeleteCourseModal from "./DeleteCourseModal";

export type FormattedCourse = {
  _id: string;
  title: string;
  instructorName: string;
  category: string;
  courseStatus: "Published" | "Draft";
  enrollments: number;
};

const CourseTable = () => {
  const {
    isLoading,
    currentCourses,
    searchTerm,
    statusFilter,
    filteredCourses,
    currentPage,
    totalPages,
    editingCourse,
    deletingCourse,
    isEditModalOpen,
    isDeleteModalOpen,
    indexOfLastCourse,
    indexOfFirstCourse,
    coursesPerPage,
    handleSearch,
    handleStatusFilter,
    paginate,
    openEditModal,
    openDeleteModal,
    closeModal,
  } = useCourseTable();

  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <CourseTableSkeleton rows={coursesPerPage} />
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
          <div className="space-y-6">
            <div className="bg-white border border-border rounded-xl p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full p-2 pl-10 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      handleStatusFilter(
                        e.target.value as "All Status" | "Published" | "Draft"
                      )
                    }
                    className="p-2 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                  </select>

                  <button
                    onClick={() =>
                      navigate("/admin/course-management/add-new-course")
                    }
                    className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/90 transition-colors"
                  >
                    Add New
                  </button>
                </div>
              </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-border rounded-lg overflow-hidden">
                  <thead className="bg-gray">
                    <tr>
                      <th className="p-3 text-left text-sm font-medium text-secondary-text">
                        Course Title
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-secondary-text">
                        Instructor
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-secondary-text">
                        Category
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-secondary-text">
                        Status
                      </th>
                      {/* <th className="p-3 text-left text-sm font-medium text-secondary-text">
                        Enrollments
                      </th> */}
                      <th className="p-3 text-right text-sm font-medium text-secondary-text">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {currentCourses.map((course) => (
                      <tr
                        key={course._id}
                        className="hover:bg-gray/50 transition-colors"
                      >
                        <td className="p-3 text-sm">{course.title}</td>
                        <td className="p-3 text-sm">{course.instructorName}</td>
                        <td className="p-3 text-sm">{course.category}</td>
                        <td className="p-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.courseStatus === "Published"
                                ? "bg-green-100 text-primary-green"
                                : "bg-yellow-100 text-primary-yellow"
                            }`}
                          >
                            {course.courseStatus}
                          </span>
                        </td>
                        {/* <td className="p-3 text-sm">{course?.enrollments}</td> */}
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditModal(course)}
                              className="text-primary-blue hover:text-primary-blue/80"
                              aria-label="Edit course"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(course)}
                              className="text-primary-red hover:text-primary-red/80"
                              aria-label="Delete course"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {/* Empty rows to maintain table height */}
                    {currentCourses.length < coursesPerPage &&
                      Array.from({
                        length: coursesPerPage - currentCourses.length,
                      }).map((_, index) => (
                        <tr key={`empty-${index}`}>
                          <td colSpan={6} className="p-3 h-11"></td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-secondary-text">
                  Showing {indexOfFirstCourse + 1} to{" "}
                  {Math.min(indexOfLastCourse, filteredCourses.length)} of{" "}
                  {filteredCourses.length} results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-primary-blue hover:bg-gray"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="flex gap-1 items-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => paginate(page)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center ${
                            currentPage === page
                              ? "bg-primary-blue text-white"
                              : "text-primary-text hover:bg-gray"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      paginate(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-primary-blue hover:bg-gray"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modals */}
              {isEditModalOpen && editingCourse && (
                <EditCourseModal
                  course={editingCourse}
                  onClose={closeModal}
                  // onSubmit={handleEdit}
                />
              )}
              {isDeleteModalOpen && deletingCourse && (
                <DeleteCourseModal
                  course={deletingCourse}
                  onClose={closeModal}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseTable;
