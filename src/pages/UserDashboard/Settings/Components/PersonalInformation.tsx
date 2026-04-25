/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import PrimaryButton from "@/common/PrimaryButton";
import { useGetMeQuery, useUpdateUserMutation } from "@/store/Api/User.api";

const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100, "Full name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  profilePhoto: z.any().optional()
});

const PersonalInformation = () => {
  // Fetch current user data
  const { data: userDataResponse, isLoading: isLoadingUser, refetch } = useGetMeQuery(null);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    role: "",
    profilePhoto: null
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      email: ""
    }
  });

  // Update local state when user data is fetched
  useEffect(() => {
    if (userDataResponse?.data) {
      const user = userDataResponse.data;
      const newUserData = {
        fullName: user.fullName || "",
        email: user.email || "",
        role: user.role || "",
        profilePhoto: user.profilePhoto || null
      };
      setUserData(newUserData);
      reset({
        fullName: newUserData.fullName,
        email: newUserData.email
      });

      // Set preview URL if profile photo exists
      if (user.profilePhoto) {
        setPreviewUrl(user.profilePhoto);
      }
    }
  }, [userDataResponse, reset]);

  const handleProfilePhotoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image/jpeg') && !file.type.match('image/png') && !file.type.match('image/gif')) {
        toast.error("Please select a valid image file (JPEG, PNG, or GIF)");
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target!.result as string);
      };
      reader.readAsDataURL(file);

      // Update form data with file object
      setValue('profilePhoto', file);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      // Create FormData object to send with file
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);

      if (data.profilePhoto && data.profilePhoto instanceof File) {
        formData.append('profilePhoto', data.profilePhoto);
      }

      // Get user ID from the fetched data
      const userId = userDataResponse?.data?._id;

      if (!userId) {
        toast.error("User ID not found. Please refresh and try again.");
        return;
      }

      // Call the update API
      await updateUser({
        userId,
        payload: formData
      }).unwrap();

      // Refetch user data to get updated information
      await refetch();

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    reset({
      fullName: userData.fullName,
      email: userData.email
    });
    setIsEditing(false);
    setPreviewUrl(userData.profilePhoto || "");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0) + names[names.length - 1].charAt(0);
    }
    return name.charAt(0) + (name.charAt(1) || '');
  };

  // Show loading state
  if (isLoadingUser) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-secondary-purple rounded-lg flex items-center justify-center">
          <User size={20} className="text-primary-blue" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary-text">Personal Information</h2>
          <p className="text-sm text-secondary-text">Update your personal details</p>
        </div>
      </div>
      <div className="pt-4 border-t border-border">
        {/* Profile Photo Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold text-xl overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <span className="uppercase">
                  {getInitials(userData.fullName)}
                </span>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-blue/90">
                <Camera size={16} className="text-white" />
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleProfilePhotoChange}
                  className="sr-only"
                />
              </label>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-primary-text">Profile Photo</p>
            <p className="text-xs text-secondary-text mt-1">JPG, PNG or GIF. Max size 2MB</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              disabled={!isEditing}
              className={`w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-border'} rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue ${!isEditing ? 'cursor-not-allowed opacity-70' : ''
                }`}
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Email Address</label>
            <input
              type="email"
              {...register("email")}
              disabled={!isEditing}
              className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-border'} rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue ${!isEditing ? 'cursor-not-allowed opacity-70' : ''
                }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Role (Read Only) */}
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Role</label>
            <input
              type="text"
              value={userData.role}
              disabled
              className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed opacity-70"
            />
          </div>

          {/* Account Status (Read Only) */}
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">Account Status</label>
            <div className="w-full p-2 border border-border rounded-lg bg-gray flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${userDataResponse?.data?.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                }`}>
                {userDataResponse?.data?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 p-4 bg-gray/50 rounded-lg">
          <h3 className="text-sm font-semibold text-primary-text mb-3">Account Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-secondary-text">Total Points</p>
              <p className="text-lg font-bold text-primary-blue">{userDataResponse?.data?.totalPoints || 0}</p>
            </div>
            <div>
              <p className="text-xs text-secondary-text">Earned Badges</p>
              <p className="text-lg font-bold text-primary-blue">{userDataResponse?.data?.earnedBadges?.length || 0}</p>
            </div>
            <div>
              <p className="text-xs text-secondary-text">Enrolled Courses</p>
              <p className="text-lg font-bold text-primary-blue">{userDataResponse?.data?.enrollCourse?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Save/Cancel Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isUpdating}
                className="px-4 py-2 border border-border rounded-lg text-sm text-primary-text hover:bg-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={isUpdating}
                className={`px-4 py-2 bg-primary-blue text-white rounded-lg text-sm hover:bg-primary-blue/90 transition-colors ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <PrimaryButton
              type="Primary"
              title="Edit Profile"
              className=""
              onClick={() => {
                setIsEditing(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;