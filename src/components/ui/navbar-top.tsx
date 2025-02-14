export default function NavbarTop({children}: {children: React.ReactNode}) {
    return (
        <nav className="bg-gray-800">
            {children}
        </nav>
    )
}