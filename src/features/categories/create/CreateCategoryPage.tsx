import CreateCategoryForm from "@/features/categories/create/CreateCategoryForm";
const CreateCategoryPage = async () => {
    return (
        <div className="bg-gray-900 flex items-center justify-center p-8 h-screen">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white">Create Category</h2>
                        </div>

                        <CreateCategoryForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCategoryPage;
