import * as argon from "argon2";
import databaseConnection from "@/database/connectionDb";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

//GET Single User
export async function GET(
    request: Request,
    { params }: { params: { userId: String } }) {
    try {
        await databaseConnection();
        const user = await User.findById(params.userId);
        if (!user) {
            return NextResponse.json({
                status: 404,
                message: 'User not found'
            })
        }
        return NextResponse.json({
            status: 200,
            userId: params.userId,
            user: user
        })

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 500,
            message: 'Failed to fetch user data'
        })
    }

}

// update User

export async function PUT(request: Request, { params }: { params: { userId: String } }) {
    try {
        await databaseConnection();
        const body = await request.json();
        console.log("body--->1", body);
        
        // Check if password is provided and has a non-zero length
        if (body.password && body.password.length > 0) {
            body.password = await argon.hash(body.password); // Hash the password
        } else {
            // Remove password from body if not provided or empty
            delete body.password;
        }
        
        console.log("body--->2", body);
        // Find and update the user with the provided userId
        const user = await User.findByIdAndUpdate(params.userId, body, { new: true });

        if (!user) {
            return NextResponse.json({
                status: 404,
                message: 'User not found'
            });
        }

        return NextResponse.json({
            status: 200,
            userId: params.userId,
            user: user
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 500,
            message: 'Failed to update user data'
        });
    }
}


// delete User

export async function DELETE(request: Request, { params }: { params: { userId: String } }) {
    try {
        await databaseConnection();
        const user = await User.findByIdAndDelete(params.userId);
        if (!user) {
            return NextResponse.json({
                status: 404,
                message: 'User not found'
            })
        }
        return NextResponse.json({
            status: 200,
            userId: params.userId,
            message: 'User deleted successfully'
        })
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 500,
            message: 'Failed to delete user data'
        })
    }
}