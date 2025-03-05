import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function TextInput(props: 
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
     & {inline?: boolean}) {
    const isInline = !!props?.inline;
    if (props.inline !== undefined) {
        const {inline, ...newProps} = props;
        props = newProps;
    }
    const i = <input className={"p-2 border border-gray-100 mb-1" 
        + (isInline ? "" : " w-full") + " " + props.className} {...{
        type: "text", ...props
    }} />

    return isInline ? i : <div>{i}</div>
}