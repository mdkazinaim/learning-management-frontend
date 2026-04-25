import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/store/Api/Auth.api";
// Define form validation schema
const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    console.log(data);
    const toastId = toast.loading("Creating your account...");
    console.log(data, "Signup Data");
    try {
      const { confirmPassword, ...payload } = data;
      console.log(confirmPassword);
      const response = await signup(payload).unwrap();
      console.log(response);
      if (!response.success) throw new Error("Failed to create account");
      toast.success("Account created successfully!", { id: toastId });
      navigate("/login", {
        state: { email: payload.email, password: payload.password },
      });
      reset();
    } catch {
      toast.error("Failed to create account. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" h-screen  w-1/2 mx-auto flex items-center justify-center">
      <div className="flex flex-row-reverse items-center justify-center bg-white rounded-xl p-6 shadow-sm border border-border gap-4">
        <div className="flex-1">
          <img
            src="signup.jpg"
            alt=""
            className="w-full h-full rounded-xl object-cover"
          />
        </div>

        <div className="bg-white rounded-xl p-6 w-full flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary-text">SIGN UP!</h2>
            <p className="text-sm text-secondary-text">
              Already have an account?{" "}
              <a
                href="/"
                className="text-primary-blue cursor-pointer hover:underline"
              >
                Log In
              </a>
            </p>
          </div>

          <p className="text-sm text-secondary-text mb-6">
            Lorem ipsum dolor sit amet consectetur. Aliquet ac arcu nullam nunc
            aliquet.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                {...register("fullName")}
                className={`w-full p-2 border ${
                  errors.fullName ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                {...register("email")}
                className={`w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="tel"
                {...register("phoneNumber")}
                className={`w-full p-2 border ${
                  errors.phoneNumber ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                {...register("password")}
                className={`w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`w-full p-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-primary-blue/90 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
