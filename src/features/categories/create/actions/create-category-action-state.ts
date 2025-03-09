export type CreateCategoryActionState = {
    fieldErrors?: Record<string, string>,
    formData?: FormData,
    status: 'idle' | 'error' | 'success',
    message?: string,
}
