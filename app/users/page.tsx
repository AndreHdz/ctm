import Image from "next/image";
import React from "react";
import {auth ,signOut} from "@/auth";



const Page = async () => {


    const session = await auth();

    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-[400px] px-4 mt-3">
                <div className="flex gap-4 items-center">
                    <Image src="/logo-ctm.png" alt="Logo CTM" width={90} height={90}/>
                    <p className="font-bold">
                        Sindicato Nacional de Trabajadores en la Industria
                        Alimenticia, Gastrohotelera y Servicios generales, CTM{" "}
                    </p>
                </div>
                <div className="pb-8">
                    <Image src="/avatar_placeholder.jpg" className="mx-auto py-8 rounded-md" alt="User picture" width={120} height={160}/>
                    <p className="text-xl text-center font-bold uppercase pb-2">{session?.user?.name}</p>
                    <p className="text-center font-bold uppercase ">{session?.user?.working_company}</p>
                </div>
                <div>
                    <p className="text-center font-bold uppercase">Socio: {session?.user?.status}</p>
                    <p className="text-center font-bold uppercase">Tel: {session?.user?.phone}</p>
                </div>
                <div className="py-8">
                    <p className="barcode text-5xl text-center">{`*${session?.user?.id}*`}</p>
                    <p className="text-sm text-center font-bold uppercase">{session?.user?.id}</p>
                </div>
                <div className="flex justify-center">

                <form action={async () => {
                    "use server";
                    await signOut({ redirectTo: '/', redirect:true });

                }}>
                    <button type="submit" className="">
                        Cerrar Sesión
                    </button>
                </form>
                </div>
            </div>

        </div>
    );
};

export default Page;
