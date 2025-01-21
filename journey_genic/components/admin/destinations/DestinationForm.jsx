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
import axiosInstance from '@/lib/axiosInstance';
import { firebaseUploadImageHandler } from '@/services/firebaseImageUpload';
import { firebaseDeleteImageHandler } from '@/services/firebaseImageDelete';
import { Spinner } from '@/components/ui/spinner';

const destinationSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    price: z.number().min(0, 'Price must be positive'),
    tags: z.array(z.string()).min(1, 'At least one tag is required'),
    facilities: z.array(z.string()).min(1, 'At least one facility is required'),
    images: z.array(z.string()).min(1, 'At least one image is required'),
});

export const DestinationForm = ({ initialData = null }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState(initialData?.images || []);

    const form = useForm({
        resolver: zodResolver(destinationSchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            country: '',
            city: '',
            price: 0,
            tags: [],
            facilities: [],
            images: [],
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            if (!initialData) {

                const response = await axiosInstance.post('/destination', data);
                if (response.status === 200) {
                    toast.success('Destination saved successfully!');
                    setIsEditing(false);
                }
            } else {
                const response = await axiosInstance.put(`/destination/${initialData._id}`, data);
                if (response.status === 200) {
                    toast.success('Destination updated successfully!');
                    setIsEditing(false);
                }
            }
            window.location.reload();

        } catch (error) {
            setLoading(false);
            toast.error('Failed to save destination');
        } finally {
            setLoading(false);
        }
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
                    const response = await axiosInstance.put(`/destination/${initialData._id}`, { images: newImages });
                    if (response.status === 200) {
                        toast.success("Image deleted successfully from destination");
                    } else {
                        toast.error("Failed to delete image from destination");
                    }
                } catch {
                    toast.error("Failed to delete image from destination");
                }
            }
        } catch {
            toast.error("Failed to delete image");
            setIsEditing(false);
        }
        setIsEditing(false);
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
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
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                                    placeholder="Add tags..."
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
                    <FormLabel>Images</FormLabel>
                    <input
                        type="file"
                        multiple
                        onChange={imageHandler}
                        className="block w-full text-sm border border-gray-300 rounded-sm cursor-pointer bg-background text-foreground"
                        accept="image/*"
                    />
                    {errors.images && (
                        <p className="text-red-500 mt-1 text-sm">{errors.images.message}</p>
                    )}
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

                <Button type="submit" className="w-full flex items-center">
                    {loading ? <Spinner /> :
                        initialData ? 'Update Destination' : 'Create Destination'}
                </Button>
            </form>
        </Form>
    );
};