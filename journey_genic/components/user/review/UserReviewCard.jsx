import StarRating from "@/components/common/StarRating";
import { Typography } from "@/components/ui/typography";
import { selectUserId } from "@/lib/store/features/user/selectors";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import Image from "next/image";
import React from "react";
import axiosInstance from "@/lib/axiosInstance";
import Swal from "sweetalert2";


const UserReviewCard = ({
  _id,
  userId: { _id: reviewUserId, username },
  comment,
  rating,
  profileImage,
}) => {
  const avatarSrc = profileImage || `/svgs/icon-user-logo.svg`;
  const loggedInUserId = useAppSelector(selectUserId); // Logged-in user ID

  // Handle deleting a review
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(`/review/${_id}`);
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
            window.location.reload();
          } else {
            Swal.fire("Error!", "Failed to delete the review.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "An error occurred while deleting.", "error");
        }
      }
    });
  };

  // Handle editing a review
  const handleEdit = async () => {
    const { value: updatedComment } = await Swal.fire({
      title: "Edit Review Comment",
      input: "textarea",
      inputValue: comment,
      showCancelButton: true,
      inputPlaceholder: "Enter your updated review comment",
      inputValidator: (value) => {
        if (!value) {
          return "Comment cannot be empty!";
        }
      },
    });

    if (updatedComment) {
      const { value: updatedRating } = await Swal.fire({
        title: "Edit Review Rating",
        input: "number",
        inputValue: rating,
        showCancelButton: true,
        inputAttributes: {
          min: "1",
          max: "5",
          step: "1",
        },
        inputValidator: (value) => {
          if (!value || parseInt(value, 10) < 1 || parseInt(value, 10) > 5) {
            return "Rating must be between 1 and 5!";
          }
        },
      });

      if (updatedRating) {
        try {
          await axiosInstance.put(`/review/${_id}`, {
            comment: updatedComment,
            rating: parseInt(updatedRating, 10),
          });
          Swal.fire("Updated!", "Your review has been updated.", "success");
          // Add logic to refresh the review list or update the UI
          window.location.reload();
        } catch (error) {
          Swal.fire("Error!", "Failed to update the review.", "error");
        }
      }
    }
  };

  return (
    <div className="flex items-start mb-4 shadow-md p-4 rounded-md">
      <Image
        src={avatarSrc}
        alt={username}
        width={40}
        height={40}
        quality={100}
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-between items-center mb-1">
          <Typography variant="h5" weight="semiBold" className="mr-2">
            {username}
          </Typography>
          <StarRating rating={rating} />
        </div>
        <Typography variant="t2" className=" text-gray-600">
          {comment}
        </Typography>
        {loggedInUserId === reviewUserId && ( // Show buttons if user owns the review
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleEdit}
              className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReviewCard;
