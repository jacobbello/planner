import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (session?.user) {
        redirect("/dashboard");
    }

    return <div className="my-40 table-cell align-middle">
        <LoginForm />
    </div>
}