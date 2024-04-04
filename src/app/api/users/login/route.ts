import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const {email,password} = await request.json()
        console.log(email,password);
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exists"},{status:400})
        }
        console.log("User exists");

        const validPassword = bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({error:"Check Your credentials"},{status:400})
        }
        
        const tokenData = {
            id: user._id,
            username:user.username,
            email:user.email
        }

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const response = NextResponse.json({
            message:"logged In success",
            success: true
        })

        response.cookies.set("token",token,{
            httpOnly: true
        })

        return response

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status: 500})
    }
}