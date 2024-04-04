import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({
                message: "user Not found",
            })
        }
        return NextResponse.json({
            message: "user found",
            data:user
        })
    } catch (error) {
        
    }
}