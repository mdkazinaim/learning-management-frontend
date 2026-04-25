import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Edit } from "lucide-react";

// Define TypeScript interfaces
interface SiteInfo {
  platformName: string;
  contactEmail: string;
  defaultLanguage: string;
  timezone: string;
}

// Form validation schema
const siteInfoSchema = z.object({
  platformName: z.string().min(1, "Platform name is required"),
  contactEmail: z.string().email("Invalid email address"),
  defaultLanguage: z.string().min(1, "Default language is required"),
  timezone: z.string().min(1, "Timezone is required"),
});

type SiteInfoFormData = z.infer<typeof siteInfoSchema>;

// Mock initial data - in production this would come from API
const initialSiteInfo: SiteInfo = {
  platformName: "Learning Management System",
  contactEmail: "admin@lms.com",
  defaultLanguage: "English",
  timezone: "Eastern Time (ET)",
};

const SiteInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(initialSiteInfo);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SiteInfoFormData>({
    resolver: zodResolver(siteInfoSchema),
    defaultValues: initialSiteInfo
  });

  const handleEditToggle = () => {
    if (isEditing) {
      reset(siteInfo);
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: SiteInfoFormData) => {
    const toastId = toast.loading("Saving site information...");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In production: 
      // const response = await updateSiteInfo(data);
      // if (!response.success) throw new Error("Failed to save");
      
      setSiteInfo(data);
      setIsEditing(false);
      toast.success("Site information saved successfully!", { id: toastId });
    } catch  {
      toast.error("Failed to save site information. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="">Site Information</h2>
        <button 
          onClick={handleEditToggle}
          className="size-12 rounded-xl flex items-center justify-center hover:bg-gray transition-colors"
          aria-label={isEditing ? "Cancel editing" : "Edit site information"}
        >
          <Edit size={24} className="text-primary-text" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform Name */}
          <div>
            <label className="block text-sm mb-2">Platform Name</label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  {...register("platformName")}
                  className={`w-full p-2 border ${
                    errors.platformName ? "border-red-500" : "border-border"
                  } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                />
                {errors.platformName && (
                  <p className="text-xs text-red-500 mt-1">{errors.platformName.message}</p>
                )}
              </>
            ) : (
              <input
                type="text"
                value={siteInfo.platformName}
                readOnly
                className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
              />
            )}
          </div>
          
          {/* Contact Email */}
          <div>
            <label className="block text-sm mb-2">Contact Email</label>
            {isEditing ? (
              <>
                <input
                  type="email"
                  {...register("contactEmail")}
                  className={`w-full p-2 border ${
                    errors.contactEmail ? "border-red-500" : "border-border"
                  } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                />
                {errors.contactEmail && (
                  <p className="text-xs text-red-500 mt-1">{errors.contactEmail.message}</p>
                )}
              </>
            ) : (
              <input
                type="text"
                value={siteInfo.contactEmail}
                readOnly
                className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
              />
            )}
          </div>
          
          {/* Default Language */}
          <div>
            <label className="block text-sm mb-2">Default Language</label>
            {isEditing ? (
              <>
                <select
                  {...register("defaultLanguage")}
                  className="w-full p-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
                {errors.defaultLanguage && (
                  <p className="text-xs text-red-500 mt-1">{errors.defaultLanguage.message}</p>
                )}
              </>
            ) : (
              <input
                type="text"
                value={siteInfo.defaultLanguage}
                readOnly
                className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
              />
            )}
          </div>
          
          {/* Timezone */}
          <div>
            <label className="block text-sm mb-2">Timezone</label>
            {isEditing ? (
              <>
                <select
                  {...register("timezone")}
                  className="w-full p-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                  <option value="Central Time (CT)">Central Time (CT)</option>
                  <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                  <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
                {errors.timezone && (
                  <p className="text-xs text-red-500 mt-1">{errors.timezone.message}</p>
                )}
              </>
            ) : (
              <input
                type="text"
                value={siteInfo.timezone}
                readOnly
                className="w-full p-2 border border-border rounded-lg bg-gray cursor-not-allowed"
              />
            )}
          </div>
        </div>
        
        {/* Save Button - only visible when editing */}
        {isEditing && (
          <div className="flex justify-end mt-6 gap-3">
            <button
              type="button"
              onClick={handleEditToggle}
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
          </div>
        )}
      </form>
    </div>
  );
};

export default SiteInformation;
