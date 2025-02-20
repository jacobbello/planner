'use client'
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

// relace the close button with an x in the top right AI!
export default function Modal({ children }: { children: ReactNode }) {
    const router = useRouter();
    return <div className="fixed inset-0 bg-black 
    bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg relative">
            <button onClick={() => router.back()} className=" float-right block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            {children}
        </div>
    </div>
}
