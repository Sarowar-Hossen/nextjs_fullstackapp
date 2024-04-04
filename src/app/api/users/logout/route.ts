import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest){
    try {
        
        const response = NextResponse.json({
            message: "Logout successfully",
            seccess: true,
        })

        response.cookies.set("token","",{
            expires: new Date(0)
        })
        
        return response
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}