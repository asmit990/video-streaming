import User from "@/model/User";
import { error } from "console";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
     CredentialProvider({
        name: "Credentials",
    credentials:{
        {label: "Email", type:"text"},
        password: {label: "Password", type: "password"}
    
    },
    async authorize(credentials){
        if(!credentials?.email || !credentials?.password){
          throw new Error("Missing email or password")
        }

        try {
            await connectToDatabase()
            const user = await User.findOne({email: credentials.email})

            if(!user){
                throw new Error("No user found with this")
            }

           const isValid =  await bcrypt.compare(
             credentials.password,
             user.password
            )

            if(!isValid) {
                throw new Error("invalid password")
            }
            return {
                id: user._id.toString(),
                email: user.email
            }
        } catch (error){
            console.error("Auth error", error)
            throw error 

        }
    },
 
     }),
    ],

    callbacks: {
        async jwt({token, user}){
            if (user){
                token.id = userAgent.id
            }

            return token
        }
    }
};



