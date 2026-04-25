import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/store/Api/Auth.api";
import { useAppDispatch } from "@/hooks/useRedux";
import { setUser, User } from "@/store/Slices/AuthSlice/authSlice";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // <-- Show/hide password
  const navigate = useNavigate();
  const { state } = useLocation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: state?.email || "admin@gmail.com",
      password: state?.password || "123456",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Logging in...");
    try {
      const response = await login(data).unwrap();
      if (response.success) {
        toast.success("Logged in successfully!", { id: toastId });
        dispatch(setUser(response.data?.tokens));
        const { role } = jwtDecode(
          response.data?.tokens?.accessToken as string
        ) as User;
        if (role === "USER") navigate("/user");
        else if (role === "ADMIN") navigate("/admin");
        else navigate("/unauthorized");
        reset();
      }
    } catch {
      toast.error("Failed to login. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white rounded-xl shadow-md overflow-hidden">
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="/login.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-primary-text mb-2">
              LOG IN
            </h2>
            <p className="text-sm text-secondary-text">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary-blue hover:underline">
                Sign Up
              </a>
            </p>
          </div>

          <p className="text-sm text-secondary-text mb-6 text-center lg:text-left">
            Welcome back! Enter your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
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

            {/* Password */}
            <div className="relative">
              <label className="block text-sm mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-border"
                } rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 bottom-2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-primary-blue/90 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
