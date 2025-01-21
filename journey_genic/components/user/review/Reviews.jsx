"use client";

import React, { useEffect } from "react";
import StarRating from "@/components/common/StarRating";
import ReviewBar from "@/components/pages/user/review/ReviewBar";
import UserReviewCard, {
  IReview,
} from "@/components/pages/user/review/UserReviewCard";
import ReviewForm from "@/components/pages/user/review/ReviewForm";
import MediumSectionWrapper from "@/components/common/MediumSectionWrapper";
import { Typography } from "@/components/ui/typography";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { fetchProductReviews } from "@/lib/store/features/product/thunk";
import {
  selectIsReviewError,
  selectIsReviewLoading,
  selectReviews,
  SelectIsReviewSuccess,
  selectRating,
} from "@/lib/store/features/product/selectors";

const Reviews = ({ id }) => {
  const dispatch = useAppDispatch();
  const isReviewLoading = useAppSelector(selectIsReviewLoading);
  const isReviewError = useAppSelector(selectIsReviewError);
  const reviews = useAppSelector(selectReviews);
  const isReviewSuccess = useAppSelector(SelectIsReviewSuccess);
  const avgRating = useAppSelector(selectRating);
  console.log("is review success", isReviewSuccess);

  useEffect(() => {
    dispatch(fetchProductReviews(id));
  }, [dispatch, id]);

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
    <MediumSectionWrapper>
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
        {isReviewSuccess ? (
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
    </MediumSectionWrapper>
  );
};

export default Reviews;
