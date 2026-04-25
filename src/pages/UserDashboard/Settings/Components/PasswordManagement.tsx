/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner"; // Update path as per your project
import { useChangePasswordMutation } from "@/store/Api/User.api";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your new password")
})
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

const PasswordManagement = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redux API mutation hook
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: any) => {
    try {
      // Prepare data according to API format
      const payload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      };

      // Call the API
      const response = await changePassword(payload).unwrap();

      // Reset form on success
      reset();

      toast.success(response?.message || "Password updated successfully!");
    } catch (error: any) {
      // Handle error
      const errorMessage = error?.data?.message || error?.message || "Failed to update password. Please try again.";
      toast.error(errorMessage);
      console.error("Password change error:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-secondary-purple rounded-lg flex items-center justify-center">
          <Lock size={20} className="text-primary-blue" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary-text">Password Management</h2>
          <p className="text-sm text-secondary-text">Update your password to keep your account secure</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-4 border-t border-border">
        {/* Current Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-text mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              {...register("currentPassword")}
              className={`w-full p-2 pr-10 border ${errors.currentPassword ? 'border-red-500' : 'border-border'} rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-2.5 text-secondary-text hover:text-primary-text"
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.currentPassword && <p className="text-xs text-red-500 mt-1">{errors.currentPassword.message}</p>}
        </div>

        {/* New Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                className={`w-full p-2 pr-10 border ${errors.newPassword ? 'border-red-500' : 'border-border'} rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-2.5 text-secondary-text hover:text-primary-text"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`w-full p-2 pr-10 border ${errors.confirmPassword ? 'border-red-500' : 'border-border'} rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-secondary-text hover:text-primary-text"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Update Password Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={`px-6 py-2 bg-primary-blue text-white rounded-lg text-sm hover:bg-primary-blue/90 transition-colors ${(isSubmitting || isLoading) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {(isSubmitting || isLoading) ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordManagement;