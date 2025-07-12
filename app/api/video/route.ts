import { authOptions } from "@/app/lib/auth";
import { connectionToDatabase } from "@/app/lib/db";
import { IVideo, Video  }from "@/app/model/Video";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from 'next/server';



export async function GET() {
  try {
    await connectionToDatabase()
    const videos =  await Video.find({}).sort({createdAt: -1}).lean()

    if(!videos || videos.length === 0){
         return NextResponse.json([], {status:200})
    }

    return NextResponse.json(videos)
  } catch (error) {
     return NextResponse.json(
        {error: "failed to fetch"},
        {status: 500}
     )
  } 
}


export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) {
         return NextResponse.json({ error: "Unauthorized"}, {
            status: 401
         });

        }

        await connectionToDatabase()

        const body: IVideo = await request.json()
        if (
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl
        ) {
        return NextResponse.json( 

            {error: "Missing required fields"},
            {status: 400}
        );
        }
          const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? true,
            },

          }
     const newVideo =  await Video.create(videoData)

     return NextResponse.json(newVideo)
    } catch (error) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }

}