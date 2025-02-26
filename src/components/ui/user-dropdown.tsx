import Link from "next/link";
import NavbarDropdown from "./navbar/navbar-dropdown";
import { inlineNavbarLinkStyles, verticalNavbarLinkStyles } from "./navbar/navbar-link";
import { auth, signIn, signOut } from "@/auth";

export default async function UserDropdown() {
    const session = await auth();
    if (!session) {
        return <div className="inline float-right">
            <form action={async () => {
                "use server"
                await signIn();
            }}>
                <button type="submit" className={inlineNavbarLinkStyles}>Login</button>
            </form>
        </div>
    }

    return <NavbarDropdown content="Settings">
        <Link className={verticalNavbarLinkStyles} href="/signup">Account</Link>
        <form action={async () => {
                "use server"
                await signOut();
            }}>
                <button type="submit" className={inlineNavbarLinkStyles}>Sign Out</button>
            </form>
    </NavbarDropdown>
}