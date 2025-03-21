import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

export const navbarLinkStyles = "cursor-pointer text-white bg-gray-800 hover:bg-gray-700 px-3 py-3";
export const inlineNavbarLinkStyles = navbarLinkStyles + " inline-block";
export const verticalNavbarLinkStyles = navbarLinkStyles + " block text-left w-full";

export function NavbarLinks({ links }: { links: { name: string, href: string }[] }) {
    return <>
        {
            links.map(({ name, href }, i) =>
                <Link key={i} className={inlineNavbarLinkStyles} href={href}>
                    {name}
                </Link>
            )
        }
    </>
}

export default function NavbarLink(props: AnchorHTMLAttributes<HTMLAnchorElement>
    & { inline?: boolean }) {
    return <a className={
        props.inline ? inlineNavbarLinkStyles : verticalNavbarLinkStyles} {...props}
    />

}

