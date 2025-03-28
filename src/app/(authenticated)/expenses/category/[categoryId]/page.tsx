import ExpensesByCategoryPage from "@/features/expensesByCategory/ExpensesByCategoryPage";

export default async function ExpensesByCategoryPageWrapper(
    {
        params
    }: {
        params: Promise<{ categoryId: string }>
    }
) {
    const {categoryId} = await params;
    return <ExpensesByCategoryPage categoryId={categoryId} />;
}
