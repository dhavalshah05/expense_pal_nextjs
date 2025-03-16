import CreateExpenseAccountForm from "@/features/expenseAccounts/create/CreateExpenseAccountForm";

const CreateExpenseAccountPage = async () => {
    return (
        <div className="bg-gray-900 flex items-center justify-center p-8 h-screen">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white">Create Expense Account</h2>
                        </div>

                        <CreateExpenseAccountForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateExpenseAccountPage;
