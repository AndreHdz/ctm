"use server"

import * as z from "zod";
import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const  login = async (values: z.infer<typeof LoginSchema>) => {

    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success){
        return { error : "Invalid Fields"}
    }

    const {user_id, password} = validateFields.data;


    try{
        await signIn("credentials", {
            user_id,
            password,
            redirectTo : DEFAULT_LOGIN_REDIRECT
        })
    } catch(error){ 
       if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error : "Número de Credencial o contraseña incorrecta"}
                default:
                    return {error : "Error desconocido"}
            }
       } 
       throw error;
     }
}