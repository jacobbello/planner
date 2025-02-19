'use client'
import { ReactNode, useState } from "react";
import NavbarLink from "./navbar-link";

export default function NavbarDropdown({ content, children }:
    { content: ReactNode, children: ReactNode }) {
    const [expanded, setExpanded] = [true, (a: any) => a];//useState(false);

    return <div className="overflow-hidden inline float-right" onMouseEnter={() => setExpanded(true)}
     onMouseLeave={() => setExpanded(false)}>
        <NavbarLink onClick={() => setExpanded(!expanded)}>{content}</NavbarLink>
        <div hidden={!expanded} className="block absolute bg-gray-800 min-w-32">
            {expanded ? children : null}
        </div>
    </div>
}