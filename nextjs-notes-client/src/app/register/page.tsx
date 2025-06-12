'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../utils/api';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await registerUser({ username, password });
            router.push('/login');
        } catch {
            setError('Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="bg-white/80 shadow-2xl rounded-3xl p-10 w-full max-w-md backdrop-blur-md border border-gray-200">
                <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8 drop-shadow-lg">
                    Create your account
                </h1>
                {error && (
                    <p className="mb-4 text-center text-red-500 font-semibold animate-pulse">
                        {error}
                    </p>
                )}
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none bg-gray-50 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-gray-50 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-pink-200 transition-all duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="font-semibold text-purple-600 hover:underline"
                    >
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}
