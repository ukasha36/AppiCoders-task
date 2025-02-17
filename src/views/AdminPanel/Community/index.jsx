import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function DiscountCodes() {
    const [discountCodes, setDiscountCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDiscountCode, setSelectedDiscountCode] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newDiscountCode, setNewDiscountCode] = useState({
        code: '',
        amount: '',
        type: 'percentage',
        start_date: '',
        end_date: '',
        usage_limit: '',
        min_order_amount: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedDiscountCode, setEditedDiscountCode] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const dropdownRef = useRef([]);

    useEffect(() => {
        fetchAllDiscountCodes();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isEditing || isAdding ? 'hidden' : 'unset';
    }, [isEditing, isAdding]);

    const fetchAllDiscountCodes = () => {
        setLoading(true);
        axiosClient.get('/discount-codes')
            .then(res => {
                setDiscountCodes(res.data.data);
            })
            .catch(err => {
                console.error(err);
                Swal.fire('Error', 'Failed to fetch discount codes. Please try again.', 'error');
            })
            .finally(() => setLoading(false));
    };

    const editDiscountCode = (discountCode) => {
        setSelectedDiscountCode(discountCode);
        setEditedDiscountCode(discountCode);
        setIsEditing(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            Swal.fire('Error', "No access token found", 'error');
            return;
        }

        try {
            await axiosClient.post(`/discount-codes/update/${selectedDiscountCode.id}`, editedDiscountCode, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            Swal.fire('Success', 'Discount code updated successfully!', 'success');
            fetchAllDiscountCodes();
            setIsEditing(false);
            setSelectedDiscountCode(null);
            setErrorMessage('');
        } catch (err) {
            handleError(err);
        }
    };

    const addDiscountCode = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            Swal.fire('Error', "No access token found", 'error');
            return;
        }

        try {
            await axiosClient.post('/discount-codes/store', newDiscountCode, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            Swal.fire('Success', 'Discount code added successfully!', 'success');
            fetchAllDiscountCodes();
            setIsAdding(false);
            setNewDiscountCode({
                code: '',
                amount: '',
                type: 'percentage',
                start_date: '',
                end_date: '',
                usage_limit: '',
                min_order_amount: ''
            });
            setErrorMessage('');
        } catch (err) {
            handleError(err);
        }
    };

    const handleError = (err) => {
        if (err.response) {
            console.error("Error Response:", err.response.data);
            setErrorMessage(err.response.data.message || "An error occurred");
            Swal.fire('Error', err.response.data.message || "An error occurred", 'error');
        } else {
            console.error("Error:", err);
            setErrorMessage("An error occurred");
            Swal.fire('Error', "An error occurred", 'error');
        }
    };

    const toggleDiscountCodeStatus = (discountCode) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            Swal.fire('Error', "No access token found", 'error');
            return;
        }

        axiosClient.post(`/discount-codes/toggle-status/${discountCode.id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            Swal.fire('Success', 'Discount code status toggled successfully!', 'success');
            fetchAllDiscountCodes();
        })
        .catch((err) => {
            handleError(err);
        });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Discount Code List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add Discount Code</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Code</th>
                                        <th className="border-b text-center py-2">Amount / Percentage</th>
                                        <th className="border-b text-center py-2">Type</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {discountCodes.length > 0 ? discountCodes.map((discountCode, index) => (
                                        <tr key={discountCode.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{discountCode.code}</td>
                                            <td className="border-b text-center py-2">{discountCode.amount}</td>
                                            <td className="border-b text-center py-2">{discountCode.type}</td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${discountCode.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleDiscountCodeStatus(discountCode)}
                                                >
                                                    {discountCode.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {discountCode.status === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editDiscountCode(discountCode)}
                                                        aria-label={`Edit Discount Code ${discountCode.code}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">No discount codes found</td>
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
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Discount Code" : "Edit Discount Code"}</h5>
                            <button type="button" className="text-black" onClick={() => { setIsAdding(false); setIsEditing(false); }}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={isAdding ? addDiscountCode : handleEditSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Discount Code</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newDiscountCode.code : editedDiscountCode.code}
                                    onChange={(e) => isAdding ? setNewDiscountCode({ ...newDiscountCode, code: e.target.value }) : setEditedDiscountCode({ ...editedDiscountCode, code: e.target.value })}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Discount Amount / Percent</label>
                                <input
                                    type="number"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newDiscountCode.amount : editedDiscountCode.amount}
                                    onChange={(e) => isAdding ? setNewDiscountCode({ ...newDiscountCode, amount: e.target.value }) : setEditedDiscountCode({ ...editedDiscountCode, amount: e.target.value })}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Discount Type</label>
                                <select
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newDiscountCode.type : editedDiscountCode.type}
                                    onChange={(e) => isAdding ? setNewDiscountCode({ ...newDiscountCode, type: e.target.value }) : setEditedDiscountCode({ ...editedDiscountCode, type: e.target.value })}
                                >
                                    <option value="percentage">Percentage</option>
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Start Date</label>
                                <input
                                    type="date"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newDiscountCode.start_date : editedDiscountCode.start_date}
                                    onChange={(e) => isAdding ? setNewDiscountCode({ ...newDiscountCode, start_date: e.target.value }) : setEditedDiscountCode({ ...editedDiscountCode, start_date: e.target.value })}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">End Date</label>
                                <input
                                    type="date"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newDiscountCode.end_date : editedDiscountCode.end_date}
                                    onChange={(e) => isAdding ? setNewDiscountCode({ ...newDiscountCode, end_date: e.target.value }) : setEditedDiscountCode({ ...editedDiscountCode, end_date: e.target.value })}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Usage Limit</label>
                                <input
                                    type="number"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newDiscountCode.usage_limit : editedDiscountCode.usage_limit}
                                    onChange={(e) => isAdding ? setNewDiscountCode({ ...newDiscountCode, usage_limit: e.target.value }) : setEditedDiscountCode({ ...editedDiscountCode, usage_limit: e.target.value })}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Minimum Order Amount</label>
                                <input
                                    type="number"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newDiscountCode.min_order_amount : editedDiscountCode.min_order_amount}
                                    onChange={(e) => isAdding ? setNewDiscountCode({ ...newDiscountCode, min_order_amount: e.target.value }) : setEditedDiscountCode({ ...editedDiscountCode, min_order_amount: e.target.value })}
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
