'use client'

import {createClient} from "@/utils/supabase/client";

export default function RegisterPage() {
    async function registerUser() {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
            email: 'dhavalshah@gofynd.com',
            password: 'Abc@123#'
        })

        if (error) {
            console.error(error);
            return
        }

        if (data) {
            console.log(data.user);
        }
    }

    return (
        <main>
            <button className={"bg-teal-400 text-black p-3 rounded-full cursor-pointer"}
            onClick={registerUser}>
                Register User
            </button>
        </main>
    )
}
