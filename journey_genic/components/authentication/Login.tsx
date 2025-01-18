"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import MainSectionWrapper from "../common/MainSectionWrapper";
import { KeyRound, Mail, ScanFace, Loader } from "lucide-react"; // Add the Loader icon for spinner

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { LoginFormValues } from "@/helpers/types/login";
import loginSchema from "@/helpers/schemas/login";
import Link from "next/link";
import SocialLogins from "./SocialLogins";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import {
  selectIsLoginLoading,
  selectIsUserLoggedIn,
} from "@/lib/store/features/user/selectors";
import { loginUser } from "@/lib/store/features/user/thunk";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoginLoading); // Select loading state
  const isSuccess = useAppSelector(selectIsUserLoggedIn); // Select
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const submitData = (data: LoginFormValues): void => {
    console.log("Submitted Data:", data);
    dispatch(loginUser(data)); // Dispatch login action
  };

  useEffect(() => {
    if(isSuccess){
      router.push("/");
    }
  }, [isSuccess])

  return (
    <MainSectionWrapper>
      <div className="max-w-lg bg-neutral200 px-6 sm:px-16 py-8 shadow-2xl rounded-2xl mx-auto flex flex-col justify-center items-center gap-3 overflow-hidden">
        <ScanFace size={48} color="white" />

        <form onSubmit={handleSubmit(submitData)}>
          {/* Email Field */}
          <div className="flex flex-col gap-2 py-2">
            <Label
              className={`${errors.email ? "text-red-500" : "text-neutral700"}`}
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
                placeholder="your_email@example.com"
                {...register("email")}
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 font-semibold text-neutral700 focus-visible:ring-1 focus-visible:ring-offset-0 ${
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
                errors.password ? "text-red-500" : "text-neutral700"
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
                className={`w-full rounded-full border-none bg-surfaceOverlay px-10 py-3 font-semibold text-neutral700 focus-visible:ring-1 focus-visible:ring-offset-0 ${
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
              <Spinner />
            ) : (
              // Show spinner when loading
              "Login"
            )}
          </Button>
        </form>

        {/* Social Logins Component */}
        <SocialLogins isLoading={isLoading}/>

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
    </MainSectionWrapper>
  );
};

export default Login;
