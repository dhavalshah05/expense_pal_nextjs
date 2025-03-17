import CreateExpenseForm from "@/features/expenses/create/CreateExpenseForm";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import {db} from "@/db";
import {categoriesTable} from "@/db/schema";
import {eq} from "drizzle-orm";
const CreateExpensePage = async () => {
    const userId = await getUserIdFromHeader();
    const categories = await db.select().from(categoriesTable).where(eq(categoriesTable.userId, userId));

    return (
        <div className="bg-gray-900 flex items-center justify-center p-8 h-max">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white">Add Expense</h2>
                            <p className="text-gray-400 mt-2">Track your spending</p>
                        </div>

                        <CreateExpenseForm categories={categories} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateExpensePage;
