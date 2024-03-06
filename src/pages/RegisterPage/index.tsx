import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/contexts';
import { useRouter } from 'next/router';

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const { register, isLoading, registrationSuccessMessage } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRegister = async () => {
        try {
            setErrorMessage(null);
            await register(username, email, password);
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    useEffect(() => {
        if (registrationSuccessMessage) {
            alert(registrationSuccessMessage);
            router.push('/LoginPage'); 
        }
    }, [registrationSuccessMessage, router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 shadow-md rounded-md w-96">
                <h2 className="text-2xl text-center font-semibold mb-4">Register</h2>
                <form className="text-center">
                <label className="block mb-2">
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-300 px-3 py-2 w-full rounded-md"
                        />
                    </label>
                    <label className="block mb-2">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 px-3 py-2 w-full rounded-md"
                        />
                    </label>
                    <label className="block mb-2">
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 px-3 py-2 w-full rounded-md"
                        />
                    </label>
                    {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#4C49ED] border-t-[#4C49ED]"></div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="bg-[#4C49ED] text-white px-4 py-2 rounded-md hover:bg-[#4C49ED] focus:outline-none"
                        >
                            Register
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
