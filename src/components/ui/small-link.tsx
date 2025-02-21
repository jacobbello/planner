import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export const smallLinkStyles = "text-sm text-blue-700 hover:underline";

export default function SmallLink(props: { children: ReactNode } & LinkProps) {
    return <Link className={smallLinkStyles} {...props}>
        {props.children}
    </Link>
}