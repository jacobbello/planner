export default function Navbar({children}: {children: React.ReactNode}) {
    return (
        <nav className="bg-gray-800 fixed w-full top-0 ">
            <div className="container mx-auto">
                {children}
            </div>
        </nav>
    )
}