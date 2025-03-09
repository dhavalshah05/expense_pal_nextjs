import CreateExpenseForm from "@/features/expenses/create/CreateExpenseForm";
const CreateExpensePage = async () => {
    return (
        <div className="bg-gray-900 flex items-center justify-center p-8 h-screen">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white">Add Expense</h2>
                            <p className="text-gray-400 mt-2">Track your spending</p>
                        </div>

                        {/*{isSubmitted && (
                            <div className="mb-6 p-3 bg-green-900/30 border border-green-800 text-green-400 rounded-md text-sm">
                                Expense added successfully!
                            </div>
                        )}*/}

                        <CreateExpenseForm categories={['First', 'Second']} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateExpensePage;
