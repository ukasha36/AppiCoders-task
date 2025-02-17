import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllDepartments();
    }, []);

    useEffect(() => {
        if (isEditing || isAdding) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isEditing, isAdding]);

    const fetchAllDepartments = () => {
        setLoading(true);
        axiosClient.get('/departments')
            .then(res => {
                setLoading(false);
                setDepartments(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    

    const editDepartment = (department) => {
        setSelectedDepartment(department);
        setEditedName(department.name);
        setIsEditing(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!editedName) {
            setErrorMessage("The name field is required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', editedName);
        try {
            await axiosClient.post(`/departments/update/${selectedDepartment.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'Department Updated Successfully!', 'success');
            fetchAllDepartments();
            setIsEditing(false);
            setSelectedDepartment(null);
            setErrorMessage('');
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to updated Department. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const addDepartment = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!newDepartmentName) {
            setErrorMessage("The name field is required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', newDepartmentName);
        try {
            await axiosClient.post('/departments/store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'Department Created Successfully!', 'success');
            fetchAllDepartments();
            setIsAdding(false);
            setNewDepartmentName('');
            setErrorMessage('');
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to updated Department. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const handleError = (err) => {
        if (err.response) {
            console.error("Error Response:", err.response.data);
            setErrorMessage(err.response.data.message || "An error occurred");
        } else {
            console.error("Error:", err);
            setErrorMessage("An error occurred");
        }
    };

    const toggleDepartmentStatus = (department) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        axiosClient.post(`/departments/toggle-status/${department.id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            fetchAllDepartments();
        })
        .catch((err) => {
            handleError(err);
        });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Department List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add Department</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departments.length > 0 ? departments.map((department, index) => (
                                        <tr key={department.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{department.name}</td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${department.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleDepartmentStatus(department)}
                                                >
                                                    {department.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {department.status === 1 && (
                                                    
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editDepartment(department)}
                                                        aria-label={`Edit Department ${department.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">No department found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
            </div>

            {(isEditing || isAdding) && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4">
                        <div className="flex justify-between items-center">
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Department" : "Edit Department"}</h5>
                            <button type="button" className="text-black" onClick={() => { setIsAdding(false); setIsEditing(false); }}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={isAdding ? addDepartment : handleEditSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Department Name</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newDepartmentName : editedName}
                                    onChange={(e) => isAdding ? setNewDepartmentName(e.target.value) : setEditedName(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="button" className="bg-gray-300 text-black py-2 px-4 rounded mr-2" onClick={() => { setIsAdding(false); setIsEditing(false); }}>Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">{isAdding ? "Add" : "Save"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
