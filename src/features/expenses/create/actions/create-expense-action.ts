'use server';
import {
    CreateExpenseActionState,
    createExpenseFormSchema
} from "@/features/expenses/create/actions/create-expense-action-state";
import {db} from "@/db";
import {expensesTable} from "@/db/schema";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import {toPaisa} from "@/utils/currency/currency-util";

export default async function createExpenseAction(previousState: unknown, formData: FormData): Promise<CreateExpenseActionState> {
    const rawData = {
        amount: formData.get('amount')?.toString() || '',
        date: formData.get('date')?.toString() || '',
        categoryId: formData.get('category')?.toString() || '',
        description: formData.get('description')?.toString() || ''
    };

    const result = await createExpenseFormSchema.safeParseAsync(rawData);
    if (!result.success) {
        return {
            status: 'error',
            fieldErrors: result.error.flatten().fieldErrors,
            formData: formData,
        }
    }

    const userId = await getUserIdFromHeader();

    await db.insert(expensesTable).values({
        amount: toPaisa(result.data.amount),
        expenseDate: result.data.date,
        description: result.data.description,
        categoryId: result.data.categoryId,
        userId: userId
    })

    return {
        status: 'success',
        message: 'Expense created',
    }
}
