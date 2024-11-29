import React, { useState } from 'react';
import axiosInstance from '../axios'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isRegistering, setIsRegistering] = useState(false);
    const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password,
            });
            // Store token in local storage or context
            localStorage.setItem('token', response.data.access_token);
            onLogin(); // Callback to update login state in parent component
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const handleRegister = async () => {
        if (registerData.password !== registerData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            await axiosInstance.post('/auth/register', {
                username: registerData.username,
                password: registerData.password,
            });
            setSuccess('Registration successful! You can now login.');
            setIsRegistering(false); // Switch back to login form after registration
            setRegisterData({username:'',password:'',confirmPassword:''});
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-red-500">{success}</p>}
                {isRegistering ? (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            {/* Registration Form */}
                            <input
                                type="text"
                                placeholder="Username"
                                value={registerData.username}
                                required
                                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                className="mb-4 p-2 w-full border rounded"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={registerData.password}
                                required
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                className="mb-4 p-2 w-full border rounded"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={registerData.confirmPassword}
                                required
                                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                className="mb-4 p-2 w-full border rounded"
                            />
                            <button className="bg-blue-500 text-white p-2 w-full rounded">
                                Register
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </form>
                )}
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-blue-500 mt-4 w-full"
                    >
                    {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
                </button>
            </div>
        </div>
    );
};

export default Login;