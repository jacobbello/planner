import { ReactNode } from "react";

export default function FormError({ text }: { text: string | string[] | undefined }) {
    const fullText = 
    
    return ((typeof text === "string" && text.length > 0)) ? 
    <span className = "text-sm text-red-700" >
        { fullText }
    </span > : <></>;
}