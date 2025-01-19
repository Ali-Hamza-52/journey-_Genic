"use client";
import React, { useState } from "react";
import SectionWrapper from "../common/SectionWrapper";
import {
  CircleUser,
  House,
  ImageMinus,
  KeyRound,
  Mail,
  Phone,
  ScanFace,
  UserPen,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import signUpSchema from "@/helpers/schemas/signup";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner"
import axiosInstance from "@/lib/axiosInstance";
const Signup = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      isTermsAndConditions: false,
      role: "client",
      profileImage: undefined,
    },
  });

  // Handle form submission
  const submitData = async (data) => {
    setIsLoading(true);
    setIsError(false); // Reset error state

    try {
      const response = await axiosInstance.post("/user/signup", data); // API call

      console.log("response --->",response)
      // Display success toast
      if(response.status === 200){

        toast.success("Signup successful!");
        router.push("/login"); // Redirect to login after successful signup
      }
      
      if(response.status === 400){
        toast.warning(response.message);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("An error occurred");
      toast.error(errorMessage); 
    } finally {
      setIsLoading(false); // Set loading state to false after API call
    }
  };

  return (
    <SectionWrapper>
      <div className="max-w-lg bg-gray-800 px-6 sm:px-16 py-8 shadow-2xl rounded-2xl mx-auto flex flex-col justify-center items-center gap-3 overflow-hidden">
        <ScanFace size={48} color="white" />
        {/* Form Inputs */}
        <form onSubmit={handleSubmit(submitData)}>
          {/* Name Field */}
          <div className="flex flex-col gap-2 py-2">
            <Label
              className={`${errors.username ? "text-red-500" : "text-gray-400"}`}
            >
              Your Name
            </Label>
            <div className="relative w-72 sm:min-w-96">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-textPrimary">
                <UserPen size={16} />
              </div>
              <Input
                autoComplete="off"
                type="text"
                placeholder="Please Enter Your Name"
                {...register("username")}
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 ${
                  errors.username ? "ring-1 ring-red-500 focus-visible:ring-red-500" : "focus-visible:ring-surfaceBrand"
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 overflow-hidden">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 py-2">
            <Label
              className={`${errors.email ? "text-red-500" : "text-gray-400"}`}
            >
              Email Address
            </Label>
            <div className="relative w-72 sm:min-w-96">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-textPrimary">
                <Mail size={16} />
              </div>
              <Input
                autoComplete="off"
                type="email"
                placeholder="your_email@example.com"
                {...register("email")}
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 ${
                  errors.email ? "ring-1 ring-red-500 focus-visible:ring-red-500" : "focus-visible:ring-surfaceBrand"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 overflow-hidden">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 py-2">
            <Label
              className={`${errors.password ? "text-red-500" : "text-gray-400"}`}
            >
              Password
            </Label>
            <div className="relative w-72 sm:min-w-96">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-textPrimary">
                <KeyRound size={16} />
              </div>
              <Input
                autoComplete="off"
                type="password"
                placeholder="password"
                {...register("password")}
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 ${
                  errors.password ? "ring-1 ring-red-500 focus-visible:ring-red-500" : "focus-visible:ring-surfaceBrand"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 overflow-hidden">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2 py-2">
            <Label
              className={`${errors.confirmPassword ? "text-red-500" : "text-gray-400"}`}
            >
              Confirm Password
            </Label>
            <div className="relative w-72 sm:min-w-96">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-textPrimary">
                <KeyRound size={16} />
              </div>
              <Input
                autoComplete="off"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 ${
                  errors.confirmPassword ? "ring-1 ring-red-500 focus-visible:ring-red-500" : "focus-visible:ring-surfaceBrand"
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 overflow-hidden">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col gap-2 py-2">
            <Label
              className={`${
                errors.phoneNumber ? "text-red-500" : "text-gray-400"
              }`}
            >
              Phone Number
            </Label>
            <div className="relative w-72 sm:min-w-96 ">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-textPrimary">
                <Phone size={16} />
              </div>
              <Input
                autoComplete="off"
                type="text"
                placeholder="+92 (306) - 3099643"
                {...register("phoneNumber")}
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 ${
                  errors.phoneNumber
                    ? "ring-1 ring-red-500 focus-visible:ring-red-500"
                    : "focus-visible:ring-surfaceBrand"
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 overflow-hidden">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="flex flex-col gap-2 py-2">
            <Label
              className={`${
                errors.address ? "text-red-500" : "text-gray-400"
              }`}
            >
              Address
            </Label>
            <div className="relative w-72 sm:min-w-96 ">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-textPrimary">
                <House size={16} />
              </div>
              <Input
                autoComplete="off"
                type="text"
                placeholder="Enter your address"
                {...register("address")}
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 ${
                  errors.address
                    ? "ring-1 ring-red-500 focus-visible:ring-red-500"
                    : "focus-visible:ring-surfaceBrand"
                }`}
              />
            </div>
            {errors.address && (
              <p className="text-red-500 overflow-hidden">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center gap-2 py-2">
            <Input
              autoComplete="off"
              type="checkbox"
              {...register("isTermsAndConditions")}
              id="terms"
              className={`h-4 w-4 text-surfaceBrand border-neutral700 rounded ${
                errors.isTermsAndConditions ? "border-red-500" : ""
              }`}
            />
            <Label
              htmlFor="terms"
              className={`${errors.isTermsAndConditions ? "text-red-500" : "text-gray-400"}`}
            >
              I agree to terms and conditions
            </Label>
          </div>
          {errors.isTermsAndConditions && (
            <p className="text-red-500 overflow-hidden">{errors.isTermsAndConditions.message}</p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className="mt-4 w-full rounded-full bg-surfaceBrand text-white py-2 font-semibold flex items-center"
          >
            {isLoading ? <Spinner /> : "Sign Up"} {/* Show Spinner when loading */}
          </Button>
        </form>

        {/* Social Media Login */}
        <div className="flex justify-center gap-4 mt-4">
          {/* Add social login buttons */}
        </div>

        <p className="text-white text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-700 hover:text-blue-600 hover:border-b-2 border-blue-600 hover:pb-1"
          >
            Login
          </Link>
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Signup;
