import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
    return <div className="fixed inset-0 bg-black 
    bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg">
            {children}
        </div>
    </div>
}