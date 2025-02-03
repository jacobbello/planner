import Link from "next/link";

export default function NavbarLink({children, href}: {children: React.ReactNode, href: string}) {
    return (
        <li className="inline-block px-5 py-3 text-white hover:bg-gray-700">
            <Link href={href}>{children}</Link>
        </li>
    );
}