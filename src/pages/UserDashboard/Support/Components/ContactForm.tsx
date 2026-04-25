/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import PrimaryButton from "@/common/PrimaryButton";
import { useCreateSupportMutation } from "@/store/Api/Support.api";

const contactSchema = z.object({
  message: z.string().min(1, "Message is required").max(1000, "Message must be less than 1000 characters")
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      message: ""
    }
  });

  // Redux mutation hook
  const [createSupport, { isLoading }] = useCreateSupportMutation();

  const onSubmit = async (data: any) => {
    try {
      // API call করুন message টি পাঠানোর জন্য
      await createSupport({ problemDescription: data.message }).unwrap();

      toast.success("Your message has been sent successfully!");
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send your message. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-bold text-primary-text mb-4">Send us a message</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">Message</label>
          <textarea
            {...register("message")}
            placeholder="Describe your issue or question..."
            rows={5}
            disabled={isLoading}
            className={`w-full p-2 border ${errors.message ? 'border-red-500' : 'border-border'} rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue disabled:opacity-50`}
          />
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <PrimaryButton
            title={isLoading ? "Sending..." : "Send Message"}
            type="Primary"
            onClick={handleSubmit(onSubmit)}
            className="text-base"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;