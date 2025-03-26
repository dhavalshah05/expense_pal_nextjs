'use server';
import {
    CreateExpenseActionState,
    createExpenseFormSchema
} from "@/features/expenses/create/actions/create-expense-action-state";
import {db} from "@/db";
import {expensesTable, sharedExpensesTable} from "@/db/schema";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import currencyUtils from "@/utils/currency/currency-utils";
import {revalidatePath} from "next/cache";
import {expensesPageRoute} from "@/utils/routing/route-names";

export default async function createExpenseAction(previousState: unknown, formData: FormData): Promise<CreateExpenseActionState> {
    let isSharedExpense = false
    if (formData.get('isSharedExpense')?.toString() === 'on') {
        isSharedExpense = true
    }

    const rawData = {
        amount: formData.get('amount')?.toString() || '',
        date: formData.get('date')?.toString() || '',
        categoryId: formData.get('category')?.toString() || '',
        accountId: formData.get('account')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        isSharedExpense: isSharedExpense,
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

    const addedExpense = await db.insert(expensesTable).values({
        amount: currencyUtils.toPaisa(result.data.amount),
        expenseDate: result.data.date,
        description: result.data.description,
        categoryId: result.data.categoryId,
        accountId: result.data.accountId,
        userId: userId
    }).returning()

    if (addedExpense.at(0) !== undefined && result.data.isSharedExpense) {
        await db.insert(sharedExpensesTable).values({
            expenseId: addedExpense.at(0)!.id
        })
    }

    revalidatePath(expensesPageRoute())
    return {
        status: 'success',
        message: 'Expense created',
    }
}
