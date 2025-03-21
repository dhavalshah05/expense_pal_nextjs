import Link from "next/link";
import {categoriesPageRoute, expensesPageRoute} from "@/utils/routing/route-names";
import currencyUtils from "@/utils/currency/currency-utils";
import {db} from "@/db";
import {eq, sum} from "drizzle-orm";
import {expensesTable} from "@/db/schema";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";

export default async function DashboardPage() {
    const userId = await getUserIdFromHeader();

    return (
        <div className={"p-4"}>
            <p>
                <Link href={expensesPageRoute()}>Expenses</Link>
            </p>
            <p>
                <Link href={categoriesPageRoute()}>Categories</Link>
            </p>

            <TotalExpenseCard userId={userId} />
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
