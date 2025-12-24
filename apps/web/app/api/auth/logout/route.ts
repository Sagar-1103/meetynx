import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("jwtToken");
        return NextResponse.json({success:true,message:"Cleared user cookies successfully."});
    } catch (error) {
        return NextResponse.json({success:false,message:"Error clearing cookies.",error});
    }
}