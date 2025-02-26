'use client'
import SubmitButton from "../ui/form/submit-button";
import TextInput from "../ui/form/text-input";
import { handleLogin } from "@/app/(auth)/actions";
import SmallLink, { smallLinkStyles } from "../ui/small-link";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginForm({ modal }: { modal?: boolean }) {
    const linkProps = {
        children: "Don't have an account? Sign up",
        href: "/signup",
        className: smallLinkStyles,
    }

    const credentialsAction = (formData: any) => {
        signIn("credentials", formData);
    }

    return <form className="" action={credentialsAction}>
        <div>
            <TextInput name="username" placeholder="Username" />
        </div>
        <div>
            <TextInput type="password" name="password" placeholder="Password" />
        </div>
        {   // Prevent modal from staying open when leaving
            modal ? <a {...linkProps} /> : <Link {...linkProps} />
        }
        <div className="float-right w-full"><SubmitButton>Login</SubmitButton></div>
    </form>
}