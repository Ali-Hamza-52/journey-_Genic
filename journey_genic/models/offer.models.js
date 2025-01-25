const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Offer Schema
const offerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    facilities: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    validUntil: {
      type: String,
      required: true,
    },
    maxBookings: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Offer = mongoose.models.Offer || mongoose.model('Offer',offerSchema);
export default Offer;
