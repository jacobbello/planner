import Link from "next/link";
import NavbarDropdown from "./navbar/NavbarDropdown";
import { inlineNavbarLinkStyles, verticalNavbarLinkStyles } from "./navbar/NavbarLink";
import { auth, signIn, signOut } from "@/auth";

export default async function UserDropdown() {
    const session = await auth();
    if (!session?.user?.email) {
        return <div className="inline float-right">
            <form action={async () => {
                "use server"
                await signIn();
            }}>
                <button type="submit" className={verticalNavbarLinkStyles}>Login</button>
            </form>
        </div>
    }

    return <NavbarDropdown content={session.user.email}>
        <Link className={verticalNavbarLinkStyles} href="/dashboard">Account</Link>
        <form action={async () => {
                "use server"
                await signOut();
            }}>
                <button type="submit" className={verticalNavbarLinkStyles}>Sign Out</button>
            </form>
    </NavbarDropdown>
}