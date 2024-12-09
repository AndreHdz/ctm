import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
 
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks:{
    async session({token, session}){


        if(token.sub && session.user){
            session.user.id = token.sub
        }

        if(token.role && token.working_company && token.phone && token.status && session.user){
            session.user.role = token.role
            session.user.working_company = token.working_company
            session.user.phone = token.phone
            session.user.status = token.status
        }

        return session
    },
    async jwt({token}){

        if(!token.sub) return token

        const existingUser = await getUserById(token.sub)

        if(!existingUser) return token

        token.role = existingUser.role
        token.working_company = existingUser.working_company
        token.phone = existingUser.phone
        token.status = existingUser.status

        return token
    }    
},
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})