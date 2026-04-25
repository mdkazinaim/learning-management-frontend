import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Edit, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useDeleteUserMutation, useGetAllUserQuery } from "@/store/Api/User.api";
import UserModal, { User } from "./userModal";

const UserManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // RTK Query hook with query parameters
  const { data, error, isLoading } = useGetAllUserQuery({
    page: currentPage,
    limit: usersPerPage,
    searchTerm: searchTerm,
  });

  const [deleteUser] = useDeleteUserMutation();

  // Transform API data to match table fields
  const users: User[] = data?.data?.map((user: any) => ({
    _id: user._id,
    fullName: user.fullName,
    name: user.fullName,
    email: user.email,
    status: user.isActive ? "Active" : "Inactive",
    enrolledCourses: user.enrollCourse?.length || 0,
    progress: 0, // You can calculate this based on your logic
    profile: {
      fullName: user.fullName,
      email: user.email,
      status: user.isActive ? "Active" : "Inactive",
      registrationDate: user.createdAt,
      courses: user.enrollCourse?.map((_course: any, idx: number) => ({
        title: `Course ${idx + 1}`,
        completion: 0,
      })),
    },
  })) || [];

  // Get pagination metadata from API response
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };
  const totalPages = meta.totalPage;

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

  const handleDelete = async (userId: string, userName: string) => {
    Swal.fire({
      title: `Are you sure you want to delete ${userName}?`,
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
          await deleteUser(userId).unwrap();
          toast.success("User deleted successfully!", { id: toastId });
          Swal.fire("Deleted!", "The user has been deleted.", "success");
        } catch (error: any) {
          toast.error(error?.data?.message || "Failed to delete user", { id: toastId });
          Swal.fire(
            "Error!",
            error?.data?.message || "Failed to delete user. Please try again.",
            "error"
          );
        }
      }
    });
  };

  // Handle search with debounce effect (optional but recommended)
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  };

  if (isLoading) return <div className="p-6 text-center">Loading users...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error loading users</div>;

  return (
    <div className="">
      <div className="space-y-6">
        {/* Search & Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full rounded-2xl">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Enrolled Courses</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 rounded-2xl">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{user.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.enrolledCourses}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => openUserProfile(user)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Edit user"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id as string, user.fullName as string)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete user"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          {totalPages > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {(meta.page - 1) * meta.limit + 1} to{" "}
                {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors ${currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${currentPage === pageNum
                          ? "bg-blue-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-colors ${currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Modal */}
      {isModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default UserManagementTable;