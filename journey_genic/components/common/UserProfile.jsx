"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"; // ✅ Sonner Toast Import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Camera, LogOut } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { firebaseUploadImageHandler } from "@/services/firebaseImageUpload";
import Image from "next/image";

const profileSchema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  profileImage: z.string().optional(),
  userId: z.string(),
});

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState("/svgs/icon-user-logo.svg");

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
        setPreviewImage(storedUser.avatar || "/svgs/icon-user-logo.svg");
      }
    } catch (err) {
      setError("Failed to load user data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      profileImage: user?.avatar || "",
      userId: user?.userId || "",
    },
  });

  useEffect(() => {
    if (isEditing && user) {
      reset({
        username: user.username,
        email: user.email,
        password: "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        userId: user.userId,
      });
    }
  }, [isEditing, user, reset]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await firebaseUploadImageHandler(file);
      if (imageUrl === "404 error") {
        toast.error("Failed to upload image");
        return;
      }

      setPreviewImage(imageUrl);
      setValue("profileImage", imageUrl);
      toast.success("Image uploaded successfully! 🎉");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        profileImage: previewImage !== "/svgs/icon-user-logo.svg" ? previewImage : undefined,
      };

      const response = await axiosInstance.put(`/user/${data.userId}`, payload);
      if (response.status === 200) {
        toast.success("Profile updated successfully! 🎉");
        setIsEditing(false);
        localStorage.setItem("user", JSON.stringify({ ...user, ...payload, avatar: previewImage }));
        setUser({ ...user, ...payload, avatar: previewImage });
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const userLogout = () => {
    localStorage.removeItem("user");
    toast.info("Logged out successfully. Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <CardTitle className="text-2xl font-bold">Customer Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
              <Image src={previewImage} alt="Profile" width={100} height={100} />
            </div>
          </div>

          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button className="w-full mb-6 bg-blue-500 hover:bg-blue-600 text-white">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile details. Leave the password field empty if you don't want to change it.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <Image src={previewImage} alt="Profile" width={100} height={100} />
                  <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                    <Camera className="text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>

                <div className="space-y-4">
                  {["username", "email", "password", "phoneNumber", "address"].map((field) => (
                    <div key={field}>
                      <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                      <Controller
                        name={field}
                        control={control}
                        render={({ field: { ref, ...fieldProps } }) => (
                          <Input {...fieldProps} type={field === "password" ? "password" : "text"} />
                        )}
                      />
                      {errors[field] && <p className="text-red-500">{errors[field]?.message}</p>}
                    </div>
                  ))}
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting || isUploading}>
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button onClick={userLogout} className="w-full bg-red-500 hover:bg-red-600 text-white">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
