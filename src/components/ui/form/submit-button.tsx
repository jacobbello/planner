import { ReactNode } from "react";

export default function SubmitButton({ children }: { children: ReactNode }) {
    return <button type="submit" 
        className="size-full table-cell text-white bg-blue-700 hover:bg-blue-600 p-2">
        {children}
    </button>
}