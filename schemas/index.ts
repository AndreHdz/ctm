import * as z from "zod";


export const LoginSchema = z.object({
    user_id: z.string().min(1, {message: "Ingresa tu número de credencial"}),
    password: z.string().min(6, {
        message: "Ingresa tu contraseña"
    })
})

export const RegisterSchema = z.object({
    user_id: z.string().min(1, {message: "Ingresa tu número de credencial"}),
    curp : z.string(),
    phone: z.string()
    .min(10, { message: "Ingresa un número de teléfono válido" })
    .max(10, { message: "Ingresa un número de teléfono válido" })
    .regex(/^\d{10}$/, { message: "El número de teléfono debe ser válido (10 dígitos)" }),
    password: z.string().min(6, {
        message: "La contraseña debe ser de 6 digitos"
    })
})