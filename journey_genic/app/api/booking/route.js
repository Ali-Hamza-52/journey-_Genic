import Booking from "@/models/book.models";
import databaseConnection from "@/database/connectionDb";
import { NextResponse } from "next/server";
import Offer from "@/models/offer.models";

export async function GET() {
  try {
    await databaseConnection();
    const bookings = await Booking.find({});
    if (!bookings) {
      return NextResponse.json({
        status: 404,
      });
    }
    return NextResponse.json({
      status: 200,
      data: bookings,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    await databaseConnection();
    const body = await request.json();
    const { userId, totalCost, numSeats, offerId, discount, price } = body;

    const bookingData = {
      userId,
      offerId,
      totalPrice: totalCost, // Corresponding to totalPrice from schema
      discount,
      price,
      seats: numSeats, // Corresponding to seats from schema
    };
    console.log("i am returning", body);
    const isBookingExist = await Booking.findOne({
      offerId: body.offerId,
      userId: body.userId,
    });
    if (isBookingExist) {
      return NextResponse.json({
        status: 400,
        message: "You already have a booking for this offer",
      });
    }
    const newBooking = await Booking.create(bookingData);
    console.log("object-->", newBooking);
    // update offer with new booking and remove maxBookings minus total reservation seats
    await Offer.updateOne(
      { _id: body.offerId },
      { $inc: { maxBookings: -numSeats } } // Use numSeats here instead of body.seats
    );

    return NextResponse.json({
      status: 200,
      newBooking,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
