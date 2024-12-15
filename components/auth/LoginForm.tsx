"use client"
import * as z from "zod"
import { useState, useTransition } from "react"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { CardWrapper } from './CardWrapper'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { REGEXP_ONLY_DIGITS} from "input-otp"
import { FormError } from "../formError"
import { FormSucces } from "../formSuccess"
import { login } from "@/actions/login"

const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();

    const form = useForm <z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues: {
            user_id : "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")


        startTransition(() => {
            login(values)
            .then((data) => {
                if(data){
                    setError(data.error)
                    // setSuccess(data.success)
                }
            })
        })
    }



  return (
    <CardWrapper
        headerLabel="Bienvenido de nuevo!"
        backButtonLabel="¿No te has registrado aún?"
        backButtonHref="/register"
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="user_id"
                        render={({field}) => (

                            <FormItem>
                                <FormLabel>Número de credencial</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="0012345678"
                                        type="number"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <InputOTP inputMode="numeric" maxLength={6} type="pin" value={field.value} onChange={field.onChange} disabled={isPending}  pattern={REGEXP_ONLY_DIGITS}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} >
                                                {field.value[0] ? null : "*"}
                                            </InputOTPSlot>
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error} />
                <FormSucces message={success} />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    Iniciar Sesión
                </Button>
            </form>
        </Form>

    </CardWrapper>
  )
}

export default LoginForm