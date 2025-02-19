'use client'
import { useState } from "react";
import SubmitButton from "../ui/form/submit-button";
import TextInput from "../ui/form/text-input";
import SmallLink from "../ui/small-link";
import { handleSignup } from "@/app/(auth)/actions";
import FormError from "../ui/form/form-error";

export default function SignupForm() {
    const [password, setPassword] = useState({ first: "", second: "" });
    const matching = password.first === password.second;

    return <form action={handleSignup}>
        <TextInput name="username" placeholder="Enter a username" />
        <TextInput name="email" type="email" placeholder="Enter your email address" />
        <TextInput name="password" type="password" placeholder="Enter a password"
            onChange={e => setPassword({ first: e.target.value, second: password.second })}
        />
        {
            matching ? null :
            <FormError>Passwords must match</FormError>
        }
        <TextInput name="password" type="password" placeholder="Re-enter your password"
            onChange={e => setPassword({ first: password.first, second: e.target.value })}
        />
        <SmallLink href="/login">Already have an account? Sign In</SmallLink>
        <SubmitButton>Register</SubmitButton>
    </form>
}