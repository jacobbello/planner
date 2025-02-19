import SubmitButton from "../ui/form/submit-button";
import TextInput from "../ui/form/text-input";
import { handleLogin } from "@/app/(auth)/actions";
import SmallLink from "../ui/small-link";

export default function LoginForm() {

    return <form className="" action={handleLogin}>
        <div>
            <TextInput name="username" placeholder="Username" />
        </div>
        <div>
            <TextInput type="password" name="password" placeholder="Password" />
        </div>
        <SmallLink href="/signup">Don't have an account? Sign up</SmallLink>
        <div className="float-right w-full"><SubmitButton>Login</SubmitButton></div>
    </form>
}