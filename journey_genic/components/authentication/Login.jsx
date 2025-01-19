"use client";
import React, { useState } from "react";
import SectionWrapper from "../common/SectionWrapper";
import { KeyRound, Mail, ScanFace } from "lucide-react"; // Add the Loader icon for spinner
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import loginSchema from "@/helpers/schemas/login";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import axiosInstance from "@/lib/axiosInstance";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  // Submit the form data and make the API call
  const submitData = async (data) => {
    console.log("Submitted Data:", data);

    setIsLoading(true); // Set loading to true when the API call starts

    try {
      const response = await axiosInstance.post("/user/login", data); // API call
      console.log("Login successful:", response);

      if(response.status === 200){
        // Display success toast
        toast.success("Login successful!");
        localStorage.setItem('travelingUser', JSON.stringify(response.user));
        localStorage.setItem('travelingUserId', JSON.stringify(response.user.userId));
  
        // Redirect to home page upon successful login
        window.location.href = '/';
      }

      if(response.status === 401){
        // Error logging in with credentials
        toast.warning("Login failed. Please check your credentials.");
      }

      if(response.status === 500){
        // Internal server error
        toast.error("An error occurred while trying to log in. Please try again later.");
      }

    

    } catch (error) {
      console.error("Login failed:", error);
      
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); // Reset loading state when the API call is finished
    }
  };

  return (
    <SectionWrapper>
      <div className="max-w-lg bg-gray-800 px-6 sm:px-16 py-8 shadow-2xl rounded-2xl mx-auto flex flex-col justify-center items-center gap-3 overflow-hidden">
        <ScanFace size={48} color="white" />

        <form onSubmit={handleSubmit(submitData)}>
          {/* Email Field */}
          <div className="flex flex-col gap-2 py-2">
            <Label
              className={`${errors.email ? "text-red-500" : "text-gray-400"}`}
            >
              Email Address
            </Label>
            <div className="relative w-72 sm:min-w-96 ">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-textPrimary">
                <Mail size={16} />
              </div>
              <Input
                autoComplete="off"
                type="email"
                placeholder="youremail@example.com"
                {...register("email")}
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 ${
                  errors.email
                    ? "ring-1 ring-red-500 focus-visible:ring-red-500"
                    : "focus-visible:ring-surfaceBrand"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 overflow-hidden">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 py-2">
            <Label
              className={`${
                errors.password ? "text-red-500" : "text-gray-400"
              }`}
            >
              Password
            </Label>
            <div className="relative w-72 sm:min-w-96 ">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-textPrimary">
                <KeyRound size={16} />
              </div>
              <Input
                autoComplete="off"
                type="password"
                placeholder="password"
                {...register("password")}
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 ${
                  errors.password
                    ? "ring-1 ring-red-500 focus-visible:ring-red-500"
                    : "focus-visible:ring-surfaceBrand"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 overflow-hidden">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button with Spinner */}
          <Button
            type="submit"
            className="mt-4 w-full rounded-full bg-surfaceBrand text-white py-4 font-semibold flex items-center"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <Spinner /> // Show the spinner while loading
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Sign up link */}
        <p className="text-white text-center mt-4">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-700 hover:text-blue-600 hover:border-b-2 border-blue-600 hover:pb-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Login;
