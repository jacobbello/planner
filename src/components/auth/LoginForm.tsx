'use client'
import SubmitButton from "../ui/form/SubmitButton";
import TextInput from "../ui/form/TextInput";
import { smallLinkStyles } from "../ui/SmallLink";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useActionState } from "react";
import FormError from "../ui/form/FormError";
import { useRouter } from "next/navigation";

const linkProps = {
    children: "Don't have an account? Sign up",
    href: "/signup",
    className: smallLinkStyles,
}

interface CredentialsActionState {
    success?: boolean,
    error?: string
}

export default function LoginForm() {   
    const router = useRouter();
    //const page = router.
    const credentialsAction = async (prev: CredentialsActionState, formData: FormData) => {
        try {
            const res = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
            });
            if (res?.ok) {
                router.back();
            }
            return { success: res?.ok || false, error: res?.code || res?.error };
        } catch (e: any) {
            console.log("Error signing in: " + e);
            return { success: false, error: e.message } as CredentialsActionState
        }
    }
    const [state, formAction, pending] = useActionState(
        credentialsAction, {});

    return <form className="" action={formAction}>
        <FormError text={state.error} />
        <div>
            <TextInput name="email" placeholder="Email Address" />
        </div>
        <div>
            <TextInput type="password" name="password" placeholder="Password" />
        </div>
        <Link {...linkProps} />
        <div className="float-right w-full"><SubmitButton disabled={pending}>Login</SubmitButton></div>
    </form>
}