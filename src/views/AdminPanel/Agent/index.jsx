import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAgent, setCurrentAgent] = useState({
        id: null,
        name: '',
        email: '',
        phone_no: '',
        address: '',
        status: 1,
        department_id: '', // New field for department
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllAgents();
        fetchDepartments(); // Fetch departments when the component mounts
    }, []);

    const fetchAllAgents = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/agents');
            setAgents(res.data.data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await axiosClient.get('/departments'); // Fetch departments from API
            setDepartments(res.data.data);
        } catch (err) {
            handleError(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentAgent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return Swal.fire('Error', 'No access token found', 'error');

        const { name, email, phone_no, department_id } = currentAgent;
        if (!name || !email || !phone_no || !department_id) return Swal.fire('Error', 'All fields are required.', 'error');

        const formData = new FormData();
        Object.entries({ name, email, phone_no, address: currentAgent.address, status: currentAgent.status, department_id }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            if (isAdding) {
                await axiosClient.post('/agents/store', formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Swal.fire('Success', 'Agent added successfully!', 'success');
            } else {
                await axiosClient.post(`/agents/update/${currentAgent.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Swal.fire('Success', 'Agent updated successfully!', 'success');
            }
            fetchAllAgents();
            resetForm();
        } catch (err) {
            handleError(err);
        }
    };

    const resetForm = () => {
        setCurrentAgent({ id: null, name: '', email: '', phone_no: '', address: '', status: 1, department_id: '' });
        setIsAdding(false);
        setIsEditing(false);
    };

    const editAgent = (agent) => {
        setCurrentAgent(agent);
        setIsEditing(true);
    };

    const toggleAgentStatus = async (agent) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return Swal.fire('Error', 'No access token found', 'error');

        try {
            await axiosClient.post(`/agents/toggle-status/${agent.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAllAgents();
            Swal.fire('Success', 'Agent status updated successfully!', 'success');
        } catch (err) {
            handleError(err);
        }
    };

    const handleError = (err) => {
        let message = 'An error occurred';
        if (err.response) {
            console.error("Error Response:", err.response.data);
            message = err.response.data.message || message;
        } else {
            console.error("Error:", err);
        }
        setErrorMessage(message);
        Swal.fire('Error', message, 'error');
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Agent List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add Agent</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">Email</th>
                                        <th className="border-b text-center py-2">Phone No</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agents.length > 0 ? agents.map((agent, index) => (
                                        <tr key={agent.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{agent.name}</td>
                                            <td className="border-b py-2">{agent.email}</td>
                                            <td className="border-b py-2">{agent.phone_no}</td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${agent.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleAgentStatus(agent)}
                                                >
                                                    {agent.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {agent.status === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editAgent(agent)}
                                                        aria-label={`Edit Agent ${agent.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">No Agents found</td>
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4">
                        <div className="flex justify-between items-center">
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Agent" : "Edit Agent"}</h5>
                            <button type="button" className="text-black" onClick={resetForm}>
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Agent Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="border rounded w-full p-2"
                                    value={currentAgent.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="border rounded w-full p-2"
                                    value={currentAgent.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Phone No</label>
                                <input
                                    type="text"
                                    name="phone_no"
                                    className="border rounded w-full p-2"
                                    value={currentAgent.phone_no}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Address</label>
                                <textarea
                                    name="address"
                                    className="border rounded w-full p-2"
                                    value={currentAgent.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Department</label>
                                <select
                                    name="department_id"
                                    className="border rounded w-full p-2"
                                    value={currentAgent.department_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="button" className="bg-gray-300 text-black py-2 px-4 rounded mr-2" onClick={resetForm}>Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">{isAdding ? "Add" : "Save"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
