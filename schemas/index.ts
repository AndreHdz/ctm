import * as z from "zod";


export const LoginSchema = z.object({
    user_id: z.string().min(1, {message: "Ingresa tu número de credencial"}),
    password: z.string().min(1, {
        message: "Ingresa tu contraseña"
    })
})

export const RegisterSchema = z.object({
    user_id: z.string().min(1, {message: "Ingresa tu número de credencial"}),
    curp : z.string(),
    password: z.string().min(6, {
        message: "La contraseña debe ser de 6 digitos"
    })
})