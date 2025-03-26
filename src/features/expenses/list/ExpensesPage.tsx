import {db} from "@/db";
import {categoriesTable, expenseAccountsTable, expensesTable} from "@/db/schema";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import {desc, eq} from "drizzle-orm";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import currencyUtils from "@/utils/currency/currency-utils";
import Link from "next/link";
import {createExpensePageRoute} from "@/utils/routing/route-names";

export default async function ExpensesPage() {
    const userId = await getUserIdFromHeader();
    const expenses = await db
        .select({
            id: expensesTable.id,
            amount: expensesTable.amount,
            expenseDate: expensesTable.expenseDate,
            description: expensesTable.description,
            categoryId: expensesTable.categoryId,
            categoryName: categoriesTable.name,
            accountId: expensesTable.accountId,
            accountName: expenseAccountsTable.name,
            userId: expensesTable.userId,
            isShared: expensesTable.isShared,
        })
        .from(expensesTable)
        .innerJoin(categoriesTable, eq(categoriesTable.id, expensesTable.categoryId))
        .innerJoin(expenseAccountsTable, eq(expenseAccountsTable.id, expensesTable.accountId))
        .where(eq(expensesTable.userId, userId))
        .orderBy(desc(expensesTable.expenseDate))

    return (
        <>
            <div>
                <Link href={createExpensePageRoute()}>Add Expense</Link>
            </div>
            <Table>
                <TableCaption>Expenses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className={"text-right"}>Amount</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Account</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map(expense => {
                        return (<TableRow key={expense.id}>
                            <TableCell className={`text-right relative ${expense.isShared ? 'bg-gray-100' : ''}`}>
                                { expense.isShared && (
                                    <div className={"h-full w-1 bg-gray-500 absolute left-0 top-0"}/>
                                )}
                                {currencyUtils.formatCurrency(currencyUtils.fromPaisa(expense.amount))}
                            </TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.expenseDate.toLocaleDateString()}</TableCell>
                            <TableCell>{expense.categoryName}</TableCell>
                            <TableCell>{expense.accountName}</TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>

        </>
    )
}
