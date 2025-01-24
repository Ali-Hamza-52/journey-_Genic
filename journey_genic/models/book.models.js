import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // User model ka reference
            required: true,
        },
        offerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Offer",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        seats: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
