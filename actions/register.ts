"use server"
import bcrypt from "bcrypt";
import {db} from "@/lib/db";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const  register = async (values: z.infer<typeof RegisterSchema>) => {

    const validateFields = RegisterSchema.safeParse(values);

    if(!validateFields.success){
        return { error : "Invalid Fields"}
    }

    const {user_id, curp, phone, password} = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.findUnique({
        where : {
            id : parseInt(user_id)
        }
    })

    if(!user){
        return {error : "Número de credencial no encontrado"}
    }

    if(user.is_registered){
        return {error : "Ya se ha registrado"}
    }  

    if(!user.curp){
        return {error : "No se ha registrado un CURP, contacta al administrador"}
    }

    if(user.curp !== curp){
        return {error : "CURP incorrecto"}
    }

    await db.user.update({
        data : {
            is_registered : true,
            phone,
            password : hashedPassword
        },
        where : {
            id : parseInt(user_id)
        }
    })


    return {success : "Te has registrado correctamente"}
}