'use server'

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {RegisterUserActionState} from "@/features/authentication/register/actions/register-user-action-state";
import {loginPageRoute} from "@/utils/routing/route-names";

export default async function registerUserAction(
    previousState: unknown,
    formData: FormData,
): Promise<RegisterUserActionState> {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();

    const fieldErrors: Record<string, string> = {}

    if (!email || email.length < 1) {
        fieldErrors['email'] = 'Please enter valid email';
    }

    if (!password || password.length < 1) {
        fieldErrors['password'] = 'Please enter valid password';
    }

    if (!confirmPassword || confirmPassword.length < 1) {
        fieldErrors['confirmPassword'] = 'Please enter valid password';
    }

    if (password !== confirmPassword) {
        fieldErrors['confirmPassword'] = 'Passwords do not match';
    }

    if (Object.keys(fieldErrors).length > 0) {
        return { fieldErrors, formData, status: 'error' };
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
        email: email || '',
        password: password || ''
    })

    if (error) {
        console.error(error.message);
        return { formData, status: 'error', message: error.message };
    }

    if (data) {
        redirect(loginPageRoute());
    }

    return { status: 'success' };
}
