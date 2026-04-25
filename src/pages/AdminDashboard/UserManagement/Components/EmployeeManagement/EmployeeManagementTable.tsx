import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { mockUsers } from "../MokUserData";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import InviteEmployeeModal from "./InviteEmployeeModal";

// Define TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  enrolledCourses: number;
  progress: number;
  profile?: UserProfile;
}

interface UserProfile {
  fullName: string;
  email: string;
  registrationDate: string;
  status: "Active" | "Inactive";
  courses: {
    title: string;
    completion: number;
  }[];
}

// Form validation schema
const userSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  registrationDate: z.string().min(1, "Registration date is required"),
  status: z.enum(["Active", "Inactive"]),
  enrolledCourses: z.number().min(0, "Must be a positive number"),
  progress: z.number().min(0).max(100, "Progress must be between 0 and 100"),
});

type UserFormData = z.infer<typeof userSchema>;

// Mock data

const EmployeeManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const usersPerPage = 10;
  const [employeeModal,setEmployeeModal] = useState(false)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const openUserProfile = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  const handleDelete = async (userId: number, userName: string) => {
    Swal.fire({
      title: "Are you sure you want to delete " + userName + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting user...");
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          setUsers((prev) => prev.filter((user) => user.id !== userId));

          // Auto close modal if the deleted user is the one being viewed
          if (selectedUser?.id === userId) {
            closeModal();
          }

          toast.success("User deleted successfully!", { id: toastId });
          Swal.fire("Deleted!", "The user has been deleted.", "success");
        } catch {
          toast.error("Failed to delete user", { id: toastId });
          Swal.fire("Error!", "Failed to delete user. Please try again.", "error");
        }
      }
    });
  };
  const navigate= useNavigate()
  return (
    <div className="grid gap-6">
      <div className="place-self-end flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <button onClick={() => navigate("/admin/user-management")} className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-blue/90 transition-colors">
          My Users
        </button>
        <button onClick={() => setEmployeeModal(true)} className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-blue/90 transition-colors">
          Invite New Employee
        </button>
      </div>

      <div className="p-4 sm:p-6 bg-white rounded-xl border border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

          <div className="flex flex-col sm:flex-row gap-3">
            <select className="p-2 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue">
              <option>All Categories</option>
              <option>Management</option>
              <option>Support</option>
              <option>Engineering</option>
            </select>

            <select className="p-2 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border p-2">
        <div
          className="overflow-x-auto rounded-md"
          style={{ height: "calc(45px * 10 + 44px)" }}
        >
          <table className="min-w-full border-collapse">
            <thead className="bg-gray sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-secondary-text border-b border-border">
                  Name
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-secondary-text border-b border-border">
                  Email
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-secondary-text border-b border-border">
                  Status
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-secondary-text border-b border-border">
                  Enrolled Courses
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-secondary-text border-b border-border">
                  Progress
                </th>
                <th className="p-3 text-right text-xs sm:text-sm font-medium text-secondary-text border-b border-border">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray/50 transition-colors"
                >
                  <td className="p-3 text-xs sm:text-sm">{user.name}</td>
                  <td className="p-3 text-xs sm:text-sm">{user.email}</td>
                  <td className="p-3 text-xs sm:text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-primary-green"
                          : "bg-gray text-secondary-text"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs sm:text-sm">
                    {user.enrolledCourses}
                  </td>
                  <td className="p-3 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <div className="w-full bg-gray rounded-full h-1.5 mr-2">
                        <div
                          className="bg-primary-blue h-1.5 rounded-full"
                          style={{ width: `${user.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => openUserProfile(user)}
                        className="text-primary-blue hover:text-primary-blue/80"
                        aria-label="View user profile"
                      >
                      <Edit size={18}/>
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="text-primary-red hover:text-primary-red/80"
                        aria-label="Delete user"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Empty rows to maintain fixed height when less than 20 items */}
              {currentUsers.length < usersPerPage &&
                Array.from({ length: usersPerPage - currentUsers.length }).map(
                  (_, index) => (
                    <tr key={`empty-${index}`}>
                      <td colSpan={6} className="p-3 h-11"></td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-secondary-text">
            Showing {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
            {filteredUsers.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                    onClick={() => setCurrentPage(page)}
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
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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
      </div>


      {
        employeeModal &&
        <InviteEmployeeModal onClose={() => setEmployeeModal(false)} />
      }
      {/* User Profile Modal */}
      {isModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
          onClose={closeModal}
          onUpdateUser={(updatedUser) => {
            setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
            setIsEditing(false);
            toast.success("User updated successfully!");
          }}
        />
      )}
    </div>
  );
};

const UserModal = ({
  user,
  isEditing,
  onEditToggle,
  onClose,
  onUpdateUser
}: {
  user: User;
  isEditing: boolean;
  onEditToggle: () => void;
  onClose: () => void;
  onUpdateUser: (updatedUser: User) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: user.profile?.fullName || user.name,
      email: user.profile?.email || user.email,
      registrationDate: user.profile?.registrationDate || "2024-01-15",
      status: user.profile?.status || user.status,
      enrolledCourses: user.enrolledCourses,
      progress: user.progress
    }
  });

  useEffect(() => {
    reset({
      fullName: user.profile?.fullName || user.name,
      email: user.profile?.email || user.email,
      registrationDate: user.profile?.registrationDate || "2024-01-15",
      status: user.profile?.status || user.status,
      enrolledCourses: user.enrolledCourses,
      progress: user.progress
    });
  }, [user, reset]);

  const onSubmit = (data: UserFormData) => {
    const updatedUser: User = {
      ...user,
      name: data.fullName,
      email: data.email,
      status: data.status,
      enrolledCourses: data.enrolledCourses,
      progress: data.progress,
      profile: {
        ...user.profile,
        fullName: data.fullName,
        email: data.email,
        registrationDate: data.registrationDate,
        status: data.status,
        courses: user.profile?.courses || []
      }
    };
    onUpdateUser(updatedUser);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 id="modal-title" className="text-lg font-bold">
              {isEditing ? "Edit User" : "User Profile"}
            </h3>
            {!isEditing && (
              <button
                onClick={onEditToggle}
                className="px-3 py-1 bg-primary-blue text-white rounded-lg text-sm hover:bg-primary-blue/90 transition-colors"
              >
                Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs text-secondary-text mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    {...register("fullName")}
                    className={`w-full p-2 border ${
                      errors.fullName ? "border-red-500" : "border-border"
                    } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                  />
                ) : (
                  <input
                    value={user.profile?.fullName || user.name}
                    readOnly
                    className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
                  />
                )}
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-secondary-text mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full p-2 border ${
                      errors.email ? "border-red-500" : "border-border"
                    } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                  />
                ) : (
                  <input
                    value={user.profile?.email || user.email}
                    readOnly
                    className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
                  />
                )}
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-secondary-text mb-1">
                  Registration Date
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    {...register("registrationDate")}
                    className={`w-full p-2 border ${
                      errors.registrationDate ? "border-red-500" : "border-border"
                    } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                  />
                ) : (
                  <input
                    value={user.profile?.registrationDate || "2024-01-15"}
                    readOnly
                    className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
                  />
                )}
                {errors.registrationDate && (
                  <p className="text-xs text-red-500 mt-1">{errors.registrationDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-secondary-text mb-1">
                  Status
                </label>
                {isEditing ? (
                  <select
                    {...register("status")}
                    className="w-full p-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  <input
                    value={user.profile?.status || user.status}
                    readOnly
                    className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-secondary-text mb-1">
                  Enrolled Courses
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    {...register("enrolledCourses", { valueAsNumber: true })}
                    className={`w-full p-2 border ${
                      errors.enrolledCourses ? "border-red-500" : "border-border"
                    } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                    min="0"
                  />
                ) : (
                  <input
                    value={user.enrolledCourses}
                    readOnly
                    className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
                  />
                )}
                {errors.enrolledCourses && (
                  <p className="text-xs text-red-500 mt-1">{errors.enrolledCourses.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-secondary-text mb-1">
                  Progress (%)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    {...register("progress", { valueAsNumber: true })}
                    className={`w-full p-2 border ${
                      errors.progress ? "border-red-500" : "border-border"
                    } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                    min="0"
                    max="100"
                  />
                ) : (
                  <input
                    value={user.progress}
                    readOnly
                    className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
                  />
                )}
                {errors.progress && (
                  <p className="text-xs text-red-500 mt-1">{errors.progress.message}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold mb-3">Enrolled Courses</h4>
              {user.profile?.courses && user.profile.courses.length > 0 ? (
                user.profile.courses.map((course, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-green-50 rounded-lg mb-2"
                  >
                    <span className="text-sm">{course.title}</span>
                    <span className="text-sm font-medium text-primary-green">
                      {course.completion}% Complete
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-secondary-text text-sm">
                  No enrolled courses
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-border">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      onEditToggle();
                      reset();
                    }}
                    type="button"
                    className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm hover:bg-primary-blue/90 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagementTable;
