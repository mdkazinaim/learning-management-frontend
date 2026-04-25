/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
// import { toast } from "sonner";
import { Course } from "./EditcourseModal";
import { useGetAllCourseQuery } from "@/store/Api/Course.api";

export const useCourseTable = (coursesPerPage = 10) => {
  const { data, isLoading } = useGetAllCourseQuery({});
  const coursesFromApi: Course[] =
    data?.data?.map((course: any) => ({
      ...course,
      enrollments: course.modules?.length || 0,
    })) || [];
  const [courses, setCourses] = useState<Course[]>(coursesFromApi);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All Status" | "Published" | "Draft"
  >("All Status");

  useEffect(() => {
    if (data?.data) {
      setCourses(data?.data);
    }
  }, [data]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" || course.courseStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [courses, searchTerm, statusFilter]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: "All Status" | "Published" | "Draft") => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const paginate = (page: number) => setCurrentPage(page);

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (course: Course) => {
    setDeletingCourse(course);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingCourse(null);
    setDeletingCourse(null);
  };

  // const handleEdit = (data: CourseFormData) => {
  //   if (!editingCourse) return;
  //   console.log(data);
  //   toast.success("Course updated successfully");
  //   closeModal();
  // };

  // const handleDelete = () => {
  //   if (!deletingCourse) return;

  //   setCourses((prev) => prev.filter((c) => c._id !== deletingCourse._id));

  //   toast.success("Course deleted successfully");
  //   closeModal();
  // };

  return {
    isLoading,
    currentCourses,
    filteredCourses,
    searchTerm,
    statusFilter,
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
    // handleEdit,
    // handleDelete,
  };
};
