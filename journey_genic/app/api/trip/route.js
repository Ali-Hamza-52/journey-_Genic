import databaseConnection from "@/database/connectionDb";
import Trip from "@/models/trip.models"; // Changed to Trip model
import { NextResponse } from "next/server";

// GET request to fetch all trips
export async function GET() {
  try {
    await databaseConnection();
    // Get all trips from the Trip model
    const trips = await Trip.find({}); // Changed from Offer to Trip
    console.log("objects:", trips);
    if (!trips || trips.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No trips found", // Changed 'offers' to 'trips'
      });
    }
    return NextResponse.json({
      status: 200,
      data: trips,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server Error" });
  }
}

// POST request to create a new trip
export async function POST(req) {
  try {
    await databaseConnection();
    const body = await req.json();
    console.log("I am called", body);
    const newTrip = new Trip(body); // Changed from Offer to Trip
    await newTrip.save();
    return NextResponse.json({
      status: 200,
      message: "Trip created successfully", // Changed 'offer' to 'trip'
      data: newTrip,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server Error" });
  }
}
