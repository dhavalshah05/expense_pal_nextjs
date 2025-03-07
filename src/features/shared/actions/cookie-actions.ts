'use server';

import {cookies} from "next/headers";

export async function setCookie(name: string, value: string) {
    const cookieStore = await cookies();
    cookieStore.set(name, value)
}

export async function deleteCookie(name: string) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
}

export async function getCookie(name: string) {
    const cookieStore = await cookies();
    const storedValue = cookieStore.get(name);

    if (!storedValue) {
        return null;
    }

    return storedValue.value;
}
