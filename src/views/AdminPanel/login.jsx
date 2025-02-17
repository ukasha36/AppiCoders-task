import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../contexts/contextProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        const payload = {
            email,
            password
        };

        axiosClient.post('login', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                navigate('/admin/dashboards');
            })
            .catch(err => {
                const response = err.response;

                setError(err.response?.data?.message || 'Invalid email and password');
                // Clear the error after 2 seconds
                setTimeout(() => {
                    setError('');
                }, 3000);
                if (response && response.status === 422) {
                    console.log(response.data.error);
                }
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    };

    return (
        
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
                        />
                    </div>
                    {/* Password input with eye toggle */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
                        />
                        <div
                            className="absolute inset-y-0 top-1/2 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash className="text-gray-700" /> : <FaEye className="text-gray-700" />}
                        </div>
                    </div>
                    {error && <p className="my-6 text-red-700">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#004274DE] text-white py-2 rounded-lg hover:bg-[#004274DE] transition duration-300"
                    >
                        {loading ? 'Logging...' : 'Login'} {/* Change button text based on loading state */}
                    </button>
                </form>
            </div>
        </div>
    );
}
