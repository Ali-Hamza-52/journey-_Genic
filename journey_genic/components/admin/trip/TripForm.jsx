'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from 'sonner';
import { Loader, Trash } from 'lucide-react';
import TagInput from '@/components/common/TagInput';
import { firebaseUploadImageHandler } from '@/services/firebaseImageUpload';
import { Spinner } from '@/components/ui/spinner';

const tripSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  facilities: z.array(z.string()).min(1, 'At least one facility is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
});

export const TripForm = ({ initialData = null }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(initialData?.images || []);

  const form = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      country: '',
      city: '',
      tags: [],
      facilities: [],
      images: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      if (!initialData) {

        const response = await axiosInstance.post('/trip', data);
        if (response.status === 200) {
          toast.success('Trip saved successfully!');
          setIsEditing(false);
        }
      } else {
        const response = await axiosInstance.put(`/trip/${initialData._id}`, data);
        if (response.status === 200) {
          toast.success('Trip updated successfully!');
          setIsEditing(false);
        }
      }
      window.location.reload();

    } catch (error) {
      setLoading(false);
      toast.error('Failed to save trip');
    } finally {
      setLoading(false);
    }
  };

  const deleteImageHandler = async (index) => {
    const imageToDelete = uploadedImages[index];

    try {
      setIsEditing(true);
      // Call the deleteImage function
      await firebaseDeleteImageHandler(imageToDelete);

      // Update local state to remove the image
      const newImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(newImages);
      setValue("images", newImages);
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error("Failed to delete image");
    }
    setIsEditing(false);
  };

  const imageHandler = async (event) => {
    const files = event.target.files;
    if (files) {
      const urls = [];

      for (const file of Array.from(files)) {
        try {
          setIsEditing(true);
          const url = await firebaseUploadImageHandler(file);
          if (typeof url === "string") {
            urls.push(url);
            toast.success("Image uploaded successfully");
          } else {
            toast.error("Failed to upload image");
          }
        } catch (error) {
          setIsEditing(false);
          toast.error("Failed to upload image");
        }
      }

      setUploadedImages((prev) => [...prev, ...urls]);
      form.setValue("images", [...uploadedImages, ...urls]);
      setIsEditing(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trip Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Add trip tags..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="facilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facilities</FormLabel>
              <FormControl>
                <TagInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Add facilities..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-4">
          <FormLabel>Trip Images</FormLabel>
          <input
            type="file"
            multiple
            onChange={imageHandler}
            className="block w-full text-sm border border-gray-300 rounded-sm cursor-pointer bg-background text-foreground"
            accept="image/*"
          />
          <div className="mt-2">
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt="Uploaded"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => deleteImageHandler(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-2">
            <Loader className="animate-spin duration-700" size={20} />
            <span className="text-gray-400">Uploading images...</span>
          </div>
        )}

        <Button type="submit" className="w-full">

          {isLoading ? <Spinner /> : initialData ? 'Update Trip' : 'Create Trip'}
        </Button>
      </form>
    </Form>
  );
};