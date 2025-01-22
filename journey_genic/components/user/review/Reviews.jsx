"use client";

import React, { useEffect } from "react";
import StarRating from "@/components/common/StarRating";
import ReviewBar from "./ReviewBar";
import ReviewForm from "./ReviewForm";
import { Typography } from "@/components/ui/typography";

const Reviews = ({ id }) => {
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const calculateReviewData = (reviews) => {
    const ratingCount = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    const totalReviews = reviews.length;

    reviews.forEach((review) => {
      ratingCount[review.rating] += 1;
    });

    return Object.entries(ratingCount).map(([stars, count]) => ({
      stars: Number(stars),
      percentage:
        totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0,
    }));
  };

  // Sanitize reviews to match IReview type
  const sanitizedReviews = (reviews || []).map((review) => ({
    ...review,
    userId:
      typeof review.userId === "string"
        ? { _id: review.userId, username: "Unknown", profileImage: "" }
        : {
            ...review.userId,
            _id: review.userId._id || "", // Default to an empty string
          },
  }));

  const reviewData = calculateReviewData(sanitizedReviews);

  return (
    <div className="max-w-7xl mx-auto">
      <Typography variant="h4" weight="semiBold" className="mb-4">
        Customer Reviews
      </Typography>
      <div className="flex items-center mb-4">
        <StarRating rating={avgRating || 0} />
        <Typography variant="t2" className="ml-2 text-gray-600">
          Based on {sanitizedReviews.length} reviews
        </Typography>
      </div>
      <div className="mb-6">
        {reviewData.map((review) => (
          <ReviewBar
            key={review.stars}
            stars={review.stars}
            percentage={review.percentage}
          />
        ))}
      </div>
      <div className="mb-6">
        <Typography variant="h4" weight="semiBold" className="mb-2">
          Share your thoughts
        </Typography>
        <Typography variant="t2" className="text-gray-600 mb-2">
          If you've used this product, share your thoughts with other customers
        </Typography>
        <ReviewForm id={id}/>
      </div>
      <div className="max-h-96 overflow-auto p-2 scroll-smooth showScrollbar">
        {loading ? (
          sanitizedReviews.map((review, index) => (
            <UserReviewCard key={index} {...review} />
          ))
        ) : (
          <Typography className="text-center" weight="bold">
            No reviews found
          </Typography>
        )}
        {reviews === undefined && (
          <Typography className="text-center" weight="bold">
            No reviews found
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Reviews;
