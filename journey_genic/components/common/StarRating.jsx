import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercentage =
          star <= rating
            ? 100 // Full star
            : star - 1 < rating
            ? (rating - (star - 1)) * 100 // Partial star
            : 0; // Empty star

        return (
          <div
            key={star}
            className="relative w-10 h-10"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} // Ensure proper sizing
          >
            {/* Background Star (Empty) */}
            <Star className="absolute text-gray-300 w-10 h-10" />
            {/* Foreground Star (Fill) */}
            <Star
              className="absolute text-yellow-400 fill-yellow-400 w-10 h-10"
              style={{
                clipPath: `polygon(0 0, ${fillPercentage}% 0, ${fillPercentage}% 100%, 0 100%)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
