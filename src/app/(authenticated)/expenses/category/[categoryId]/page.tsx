import ExpensesByCategoryPage from "@/features/expensesByCategory/ExpensesByCategoryPage";

export default async function ExpensesByCategoryPageWrapper(
    {
        params
    }: {
        params: {
            categoryId: string
        }
    }
) {
    return <ExpensesByCategoryPage categoryId={params.categoryId} />;
}
