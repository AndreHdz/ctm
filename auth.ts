import NextAuth,{type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import {Role} from "@prisma/client"


declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        /** The user's postal address. */
        role: Role
        working_company: string,
        phone: string,
        status: string

        /**
         * By default, TypeScript merges new interface properties and overwrites existing ones.
         * In this case, the default session user properties will be overwritten,
         * with the new ones defined above. To keep the default session user properties,
         * you need to add them back into the newly declared interface.
         */
      } & DefaultSession["user"]
    }
  }
 
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks:{
    async session({token, session}){


        if(token.sub && session.user){
            session.user.id = token.sub
        }

        if(token.role && token.working_company && token.phone && token.status && session.user){
            session.user.role = token.role as Role
            session.user.working_company = token.working_company as string
            session.user.phone = token.phone as string
            session.user.status = token.status as string
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