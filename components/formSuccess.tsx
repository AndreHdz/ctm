import { CheckCircleIcon } from "lucide-react";

interface FormSuccesProps{
    message? : string
};

export const FormSucces = ({message}: FormSuccesProps) => {
    if(!message) return null
    return(
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircleIcon  className="w-4 h-4"/>
            <p>{message}</p>
        </div>
    )
}