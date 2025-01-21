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
import { firebaseDeleteImageHandler } from '@/services/firebaseImageDelete';
import { Spinner } from '@/components/ui/spinner';
import { firebaseUploadImageHandler } from '@/services/firebaseImageUpload';
import axiosInstance from '@/lib/axiosInstance';

const offerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  price: z.number().min(0, 'Price must be positive').default(0),
  discount: z.number().min(0, 'Discount must be positive').default(0),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  facilities: z.array(z.string()).min(1, 'At least one facility is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  validUntil: z.string().min(1, 'Valid until date is required'),
  maxBookings: z.number().min(1, 'Maximum bookings must be at least 1'),
});

export const OfferForm = ({ initialData = null }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(initialData?.images || []);

  const form = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      country: '',
      city: '',
      price: 0,
      discount: 0,
      tags: [],
      facilities: [],
      images: [],
      validUntil: '',
      maxBookings: 1,
    },
  });

  const onSubmit = async (data) => {
    console.log('i am submitting', data);
    try {
      setLoading(true);

      if (!initialData) {

        console.log('i am submitting', data);
        const response = await axiosInstance.post('/offer', data);
        console.log('response', response);
        if (response.status === 200) {
          toast.success('Offer saved successfully!');
          setIsEditing(false);
        }
      } else {
        const response = await axiosInstance.put(`/offer/${initialData._id}`, data);
        if (response.status === 200) {
          toast.success('Offer updated successfully!');
          setIsEditing(false);
        }
      }
      window.location.reload();

    } catch (error) {
      console.log('error', error);
      setLoading(false);
      toast.error('Failed to save offer');
    } finally {
      setLoading(false);
    }
  };

  const deleteImageHandler = async (index) => {
    const imageToDelete = uploadedImages[index];

    try {
      setIsEditing(true);
      await firebaseDeleteImageHandler(imageToDelete);

      const newImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(newImages);
      form.setValue("images", newImages);
      toast.success("Image deleted successfully");
      if (initialData) {
        try {
          const response = await axiosInstance.put(`/offer/${initialData._id}`, { images: newImages });
          if (response.status === 200) {
            toast.success("Image deleted successfully from offer");
          } else {
            toast.error("Failed to delete image from offer");
          }
        } catch {
          toast.error("Failed to delete image from offer");
        }
      }
    } catch {
      toast.error("Failed to delete image");
      setIsEditing(false);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Summer Special 2025" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validUntil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid Until</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe your special offer..."
                  className="h-32"
                />
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
                  <Input {...field} placeholder="Greece" />
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
                  <Input {...field} placeholder="Santorini" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                    placeholder="1500"
                    min="0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                    min="0"
                    placeholder="20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxBookings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Bookings</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                    min="1"
                    placeholder="50"
                  />
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
                  placeholder="Add offer tags (e.g., summer, beach, family)..."
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
                  placeholder="Add facilities (e.g., wifi, pool, spa)..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Offer Images</FormLabel>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="file"
              multiple
              onChange={imageHandler}
              className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-background file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              accept="image/*"
            />
            {form.errors?.images && (
              <p className="text-red-500 mt-1 text-sm">{form.errors.images.message}</p>
            )}


            {isEditing && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader className="animate-spin duration-700" size={20} />
                <span>Uploading images...</span>
              </div>
            )}

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Offer image ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
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

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="px-8 flex items-center">
            {
              isLoading ? <Spinner /> :
                initialData ? 'Update Offer' : 'Create Offer'}

          </Button>
        </div>
      </form>
    </Form>
  );
};