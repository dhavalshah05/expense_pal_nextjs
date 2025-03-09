import {z} from 'zod';

export type CreateExpenseActionState = {
    fieldErrors?: Record<string, string[]>,
    formData?: FormData,
    status: 'idle' | 'error' | 'success',
    message?: string,
}

export const createExpenseFormSchema = z.object({
    amount: z
        .string()
        .min(1, { message: "Amount is required" })
        .refine(
            (val) => !isNaN(Number(val)),
            { message: "Amount must be a valid number" }
        )
        .refine(
            (val) => Number(val) >= 0,
            { message: "Amount cannot be negative" }
        )
        .refine(
            (val) => {
                const decimalPart = val.toString().split('.')[1];
                return !decimalPart || decimalPart.length <= 2;
            },
            { message: "Amount cannot have more than 2 decimal places" }
        )
        .transform((val) => parseFloat(parseFloat(val).toFixed(2))), // Ensure 2 decimal places

    date: z
        .string()
        .min(1, { message: "Date is required" })
        .refine(
            (val) => !isNaN(new Date(val).getTime()),
            { message: "Please enter a valid date" }
        )
        .transform((val) => new Date(val)),

    categoryId: z
        .string()
        .min(1, { message: "Category is required" }),

    description: z
        .string()
        .optional()
        .transform((val) => val || "")
})
