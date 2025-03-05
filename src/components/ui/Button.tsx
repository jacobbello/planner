import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export default function SubmitButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return <button
        className={"table-cell text-white bg-blue-700 hover:bg-blue-600 p-2" + (props.className || "")}
        {...props} />
}