import databaseConnection from "@/database/connectionDb";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

// Get all users
export async function GET() {
    try {
        await databaseConnection();
        const users = await User.find({},'_id username address email profileImage role');
        if (!users) {
            return NextResponse.json({
                status: 404,
                message: 'User not found'
            })
        }
        return NextResponse.json({
            status: 200,
            data: users
        })

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 500,
            message: 'Failed to fetch user data'
        })
    }

}
