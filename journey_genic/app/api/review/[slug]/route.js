import databaseConnection from "@/database/connectionDb";
import { NextResponse } from "next/server";
import Review from "@/models/review.models";
import User from "@/models/user.models"; // Ensure User model import ho

export async function GET(request, { params }) {
    try {
        await databaseConnection();

        // `slug` se productId ka reference le kar reviews fetch karna
        const reviews = await Review.find({ productId: params.slug }).populate({
            path: 'userId',
            model: User, // Explicitly specify model name
            select: "username profileImage", // Fetch only these fields
        })


        if (!reviews || reviews.length === 0) {
            return NextResponse.json({
                status: 404,
                message: "No reviews found",
            });
        }
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

        return NextResponse.json({
            status: 200,
            review: reviews,
            averageRating,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Server errorssss",
        });
    }
}

//Delete a review by slug

export async function DELETE(request, { params }) {
    try {
        await databaseConnection();
        const review = await Review.findByIdAndDelete(params.slug);
        if (!review) {
            return NextResponse.json({
                status: 404,
                message: "Review not found"
            })
        }
        return NextResponse.json({
            status: 200,
            message: "Review deleted successfully"
        })
    } catch (err) {
        return NextResponse.json({
            status: 500,
            message: "Server error"
        })
    }
}

//update review

export async function PUT(request, { params }) {
    try {
        await databaseConnection();
        const body = await request.json();
        const updatedReview = await Review.findByIdAndUpdate(params.slug, body, { new: true });
        if (!updatedReview) {
            return NextResponse.json({
                status: 404,
                message: "Review not found"
            })
        }
        return NextResponse.json({
            status: 200,
            data: updatedReview
        })
    } catch (err) {
        return NextResponse.json({
            status: 500,
            message: "Server error"
        })
    }
}