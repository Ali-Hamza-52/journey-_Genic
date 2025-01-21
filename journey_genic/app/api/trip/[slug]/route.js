import Trip from "@/models/trip";
import { NextResponse } from "next/server";
import databaseConnection from "@/database/connectionDb";

// delete destination
export async function DELETE(request, { params }) {
    try {
        await databaseConnection();
        const trip = await Trip.findByIdAndDelete(params.slug);
        if (!trip) {
            return NextResponse.json({
                status: 404,
                message: 'Trip not found'
            });
        }
        return NextResponse.json({
            status: 200,
            message: 'Trip deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to delete Trip'
        });
    }
    
}

// get destination 
export async function GET(request, { params }){
    try {
        await databaseConnection();
        const trip = await Trip.findById(params.slug);
        if (!trip) {
            return NextResponse.json({
                status: 404,
                message: 'Trip not found'
            });
        }
        return NextResponse.json({
            status: 200,
            data: trip
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to fetch trip'
        });
    }
}

// update Trip
export async function PUT(request, { params }){
    try {
        await databaseConnection();
        const body = await request.json();
        const updatedTrip = await Trip.findByIdAndUpdate(params.slug, body, { new: true });
        if (!updatedTrip) {
            return NextResponse.json({
                status: 404,
                message: 'Trip not found'
            });
        }
        return NextResponse.json({
            status: 200,
            data: updatedTrip
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to update Trip'
        });
    }
}