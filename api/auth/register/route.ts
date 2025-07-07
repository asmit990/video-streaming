import { connectionToDatabase } from "@/lib/db";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
       const {email, password} =  await request.json()
    }
    catch (error){

    }
}