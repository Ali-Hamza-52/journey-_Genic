"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import reviewSchema from "@/helpers/schemas/review";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

const ReviewForm = ({ id }) => {
  const user_id = localStorage.getItem("travelingUserId");
  console.log("this is user id", user_id);
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      productId: id,
      userId: user_id.replace(/^"|"$/g, ''),
    },
  });

  const handleRating = (star) => {
    setRating(star);
    setValue("rating", star);
  };

  const onSubmit = async (data) => {
    console.log("data is ", data);
    try {
      const response = await axiosInstance.post("/review", data);
      if (response.status === 200) {
        toast.success("Review submitted successfully!");
        window.location.reload();
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
      reset();
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger>
          <Typography variant="h4" weight="semiBold">
            Write a review
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-full p-4 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => {
                      handleRating(star);
                    }}
                  />
                ))}
              </div>
              <textarea
                {...register("comment")}
                className="w-full p-2 border outline-none focus:border-blue-500 focus-within:border-blue-500 resize-none rounded-md"
                rows={4}
                placeholder="Write your review"
              />
              {errors.comment && (
                <p className="text-red-500">{errors.comment.message}</p>
              )}
              <Button type="submit" className="mt-4 rounded-full">
                Add Review
              </Button>
            </form>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ReviewForm;
