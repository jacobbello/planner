import { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";

export default function TextInput(props: 
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
     & {inline?: boolean}) {
    const i = <input className={"p-2 border border-gray-100 mb-1" 
        + (props.inline ? "" : " w-full")} {...{
        type: "text", ...props
    }} />

    return props.inline ? i : <div>{i}</div>
}