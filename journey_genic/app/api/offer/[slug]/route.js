import Offer from "@/models/offer.models";
import { NextResponse } from "next/server";
import databaseConnection from "@/database/connectionDb";

// delete offer
export async function DELETE(request, { params }) {
    try {
        await databaseConnection();
        const offer = await Offer.findByIdAndDelete(params.slug);
        if (!offer) {
            return NextResponse.json({
                status: 404,
                message: 'offer not found'
            });
        }
        return NextResponse.json({
            status: 200,
            message: 'offer deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to delete offer'
        });
    }
    
}

// get offer 
export async function GET(request, { params }){
    try {
        await databaseConnection();
        const offer = await Offer.findById(params.slug);
        if (!offer) {
            return NextResponse.json({
                status: 404,
                message: 'offer not found'
            });
        }
        console.log("offer found", offer);
        return NextResponse.json({
            status: 200,
            data: offer
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to fetch offer'
        });
    }
}

// update offer
export async function PUT(request, { params }){
    try {
        await databaseConnection();
        const body = await request.json();
        const updatedOffer = await Offer.findByIdAndUpdate(params.slug, body, { new: true });
        if (!updatedOffer) {
            return NextResponse.json({
                status: 404,
                message: 'offer not found'
            });
        }
        return NextResponse.json({
            status: 200,
            data: updatedOffer
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to update offer'
        });
    }
}