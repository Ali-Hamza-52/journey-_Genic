import { NextResponse } from "next/server";
import * as argon from "argon2";
import User from "@/models/user.models";
import databaseConnection from "@/database/connectionDb";

//register user
export async function POST(req) {
    try {
        await databaseConnection();
        const body = await req.json();
        const { username, address, email, password, profileImage, phoneNumber, isSocialLogin, role } = body;
        
        // Check if user is existing or not
        // If existing, return error message
        const isUserExist = await User.findOne({
            email
        })

        if (isUserExist) {
            console.log("user already exist")
            return NextResponse.json({
                "status": 400,
                "message": "A user with this email already exists. Please log in or use a different email to register."
            })
        }

        // Hash the password
        const hashedPassword = await argon.hash(password);

        // Create new user with hashed password
        const newUser = new User({
            username,
            address,
            email,
            password: hashedPassword,
            profileImage,
            phoneNumber,
            isSocialLogin,
            role
        });

        // Save user to database
        await newUser.save();


        return NextResponse.json({
            "status": 200,
            "message": "Registration successful! Welcome to our platform."
        })

    } catch (err) {
        console.error("error a gya bhai",err);
        return NextResponse.json({
            "status": 500,
            "message": "Something went wrong on our end. Please try again later."
        })
    }
}
