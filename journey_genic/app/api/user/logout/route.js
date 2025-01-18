
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(){
    // logout the user
    try{
        cookies().delete('accessToken');
    return NextResponse.json({
        status: 200,
        message: "User logged out successfully"
    })
    }catch{
        return NextResponse.json({
            status:500
        })
    }

}