"use server";

import {FormActionState} from "@/features/shared/form/form-action-state";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import {db} from "@/db";
import {expenseAccountsTable} from "@/db/schema";
import postgres from "postgres";

export async function createExpenseAccountAction(
    _previousState: unknown,
    formData: FormData,
): Promise<FormActionState> {
    const expenseAccountName = formData.get('name')?.toString();

    const fieldErrors: Record<string, string> = {}

    if (!expenseAccountName || expenseAccountName.length < 3) {
        fieldErrors['name'] = 'Please enter valid name';
    }

    if (Object.keys(fieldErrors).length > 0) {
        return { fieldErrors, formData, status: 'error' };
    }

    const userId = await getUserIdFromHeader();

    try {
        await db.insert(expenseAccountsTable).values({
            name: expenseAccountName || '',
            userId: userId
        })
    } catch (error: unknown) {
        let errorMessage = "Unknown server error";

        if (error instanceof postgres.PostgresError) {
            console.error(error);
            errorMessage = "Database error occurred";
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            status: 'error',
            message: errorMessage,
        }
    }

    return {
        status: 'success',
        message: 'Expense account created',
    }
}
