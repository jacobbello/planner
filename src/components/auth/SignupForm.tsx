'use client'
import { useActionState, useState } from "react";
import SubmitButton from "../ui/form/SubmitButton";
import TextInput from "../ui/form/TextInput";
import SmallLink from "../ui/SmallLink";
import { handleSignup } from "@/app/(auth)/actions";
import FormError from "../ui/form/FormError";

export default function SignupForm() {
    const [password, setPassword] = useState({ first: "", second: "" });
    const [state, formAction, pending] = useActionState(handleSignup, {})
    const matching = password.first === password.second;


    return <form action={formAction}>
        <FormError text={state.errors?.email}/>
        <TextInput name="email" type="email" placeholder="Enter your email address" />
        <FormError text={state.errors?.password}/>
        <TextInput name="password" type="password" placeholder="Enter a password" value={password.first}
            onChange={e => setPassword({ first: e.target.value, second: password.second })}
        />
        <FormError text={matching ? "" : "Passwords must match"}/>
        <TextInput name="passwordMatch" type="password" placeholder="Re-enter your password" value={password.second}
            onChange={e => setPassword({ first: password.first, second: e.target.value })}
        />
        <SmallLink href="/login">Already have an account? Sign In</SmallLink>
        <SubmitButton disabled={pending}>Register</SubmitButton>
    </form>
}