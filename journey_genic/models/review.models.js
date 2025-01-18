import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // User model ka reference
            required: true,
        },
        comment: {
            type: String,
            required: true,
            maxlength: 3000,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
