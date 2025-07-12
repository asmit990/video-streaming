import { connectionToDatabase } from "@/app/lib/db";
import User from "@/app/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
       const {email, password} =  await request.json()

       if(!email || !password) {
          return NextResponse.json(
            {error: "email n password is required"},
            {status: 400}
          )
       }
       await connectionToDatabase()

       const existingUser = await User.findOne({email})
       if(existingUser){
        return NextResponse.json(
            {error: "user exist"},
            {status: 400}
          )
       }
      await User.create({
          email,
          password
       })

       return NextResponse.json(
        {message: "You resgistered"},
        {status: 201 }
       );
    }

    catch (error){
     return NextResponse.json(
        {error: "failed to register user"},
        {status: 400}
     )
    }
}