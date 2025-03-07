'use client';

import React from "react";
import {deleteCookie, getCookie} from "@/features/shared/actions/cookie-actions";
import {showSuccessToast} from "@/utils/toast/custom-toast";

export default function RedirectToast() {

    React.useEffect(() => {
        const showToast = async () => {
            const toastMessage = await getCookie("toast")
            if (toastMessage && toastMessage !== '') {
                await deleteCookie("toast")
                showSuccessToast(toastMessage)
            }
        }

        showToast();
    }, []);

    return null;
}
