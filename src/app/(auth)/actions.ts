'use server'
import { zfd } from "zod-form-data"


const loginSchema = zfd.formData({
    username: zfd.text(),
    password: zfd.text()
})
export async function handleLogin(data: FormData) {

}

export async function handleSignup(data: FormData) {

}