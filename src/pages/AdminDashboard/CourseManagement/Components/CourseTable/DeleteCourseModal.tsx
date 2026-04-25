import { useDeleteCourseMutation } from "@/store/Api/Course.api";
import { Course } from "./EditcourseModal";
import { toast } from "sonner";

const DeleteCourseModal = ({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) => {
  const [deleteCourse] = useDeleteCourseMutation();
  console.log(course);
  const handleDelete = async () => {
    console.log(course);
    try {
      const res = await deleteCourse(course._id).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Course deleted successfully");
        onClose();
      }
    } catch {
      toast.error("Failed to delete course");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-3">Delete Course</h2>
        <p className="text-sm text-secondary-text mb-6">
          Are you sure you want to permanently delete <br />
          <span className="font-medium text-primary-text">{course.title}</span>?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-primary-red text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
