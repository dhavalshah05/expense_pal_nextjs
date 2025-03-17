'use server';
import {
    CreateExpenseActionState,
    createExpenseFormSchema
} from "@/features/expenses/create/actions/create-expense-action-state";
import {db} from "@/db";
import {expensesTable} from "@/db/schema";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import currencyUtils from "@/utils/currency/currency-utils";

export default async function createExpenseAction(previousState: unknown, formData: FormData): Promise<CreateExpenseActionState> {
    const rawData = {
        amount: formData.get('amount')?.toString() || '',
        date: formData.get('date')?.toString() || '',
        categoryId: formData.get('category')?.toString() || '',
        accountId: formData.get('account')?.toString() || '',
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
        amount: currencyUtils.toPaisa(result.data.amount),
        expenseDate: result.data.date,
        description: result.data.description,
        categoryId: result.data.categoryId,
        accountId: result.data.accountId,
        userId: userId
    })

    return {
        status: 'success',
        message: 'Expense created',
    }
}
