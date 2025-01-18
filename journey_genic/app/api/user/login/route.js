import { NextResponse } from "next/server";
import * as argon from "argon2";
import User from "@/models/user.models";
import databaseConnection from "@/database/connectionDb";
import { generateToken } from "@/services/generateToken";
import { cookies } from 'next/headers';
// Login user
export async function POST(request) {
    try {
        
        // Connect to the database
        await databaseConnection(); 
        
        // Parse JSON request body  (if request is in JSON format)
        const body = await request.json();

        // Get user credentials from request body
        const { email, password } = body;

        // Check if user exists
        const savedUser = await User.findOne({ email: email });
        if (!savedUser) {
            return NextResponse.json({
                status: 401,
                message: "Invalid email or password",
            });
        }

        // Verify password
        const isPasswordValid = await argon.verify(savedUser.password, password);
        if (!isPasswordValid) {
            return NextResponse.json({
                status: 401,
                message: "Invalid email or password",
            });
        }

        // Generate JWT token
        const token = generateToken({ userId: savedUser._id, role: savedUser.role });
        const cookie = cookies();
        cookie.set('accessToken', token, {
            expires: new Date(Date.now() + 1 * 86400000),
            secure:true,
            sameSite: 'strict',
            httpOnly: true,
        });
        // Return success response
        return NextResponse.json({
            status: 200,
            message: "Login successful",
            user: {
              userId: savedUser._id,
              email: savedUser.email,
              role: savedUser.role,
              username: savedUser.username,
              avatar: savedUser?.profileImage || null, // If undefined, return null
              isSocialLogin: savedUser.isSocialLogin,
              phoneNumber: savedUser?.phoneNumber || null, // If undefined, return null
              address: savedUser?.address || null, // If undefined, return null
            },
            token, // Return the token
          });
          
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 500,
            message: "Something went wrong on our end. Please try again later......",
        });
    }
}
