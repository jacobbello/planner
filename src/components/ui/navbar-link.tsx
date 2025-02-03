import Link from "next/link";

export default function NavbarLink({children, href}: {children: React.ReactNode, href: string}) {
    return (
        <li>
            <Link href={href}>{children}</Link>
        </li>
    );
}