import LoginForm from "@/components/auth/LoginForm";
import { handleLogin } from "../(auth)/actions";
import Link from "next/link";

export default function Page() {
    return <div className="my-40 table-cell align-middle">
        <LoginForm />
    </div>
}