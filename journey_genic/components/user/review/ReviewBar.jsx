import { Star } from "lucide-react";
import React from "react";

const ReviewBar = ({
  stars,
  percentage,
}) => {
  return (
    <div className="flex items-center mb-1">
      <span className="w-3 mr-2">{stars}</span>
      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2" />
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-yellow-400 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="w-10 text-right">{percentage}%</span>
    </div>
  );
};
export default ReviewBar;
