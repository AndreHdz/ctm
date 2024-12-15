/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextAuthConfig } from "next-auth"
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import {db} from "./lib/db"

export default { 
    providers: [
        
        Credentials({
            // @ts-expect-error
            async authorize(credentials) {

                const validateFields = LoginSchema.safeParse(credentials);

                if(validateFields.success){
                    const {user_id, password} = validateFields.data;

                    const user = await db.user.findUnique({
                        where : {
                            id : parseInt(user_id)
                        }
                    })

                    if(!user || !user.is_registered){
                        return null
                    }


                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password || ""
                    );

                    if(passwordsMatch){
                        return user
                    }

                }
            }
        }),
    ]
} satisfies NextAuthConfig
