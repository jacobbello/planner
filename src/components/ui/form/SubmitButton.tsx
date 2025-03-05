import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export default function SubmitButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return <button type="submit"
        className="size-full table-cell text-white bg-blue-700 hover:bg-blue-600 p-2"
        {...props} />
}