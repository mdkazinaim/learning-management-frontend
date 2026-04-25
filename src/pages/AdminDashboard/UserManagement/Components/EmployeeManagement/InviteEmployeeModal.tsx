import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { X } from "lucide-react";


// Form validation schema
const employeeSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  registrationDate: z.string().min(1, "Registration date is required"),
  status: z.enum(["Active", "Inactive"]),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const InviteEmployeeModal = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      registrationDate: new Date().toISOString().split('T')[0],
      status: "Active"
    }
  });

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Sending invitation...");
    
    try {
      console.log(data)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In production:
      // const response = await sendEmployeeInvitation(data);
      // if (!response.success) throw new Error("Failed to send invitation");
      
      toast.success("Invitation sent successfully!", { id: toastId });
      reset();
      onClose();
    } catch {
      toast.error("Failed to send invitation. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 id="modal-title" className="text-xl font-bold text-primary-text">Invite New Employee</h3>
            <button
              onClick={onClose}
              className="text-secondary-text hover:text-primary-text"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                {...register("fullName")}
                className={`w-full p-2 border ${
                  errors.fullName ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>
            
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                {...register("email")}
                className={`w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            
            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="tel"
                {...register("phoneNumber")}
                className={`w-full p-2 border ${
                  errors.phoneNumber ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>
            
            {/* Registration Date */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Registration Date</label>
              <input
                type="date"
                {...register("registrationDate")}
                className={`w-full p-2 border ${
                  errors.registrationDate ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.registrationDate && (
                <p className="text-xs text-red-500 mt-1">{errors.registrationDate.message}</p>
              )}
            </div>
            
            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Status</label>
              <select
                {...register("status")}
                className="w-full p-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-xs text-red-500 mt-1">{errors.status.message}</p>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm hover:bg-primary-blue/90 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Invitation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteEmployeeModal;
