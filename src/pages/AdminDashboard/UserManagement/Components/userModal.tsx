import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/store/Api/User.api";

// Form validation schema
const userSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  isActive: z.boolean(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserProfile {
  fullName: string;
  email: string;
  registrationDate?: string;
  status?: "Active" | "Inactive";
  courses?: { title: string; completion: number }[];
}

export interface User {
  id?: number;
  _id?: string;
  name: string;
  fullName?: string;
  email: string;
  phone?: string;
  status: "Active" | "Inactive";
  enrolledCourses: number;
  progress: number;
  profile?: UserProfile;
}

interface UserModalProps {
  user: User;
  isEditing: boolean;
  onEditToggle: () => void;
  onClose: () => void;
}

const UserModal = ({
  user,
  isEditing,
  onEditToggle,
  onClose,
}: UserModalProps) => {
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: user.profile?.fullName || user.fullName || user.name,
      email: user.profile?.email || user.email,
      phone: user.phone || "",
      isActive: user.status === "Active",
    },
  });

  useEffect(() => {
    reset({
      fullName: user.profile?.fullName || user.fullName || user.name,
      email: user.profile?.email || user.email,
      phone: user.phone || "",
      isActive: user.status === "Active",
    });
  }, [user, reset]);

  const onSubmit = async (data: UserFormData) => {
    const toastId = toast.loading("Updating user...");
    try {
      // Prepare payload according to your backend API
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        isActive: data.isActive,
      };

      await updateUser({
        userId: user._id,
        payload: payload,
      }).unwrap();

      toast.success("User updated successfully!", { id: toastId });
      onEditToggle(); // Switch back to view mode
      onClose(); // Close modal after successful update
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update user", { id: toastId });
      console.error("Update error:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {isEditing ? "Edit User" : "User Profile"}
            </h3>
            {!isEditing && (
              <button
                onClick={onEditToggle}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  readOnly={!isEditing}
                  className={`w-full p-2 border ${errors.fullName ? "border-red-500" : "border-gray-300"
                    } rounded-lg ${!isEditing ? "bg-gray-50" : ""}`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Email
                </label>
                <input
                  {...register("email")}
                  readOnly={!isEditing}
                  className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg ${!isEditing ? "bg-gray-50" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  {...register("phone")}
                  readOnly={!isEditing}
                  className={`w-full p-2 border border-gray-300 rounded-lg ${!isEditing ? "bg-gray-50" : ""
                    }`}
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Status
                </label>
                <div className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    {...register("isActive")}
                    disabled={!isEditing}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </div>
              </div>


            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onEditToggle}
                  disabled={isUpdating}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

            {!isEditing && (
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;