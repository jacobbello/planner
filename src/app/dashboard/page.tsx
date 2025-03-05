import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    return (
        <div></div>
    );
}