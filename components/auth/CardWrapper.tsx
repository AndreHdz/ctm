"use client"

import { Card,
    CardContent,
    CardFooter,
    CardHeader
 } from "../ui/card";
import { BackButton } from "./BackButon";
import { Header } from "./Header";

interface CardWrapperProps{
    children : React.ReactNode;
    headerLabel : string;
    backButtonLabel : string;
    backButtonHref :string;
    showSocial? : boolean
};



export const CardWrapper = ({children, headerLabel, backButtonLabel, backButtonHref } : CardWrapperProps) => {
    return(
        <Card className="bg-slate-50 w-[400px] p-6 shadow-md">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />

            </CardFooter>
        </Card>
    )
}