import { ReactNode } from "react";

export default function FormError({children}: {children: ReactNode}) {
    return <span className="text-sm text-red-700">
        {children}
    </span>
}