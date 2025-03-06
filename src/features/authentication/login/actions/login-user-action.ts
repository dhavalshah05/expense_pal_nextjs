'use server'

import {LoginUserActionState} from "@/features/authentication/login/actions/login-user-action-state";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {homePageRoute} from "@/utils/routing/route-names";

export default async function loginUserAction(
    previousState: unknown,
    formData: FormData,
): Promise<LoginUserActionState> {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    const fieldErrors: Record<string, string> = {}

    if (!email || email.length < 1) {
        fieldErrors['email'] = 'Please enter valid email';
    }

    if (!password || password.length < 1) {
        fieldErrors['password'] = 'Please enter valid password';
    }

    if (Object.keys(fieldErrors).length > 0) {
        return { fieldErrors, formData, status: 'error' };
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email || '',
        password: password || ''
    })

    if (error) {
        console.error(error.message);
        return { formData, status: 'error', message: error.message };
    }

    if (data) {
        redirect(homePageRoute());
    }

    return { status: 'success' };
}
