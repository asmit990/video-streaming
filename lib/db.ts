import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if(!MONGODB_URI) {
    throw new Error("PLease define mongo uri ")
}

let cached = global.mongoose

if(!cached){
 cached =   global.mongoose = { conn: null, promise: null}
}

export async function connectionToDatabase() {
    if(cached.conn){
        return cached.conn
    }
}