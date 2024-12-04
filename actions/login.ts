"use server"

import * as z from "zod";
import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const  login = async (values: z.infer<typeof LoginSchema>) => {

    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success){
        return { error : "Invalid Fields"}
    }

    const {user_id, password} = validateFields.data;

    const user = await db.user.findUnique({
        where : {
            id : parseInt(user_id)
        }
    })

    if(!user){
        return {error : "Credencial o contraseña incorrecta"}
    }

    if(!user.is_registered){
        return {error : "Aún no te has registrado"}
    }

    const match = await bcrypt.compare(password, user.password || "");

    if(!match){
        return {error : "Credencial o contraseña incorrecta"}
    }


    redirect("/user");


    return {success : "Login correcto"}
}