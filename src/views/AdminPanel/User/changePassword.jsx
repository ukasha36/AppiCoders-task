import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import { useStateContext } from '../../../contexts/contextProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            current_password: currentPassword,
            new_password: newPassword
        };

        axiosClient.post('/change-password', payload) // Update endpoint as needed
            .then(({ data }) => {
                // Show success message
                Swal.fire('Success', data.message || 'Password changed successfully!', 'success');
                setUser(null);
                setToken(null);
                navigate('/admin/'); // Redirect after successful change
            })
            .catch(err => {
                const response = err.response;
                const errorMessage = response?.data?.message || 'Failed to change password';
                setError(errorMessage);
                // Show error message
                Swal.fire('Error', errorMessage, 'error');
                setTimeout(() => {
                    setError('');
                }, 3000);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Change Password</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    {/* Current Password Input */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Current Password</label>
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
                        />
                        <div
                            className="absolute inset-y-0 top-1/2 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <FaEyeSlash className="text-gray-700" /> : <FaEye className="text-gray-700" />}
                        </div>
                    </div>

                    {/* New Password Input */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DA931D]"
                        />
                        <div
                            className="absolute inset-y-0 top-1/2 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <FaEyeSlash className="text-gray-700" /> : <FaEye className="text-gray-700" />}
                        </div>
                    </div>

                    {error && <p className="my-6 text-red-700">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#004274DE] text-white py-2 rounded-lg hover:bg-[#004274DE] transition duration-300"
                    >
                        {loading ? 'Changing...' : 'Change Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
