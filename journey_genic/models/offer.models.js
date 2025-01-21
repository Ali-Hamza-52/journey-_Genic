const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Offer Schema
const offerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    description: {
      type: String,
      required: true,
      minlength: [10, "Description must be at least 10 characters"],
    },
    country: {
      type: String,
      required: true,
      minlength: [2, "Country must be at least 2 characters"],
    },
    city: {
      type: String,
      required: true,
      minlength: [2, "City must be at least 2 characters"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be positive"],
    },
    discount: {
      type: Number,
      required: true,
      min: [0, "Discount must be positive"],
    },
    tags: {
      type: [String],
      required: true,
      minlength: [1, "At least one tag is required"],
    },
    facilities: {
      type: [String],
      required: true,
      minlength: [1, "At least one facility is required"],
    },
    images: {
      type: [String],
      required: true,
      minlength: [1, "At least one image is required"],
    },
    validUntil: {
      type: String,
      required: true,
      minlength: [1, "Valid until date is required"],
    },
    maxBookings: {
      type: Number,
      required: true,
      min: [1, "Maximum bookings must be at least 1"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Offer = mongoose.models.Offer || mongoose.model('Offer',offerSchema);
export default Offer;
