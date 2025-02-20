'use client'
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

// relace the close button with an x in the top right AI!
export default function Modal({ children }: { children: ReactNode }) {
    const router = useRouter();
    return <div className="fixed inset-0 bg-black 
    bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg">
            <button onClick={() => router.back()}>Close</button>
            {children}
        </div>
    </div>
}
