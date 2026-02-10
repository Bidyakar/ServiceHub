'use client';

import { useActionState, Suspense } from 'react';
import { login } from '@/app/actions/auth';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded-xl text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 ${pending ? 'opacity-70 cursor-not-allowed' : ''
                }`}
        >
            {pending ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                </span>
            ) : 'Sign in to Console'}
        </button>
    );
}

function LoginForm() {
    const [state, formAction] = useActionState(login, null);
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '';

    return (
        <form className="mt-8 space-y-6" action={formAction}>
            <input type="hidden" name="redirect" value={redirectUrl} />
            {state?.error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl text-center font-medium backdrop-blur-sm animate-pulse">
                    ⚠️ {state.error}
                </div>
            )}
            <div className="space-y-4">
                <div>
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </div>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl leading-5 bg-gray-800/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-gray-800 transition-all sm:text-sm"
                            placeholder="admin@servicehub.com"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl leading-5 bg-gray-800/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-gray-800 transition-all sm:text-sm"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
            </div>

            <div>
                <LoginButton />
            </div>

            <div className="text-center">
                <a href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                    ← Back to Home
                </a>
            </div>
        </form>
    );
}

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-[#0f1115] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-md w-full space-y-8 bg-gray-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/5 z-10 relative">
                <div>
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        Admin Console
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Enter your credentials to access the dashboard
                    </p>
                </div>

                <Suspense fallback={<div className="text-center text-gray-500">Loading form...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
