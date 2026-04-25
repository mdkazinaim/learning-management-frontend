/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "@/common/PrimaryButton";
import course from "@/utils/Json/CourseData.json";
import { toast } from "sonner";
const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
  cardNumber: z
    .string()
    .min(13, "Card number must be at least 13 digits")
    .max(19, "Card number must be at most 19 digits")
    .regex(/^\d+$/, "Card number must contain only digits"),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Invalid expiry date format (MM/YY)"
    ),
  cvv: z
    .string()
    .min(3, "CVV must be 3 or 4 digits")
    .max(4, "CVV must be 3 or 4 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),
});

const CourseCheckout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });
  const { id } = useParams();
  const selectedCourse = course?.find((course) => course._id === id);
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      // Simulate API call - in production, replace with actual API request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In a real app, you would make an API request here
      // Example: await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })

      toast.success("Payment processed successfully!");
      navigate(`/user/course/success/${selectedCourse?._id}`);
      reset();
    } catch {
      toast.error("Payment processing failed. Please try again.");
    }
  };

  return (
    <div className="flex items-baseline gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-border min-w-2/3">
        {/* Billing Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary-text mb-4">
            Billing Information
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName")}
                className={`w-full p-2 border ${
                  errors.fullName ? "border-red-500" : "border-border"
                } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-border"
                } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Street Address
              </label>
              <input
                type="text"
                {...register("streetAddress")}
                className={`w-full p-2 border ${
                  errors.streetAddress ? "border-red-500" : "border-border"
                } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.streetAddress && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                City
              </label>
              <input
                type="text"
                {...register("city")}
                className={`w-full p-2 border ${
                  errors.city ? "border-red-500" : "border-border"
                } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
              />
              {errors.city && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* State and ZIP Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  State
                </label>
                <input
                  type="text"
                  {...register("state")}
                  className={`w-full p-2 border ${
                    errors.state ? "border-red-500" : "border-border"
                  } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                />
                {errors.state && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  {...register("zipCode")}
                  className={`w-full p-2 border ${
                    errors.zipCode ? "border-red-500" : "border-border"
                  } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                />
                {errors.zipCode && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div>
          <h2 className="text-xl font-bold text-primary-text mb-4">
            Payment Details
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Card Number
              </label>
              <div className="relative">
                <CreditCard
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text"
                  size={18}
                />
                <input
                  type="text"
                  {...register("cardNumber")}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full pl-10 p-2 border ${
                    errors.cardNumber ? "border-red-500" : "border-border"
                  } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                />
              </div>
              {errors.cardNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>

            {/* Expiry Date and CVV */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  {...register("expiryDate")}
                  placeholder="MM/YY"
                  className={`w-full p-2 border ${
                    errors.expiryDate ? "border-red-500" : "border-border"
                  } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                />
                {errors.expiryDate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  {...register("cvv")}
                  placeholder="123"
                  className={`w-full p-2 border ${
                    errors.cvv ? "border-red-500" : "border-border"
                  } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                />
                {errors.cvv && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.cvv.message}
                  </p>
                )}
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 mt-4 p-3 bg-gray rounded-lg">
              <Lock size={16} className="text-secondary-text" />
              <div>
                <p className="text-xs text-secondary-text font-medium">
                  Secure SSL Encrypted Payment
                </p>
                <p className="text-xs text-secondary-text">
                  Your payment information is safe and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Price Card Section */}
      <div className=" space-y-4 p-6 rounded-xl border border-border bg-white w-full h-fit sticky top-0">
        <div className="space-y-1">
          <h2>${selectedCourse?.title}</h2>
          <span className="bg-light-gray/60 text-primary-blue rounded-lg text-xs! px-2! py-1!">
            {selectedCourse?.course_tag}
          </span>
        </div>
        <hr className="border border-border" />
        <span className="flex items-center justify-between">
          <h6 className="">Course Price :</h6>
          <h6 className="">${selectedCourse?.price.toFixed(2)}</h6>
        </span>
        <span className="flex items-center justify-between">
          <h6 className="">Tax (10%) :</h6>
          <h6 className="">
            ${((selectedCourse?.price as number) * 0.1).toFixed(2)}
          </h6>
        </span>
        <hr className="border border-border" />
        <span className="flex items-center justify-between">
          <h6 className="">Total :</h6>
          <h3 className="text-light-blue ">
            ${(selectedCourse!.price + selectedCourse!.price * 0.1).toFixed(2)}
          </h3>
        </span>

          <PrimaryButton
            type="Primary"
            title="Complete Purchase"
            className="bg-light-blue text-white text-lg w-full"
            onClick={handleSubmit(onSubmit)}
          />
     
        <p className="text-center mt-6">By completing this purchase, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};

export default CourseCheckout;
