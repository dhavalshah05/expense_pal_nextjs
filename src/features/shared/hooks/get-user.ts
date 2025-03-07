import {createClient} from "@/utils/supabase/server";

export default async function getUser(): Promise<{
    userEmail: string
}> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('No User Found');
    }

    const userEmail = user.email || ''

    return {
        userEmail
    };
}
