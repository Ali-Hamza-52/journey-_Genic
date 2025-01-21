import Destination from "@/models/destination.models";
import { NextResponse } from "next/server";
import databaseConnection from "@/database/connectionDb";

// delete destination
export async function DELETE(request, { params }) {
    try {
        await databaseConnection();
        const destination = await Destination.findByIdAndDelete(params.slug);
        if (!destination) {
            return NextResponse.json({
                status: 404,
                message: 'Destination not found'
            });
        }
        return NextResponse.json({
            status: 200,
            message: 'Destination deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to delete destination'
        });
    }
    
}

// get destination 
export async function GET(request, { params }){
    try {
        await databaseConnection();
        const destination = await Destination.findById(params.slug);
        if (!destination) {
            return NextResponse.json({
                status: 404,
                message: 'Destination not found'
            });
        }
        return NextResponse.json({
            status: 200,
            data: destination
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to fetch destination'
        });
    }
}

// update destination
export async function PUT(request, { params }){
    try {
        await databaseConnection();
        const body = await request.json();
        const updatedDestination = await Destination.findByIdAndUpdate(params.slug, body, { new: true });
        if (!updatedDestination) {
            return NextResponse.json({
                status: 404,
                message: 'Destination not found'
            });
        }
        return NextResponse.json({
            status: 200,
            data: updatedDestination
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to update destination'
        });
    }
}