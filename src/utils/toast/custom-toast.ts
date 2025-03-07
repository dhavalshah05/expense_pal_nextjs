import {toast, ToastOptions} from "react-toastify";

const toastConfig: ToastOptions = {
    theme: 'colored',
    type: 'info',
    hideProgressBar: true,
}

export function showSuccessToast(message: string) {
    toast(message, {
        ...toastConfig,
        type: 'success',
    })
}
