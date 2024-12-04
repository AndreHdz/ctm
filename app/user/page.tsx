import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";

const Page = () => {
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
                    <Image src="/user.png" className="mx-auto py-8" alt="User picture" width={100} height={120}/>
                    <p className="text-xl text-center font-bold uppercase pb-2">Chel Muñoz Erick Alejandro</p>
                    <p className="text-center font-bold uppercase ">HOTEL SECRETS VALLARTA BAY & DREAMS V</p>
                </div>
                <div>
                    <p className="text-center font-bold uppercase">Socio: Activo</p>
                    <p className="text-center font-bold uppercase">Tel: 322-383-1262</p>
                </div>
                <div className="py-8">
                    <QRCode value="0099641" className="w-[120px] h-[120px] mx-auto mb-2" />
                    <p className="text-sm text-center font-bold uppercase">0099641</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
