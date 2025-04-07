import {db} from "@/db";
import {bucketsTable, categoriesTable, expenseAccountsTable, expensesTable} from "@/db/schema";
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
import ClipboardIcon from "@/features/shared/components/clipboardIcon/ClipboardIcon";

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
            bucketId: bucketsTable.id,
            bucketName: bucketsTable.name,
        })
        .from(expensesTable)
        .innerJoin(categoriesTable, eq(categoriesTable.id, expensesTable.categoryId))
        .innerJoin(expenseAccountsTable, eq(expenseAccountsTable.id, expensesTable.accountId))
        .leftJoin(bucketsTable, eq(bucketsTable.id, expensesTable.bucketId))
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
                        <TableHead></TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Bucket</TableHead>
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
                            <TableCell>
                                <ClipboardIcon textContent={expense.description} date={expense.expenseDate} />
                            </TableCell>
                            <TableCell>{expense.expenseDate.toLocaleDateString()}</TableCell>
                            <TableCell>{expense.bucketName}</TableCell>
                            <TableCell>{expense.categoryName}</TableCell>
                            <TableCell>{expense.accountName}</TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>

        </>
    )
}
