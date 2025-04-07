'use client';

import Form from "next/form";
import {useActionState, useEffect} from "react";
import {showSuccessToast} from "@/utils/toast/custom-toast";
import createBucketAction from "@/features/buckets/create/actions/create-bucket-action";

const CreateBucketForm = () => {
    const [state, action, isPending] = useActionState(createBucketAction, {status: 'idle'})

    useEffect(() => {
        if (state.status === 'success') {
            if (state.message !== undefined) {
                showSuccessToast(state.message);
            }
        }
    }, [state]);

    return (
        <Form action={action}>
            <div className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Name
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={state.formData?.get("name")?.toString()}
                            className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                            placeholder="Ex: Manali Trip"
                        />
                    </div>
                    {state.fieldErrors?.name && (
                        <span className="text-red-400 inline-block mt-1">{state.fieldErrors?.name}</span>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isPending ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        'Add Bucket'
                    )}
                </button>
            </div>
        </Form>
    )
}

export default CreateBucketForm;
