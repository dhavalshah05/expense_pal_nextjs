'use client'

import Form from "next/form";
import {useActionState} from "react";
import loginUserAction from "@/features/authentication/actions/login-user-action";

export default function LoginPage() {

    const [state, action, isPending] = useActionState(loginUserAction, { status: 'idle' })

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                            <p className="text-gray-400 mt-2">Log in to manage your expenses</p>
                        </div>

                        {state.message && (
                            <div
                                className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-400 rounded-md text-sm">
                                {state.message}
                            </div>
                        )}

                        <Form action={action}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={state.formData?.get('email')?.toString()}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                        placeholder="you@example.com"
                                    />
                                    <span className={'text-red-400 inline-block mt-1'}>{state.fieldErrors?.email}</span>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        defaultValue={state.formData?.get('password')?.toString()}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <span className={'text-red-400 inline-block mt-1'}>{state.fieldErrors?.password}</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isPending ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </>
                                ) : (
                                    'Log In'
                                )}
                                </button>
                            </div>
                        </Form>

                        {/*<div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-teal-400 hover:text-teal-300 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>*/}
                    </div>

                    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 text-white text-center">
                        <p className="text-sm font-medium">Expense Manager — Track, budget, and save</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
