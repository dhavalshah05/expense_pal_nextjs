'use server';

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {loginPageRoute} from "@/utils/routing/route-names";

export default async function logoutUserAction() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error(error);
        throw error;
    }

    redirect(loginPageRoute());
}
