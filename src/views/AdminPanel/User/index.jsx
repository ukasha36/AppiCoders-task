import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_no: '',
        address: '',
    });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const dropdownRef = useRef([]);

    useEffect(() => {
        fetchAllUsers();
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.some(ref => ref?.contains(event.target))) {
                setOpenDropdownIndex(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isEditing || isAdding ? 'hidden' : 'unset';
    }, [isEditing, isAdding]);

    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/users');
            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetFormState = () => {
        setFormData({ name: '', email: '', phone_no: '', address: '' });
        setIsAdding(false);
        setIsEditing(false);
        setSelectedUser(null);
        setErrorMessage('');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return alert("No access token found");

        const url = isEditing ? `/users/updateAdminUser/${selectedUser.id}` : '/users/addAdminUser';
        const method = isEditing ? 'post' : 'post';

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) formDataToSend.append(key, value);
        });

        try {
            await axiosClient[method](url, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire('Success', 'Transaction Completed!', 'success');
            await fetchAllUsers(); // Refetch users after submission
            resetFormState();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to transaction. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const toggleUserStatus = async (user) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return alert("No access token found");

        try {
            await axiosClient.post(`/users/toggle-status/${user.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAllUsers();
        } catch (err) {
            setErrorMessage(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Users List</h2>
                {loading ? <Spinner /> : (
                    <>
                        <div className="flex justify-end mb-4">
                            <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => setIsAdding(true)}>Add User</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center p-4">S.No</th>
                                        <th className="border-b text-center p-4">Name</th>
                                        <th className="border-b text-center p-4">Email</th>
                                        <th className="border-b text-center p-4">Phone No</th>
                                        <th className="border-b text-center p-4">Address</th>
                                        <th className="border-b text-center p-4">Status</th>
                                        <th className="border-b text-center p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? users.map((user, index) => (
                                        <tr key={user.id} className="hover:bg-gray-100">
                                            <td className='text-center border-b p-4'>{index + 1}</td>
                                            <td className='border-b p-4'>{user.name}</td>
                                            <td className='border-b p-4'>{user.email}</td>
                                            <td className='border-b p-4'>{user.phone_no}</td>
                                            <td className='border-b p-4'>{user.address}</td>
                                            <td className='text-center border-b p-4'>
                                                <button
                                                    className={`px-3 py-1 rounded ${user.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                                    onClick={() => toggleUserStatus(user)}
                                                >
                                                    {user.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {user.status === 1 && user.acc_type === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setFormData({
                                                                name: user.name,
                                                                email: user.email,
                                                                phone_no: user.phone_no,
                                                                address: user.address,
                                                            });
                                                            setIsEditing(true);
                                                        }}
                                                        aria-label={`Edit user ${user.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="7" className='text-center border-b p-4'>No user found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
            </div>

            {(isEditing || isAdding) && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">{isAdding ? "Add User" : "Edit User"}</h3>
                            <button type="button" className="text-gray-600" onClick={resetFormState}>
                                <span>&times;</span>
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={handleFormSubmit}>
                            {['name', 'email', 'phone_no', 'address'].map((field) => (
                                <div className="mb-4" key={field}>
                                    <label className="block text-sm font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        name={field}
                                        className="border rounded-lg p-2 w-full"
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        required // Basic validation
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={resetFormState}>Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isAdding ? "Add" : "Save"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
