import databaseConnection from "@/database/connectionDb";
import Destination from "@/models/destination.models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await databaseConnection();
    // Your code here get all destinations
    const destinations = await Destination.find({});
    if (!destinations) {
      return NextResponse.json({
        status: 404,
        message: "No destinations found",
      });
    }
    return NextResponse.json({
      status: 200,
      data: destinations,
    });
  } catch {
    return NextResponse.json({ status: 500, message: "Server Error" });
  }
}

// POST request to create a new Destination
export async function POST(req) {
  try {
    await databaseConnection();
    const body = await req.json();
    const newDestination = new Destination(body);
    await newDestination.save();
    return NextResponse.json({
      status: 200,
      message: "Destination created successfully",
      data: newDestination,
    });
  } catch {
    return NextResponse.json({ status: 500, message: "Server Error" });
  }
}
