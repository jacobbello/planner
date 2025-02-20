'use client'
import { ReactNode } from "react";

// Add a close button to Modal that calls router.back on click (no state needed) AI!
export default function Modal({ children }: { children: ReactNode }) {
    return <div className="fixed inset-0 bg-black 
    bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg">
            <div className=""></div>
            {children}
        </div>
    </div>
}