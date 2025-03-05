import Link from "next/link";
import NavbarDropdown from "./navbar/NavbarDropdown";
import { inlineNavbarLinkStyles, verticalNavbarLinkStyles } from "./navbar/NavbarLink";
import { auth, signIn, signOut } from "@/auth";

export default async function UserDropdown() {
    const session = await auth();
    if (!session?.user?.id) {
        return <div className="inline float-right">
            <form action={async () => {
                "use server"
                await signIn();
            }}>
                <button type="submit" className={inlineNavbarLinkStyles}>Login</button>
            </form>
        </div>
    }

    return <NavbarDropdown content={session.user.id}>
        <Link className={verticalNavbarLinkStyles} href="/signup">Account</Link>
        <form action={async () => {
                "use server"
                await signOut();
            }}>
                <button type="submit" className={inlineNavbarLinkStyles}>Sign Out</button>
            </form>
    </NavbarDropdown>
}