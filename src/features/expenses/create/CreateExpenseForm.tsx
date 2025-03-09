import Form from "next/form";

interface CreateExpensePageProps {
    categories: string[]
}
const CreateExpenseForm = ({ categories }: CreateExpensePageProps) => {
    return (
        <Form action={''}>
            <div className="space-y-5">
                {/* Amount Field */}
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                        Amount
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">₹</span>
                        </div>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            /*value={formData.amount}
                            onChange={handleChange}*/
                            className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                            placeholder="0.00"
                        />
                    </div>
                    {/*{errors.amount && (
                                        <span className="text-red-400 inline-block mt-1">{errors.amount}</span>
                                    )}*/}
                </div>

                {/* Date Field */}
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                        Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        /*value={formData.date}
                        onChange={handleChange}*/
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    />
                    {/*{errors.date && (
                                        <span className="text-red-400 inline-block mt-1">{errors.date}</span>
                                    )}*/}
                </div>

                {/* Category Dropdown */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        /*value={formData.category}
                        onChange={handleChange}*/
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    >
                        <option value="" disabled>Select category</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    {/*{errors.category && (
                                        <span className="text-red-400 inline-block mt-1">{errors.category}</span>
                                    )}*/}
                </div>

                {/* Description Textarea */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        /*value={formData.description}
                        onChange={handleChange}*/
                        rows={2}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                        placeholder="What was this expense for?"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    /*disabled={isPending}*/
                    className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {/*{isPending ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        'Add Expense'
                                    )}*/}
                    Add Expense
                </button>
            </div>
        </Form>
    )
}

export default CreateExpenseForm;
