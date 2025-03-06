export type LoginUserActionState = {
    fieldErrors?: Record<string, string>,
    formData?: FormData,
    status: 'idle' | 'error' | 'success',
    message?: string,
}
