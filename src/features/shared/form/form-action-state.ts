export type FormActionState = {
    fieldErrors?: Record<string, string>,
    formData?: FormData,
    status: 'idle' | 'error' | 'success',
    message?: string,
}

export const EMPTY_FORM_ACTION_STATE: FormActionState = {
    status: 'idle',
}
