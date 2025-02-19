import LoginForm from "@/components/auth/login-form";
import Modal from "@/components/ui/modal";
import { useEffect } from "react";

export default function Page() {
    return <Modal>
        <p>In modal</p>
        <LoginForm />
    </Modal>
}