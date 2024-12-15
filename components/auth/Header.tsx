import Image from "next/image";

interface HeaderProps{
    label :string
}

export const Header = ({label} : HeaderProps) => {
    return(
        <div className="w-full flex flex-col gap-y-2 items-center justify-center">
            <Image src="/ctm.png" className="mx-auto" alt="Logo CTM" width={280} height={80} />
            <p className="text-muted-foreground text-lg">{label}</p>
        </div>
    )
}