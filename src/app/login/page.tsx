'use client'

import {createClient} from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import {homePageRoute} from "@/utils/routing/route-names";

export default function LoginPage() {

    async function loginUser() {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'dhavalshah@gofynd.com',
            password: 'Abc@123#'
        })

        if (error) {
            console.error(error);
            return
        }

        if (data) {
            redirect(homePageRoute());
        }
    }

    return (
        <main>
            <button className={"bg-teal-400 text-black p-3 rounded-full cursor-pointer"}
                    onClick={loginUser}>
                Login User
            </button>
        </main>
    )
}
