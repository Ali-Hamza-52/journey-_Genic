import mongoose from "mongoose";
import databaseConnection from "@/database/connectionDb";
import { NextResponse } from "next/server";
import Review from "@/models/review.models";

//Get all reviews

export async function GET() {
    try {
        await databaseConnection();
        const reviews = await Review.find({});
        if (reviews.length === 0) {
            return NextResponse.json({
                status: 404,
                message: "No reviews found",
            });
        }
        return NextResponse.json({
            status: 200,
            data: reviews,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Server error",
        });
    }
}

// POST reviews

export async function POST(req) {
    try {
        const body = await req.json();
        const { productId, userId, comment, rating } = body;
        await databaseConnection();

        const newReview = new Review({
            productId,
            userId,
            comment,
            rating,
        });

        await newReview.save();

        return NextResponse.json({
            status: 200,
            data: newReview,
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Server error",
        });
    }
}