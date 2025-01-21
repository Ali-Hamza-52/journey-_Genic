import databaseConnection from "@/database/connectionDb";
import Offer from "@/models/offer.models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await databaseConnection();
    // Your code here get all destinations
    const offers = await Offer.find({});
    console.log("objects:", offers)
    if (!offers) {
      return NextResponse.json({
        status: 404,
        message: "No offers found",
      });
    }
    return NextResponse.json({
      status: 200,
      data: offers,
    });
  } catch {
    return NextResponse.json({ status: 500, message: "Server Error" });
  }
}

// POST request to create a new Offer
export async function POST(req) {
  try {
    await databaseConnection();
    const body = await req.json();
    console.log("offer --->,", body);
    const newOffer = new Offer(body);
    await newOffer.save();
    return NextResponse.json({
      status: 200,
      message: "Offer created successfully",
      data: newOffer,
    });
  } catch(err) {
    console.log(err);
    return NextResponse.json({ status: 500, message: err.message });
  }
}
