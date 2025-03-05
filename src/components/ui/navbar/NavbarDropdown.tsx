"use client"
import { ReactNode } from "react";
import NavbarLink from "./NavbarLink";

export default function NavbarDropdown({ content, children }:
    { content: ReactNode, children: ReactNode }) {

    return <div className="overflow-hidden inline float-right group">
        <NavbarLink>{content}</NavbarLink>
        <div className="block absolute bg-gray-800 min-w-32 invisible group-hover:visible">
            {children}
        </div>
    </div>
}