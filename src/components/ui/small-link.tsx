import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export default function SmallLink(props: { children: ReactNode } & LinkProps) {
    return <Link className="text-sm text-blue-700 hover:underline" {...props}>
        {props.children}
    </Link>
}