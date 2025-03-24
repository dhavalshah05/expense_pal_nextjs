import Link from "next/link";
import {categoriesPageRoute, expensesPageRoute} from "@/utils/routing/route-names";
import currencyUtils from "@/utils/currency/currency-utils";
import {db} from "@/db";
import {desc, eq, sum} from "drizzle-orm";
import {categoriesTable, expenseAccountsTable, expensesTable} from "@/db/schema";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import CategoryDashboardSummaryRow from "@/features/dashboard/CategoryDashboardSummaryRow";

export default async function DashboardPage() {
    const userId = await getUserIdFromHeader();

    return (
        <div className={"p-4 overflow-y-auto"}>
            <p>
                <Link href={expensesPageRoute()}>Expenses</Link>
            </p>
            <p>
                <Link href={categoriesPageRoute()}>Categories</Link>
            </p>

            <section className={"flex flex-col gap-4"}>
                <TotalExpenseCard userId={userId} />
                <SummaryByCategoryCard userId={userId} />
                <SummaryByAccountCard userId={userId} />
            </section>
        </div>
    );
}

async function TotalExpenseCard(
    {
        userId,
    }: {
        userId: string
    }
) {
    const totalResult = await db.select({
        total: sum(expensesTable.amount)
    })
        .from(expensesTable)
        .where(eq(expensesTable.userId, userId));

    const totalAmount = totalResult.at(0)?.total || '0'
    const total = currencyUtils.formatCurrency(currencyUtils.fromPaisa(Number(totalAmount)))

    return (
        <section className={"bg-gray-200 p-4 rounded-lg"}>
            <h3 className={"text-sm text-gray-700"}>Total Expense (March)</h3>
            <p className={"text-2xl text-gray-900 font-bold mt-2"}>{total}</p>
        </section>
    )
}

async function SummaryByCategoryCard(
    {
        userId,
    }: {
        userId: string
    }
) {
    const results = await db.select({
        categoryId: categoriesTable.id,
        categoryName: categoriesTable.name,
        amount: sum(expensesTable.amount),
    })
        .from(expensesTable)
        .innerJoin(categoriesTable, eq(expensesTable.categoryId, categoriesTable.id))
        .where(eq(expensesTable.userId, userId))
        .orderBy(desc(sum(expensesTable.amount)))
        .groupBy(categoriesTable.id, categoriesTable.name);

    const summaryResult = results.map((item) => {
        return {
            id: item.categoryId,
            name: item.categoryName,
            amount: currencyUtils.formatCurrency(currencyUtils.fromPaisa(Number(item.amount)))
        }
    })

    return (
        <section className={"bg-gray-200 p-4 rounded-lg"}>
            <h3 className={"text-sm text-gray-700"}>Summary by category</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className={"text-right"}>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {summaryResult.map(result => (
                        <CategoryDashboardSummaryRow key={result.id} id={result.id} name={result.name} amount={result.amount} />
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}

async function SummaryByAccountCard(
    {
        userId,
    }: {
        userId: string
    }
) {
    const results = await db.select({
        accountId: expenseAccountsTable.id,
        accountName: expenseAccountsTable.name,
        amount: sum(expensesTable.amount),
    })
        .from(expensesTable)
        .innerJoin(expenseAccountsTable, eq(expensesTable.accountId, expenseAccountsTable.id))
        .where(eq(expensesTable.userId, userId))
        .orderBy(desc(sum(expensesTable.amount)))
        .groupBy(expenseAccountsTable.id, expenseAccountsTable.name);

    const summaryResult = results.map((item) => {
        return {
            id: item.accountId,
            name: item.accountName,
            amount: currencyUtils.formatCurrency(currencyUtils.fromPaisa(Number(item.amount)))
        }
    })

    return (
        <section className={"bg-gray-200 p-4 rounded-lg"}>
            <h3 className={"text-sm text-gray-700"}>Summary by account</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className={"text-right"}>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {summaryResult.map(result => (
                        <TableRow key={result.id}>
                            <TableCell>{result.name}</TableCell>
                            <TableCell className={"text-right text-gray-900 font-bold"}>{result.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}
