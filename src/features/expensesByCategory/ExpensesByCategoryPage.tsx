import {db} from "@/db";
import {categoriesTable, expenseAccountsTable, expensesTable} from "@/db/schema";
import {and, desc, eq} from "drizzle-orm";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import currencyUtils from "@/utils/currency/currency-utils";

export default async function ExpensesByCategoryPage(
    {
        categoryId
    }: {
        categoryId: string
    }
) {
    const userId = await getUserIdFromHeader();

    const categoryQueryResult = await db
        .select()
        .from(categoriesTable)
        .where(and(eq(categoriesTable.id, categoryId), eq(categoriesTable.userId, userId)));
    if (categoryQueryResult.length === 0) {
        return <p>Not a valid category</p>
    }

    const expensesQueryResult = await db
        .select({
            expenseId: expensesTable.id,
            amount: expensesTable.amount,
            description: expensesTable.description,
            expenseDate: expensesTable.expenseDate,
            accountName: expenseAccountsTable.name,
        })
        .from(expensesTable)
        .leftJoin(expenseAccountsTable, eq(expensesTable.accountId, expenseAccountsTable.id))
        .where(and(
            eq(expensesTable.categoryId, categoryId),
            eq(expensesTable.userId, userId)
        ))
        .orderBy(desc(expensesTable.expenseDate));

    if (expensesQueryResult.length === 0) {
        return <p>Expenses not found for category</p>;
    }

    const categoryName = categoryQueryResult.at(0)?.name || ''

    return (
        <section className={"bg-gray-200 p-4 rounded-lg"}>
            <h3 className={"text-sm text-gray-700"}>Expenses for {categoryName}</h3>
            <Table>
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
                    {expensesQueryResult.map(expense => (
                        <TableRow key={expense.expenseId}>
                            <TableCell className={"text-right"}>
                                {currencyUtils.formatCurrency(currencyUtils.fromPaisa(expense.amount))}
                            </TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.expenseDate.toLocaleDateString()}</TableCell>
                            <TableCell>{categoryName}</TableCell>
                            <TableCell>{expense.accountName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}
