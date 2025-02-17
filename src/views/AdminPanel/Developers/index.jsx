import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

const apiCall = async (method, endpoint, data = {}) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) throw new Error("No access token found");

    return axiosClient[method](endpoint, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export default function DeliveryCharges() {
    const [deliveryCharges, setDeliveryCharges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ id: null, name: '', amount: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchAllDeliveryCharges = async () => {
        setLoading(true);
        try {
            const res = await apiCall('get', '/delivery-charges');
            setDeliveryCharges(res.data.data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllDeliveryCharges();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isEditing || isAdding ? 'hidden' : 'unset';
    }, [isEditing, isAdding]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (deliveryCharge) => {
        setFormData({ id: deliveryCharge.id, name: deliveryCharge.name, amount: deliveryCharge.amount });
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.amount) {
            setErrorMessage("Both name and amount fields are required.");
            return;
        }

        const endpoint = isEditing ? `/delivery-charges/update/${formData.id}` : '/delivery-charges/store';

        try {
            await apiCall('post', endpoint, formData);
            fetchAllDeliveryCharges();
            resetForm();
        } catch (err) {
            handleError(err);
        }
    };

    const resetForm = () => {
        setFormData({ id: null, name: '', amount: '' });
        setIsAdding(false);
        setIsEditing(false);
        setErrorMessage('');
    };

    const handleError = (err) => {
        setErrorMessage(err.response ? err.response.data.message : "An error occurred");
    };

    const toggleDeliveryChargeStatus = async (deliveryCharge) => {
        try {
            await apiCall('post', `/delivery-charges/toggle-status/${deliveryCharge.id}`);
            fetchAllDeliveryCharges();
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Delivery Charge List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add Delivery Charge</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">Amount</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deliveryCharges.length > 0 ? deliveryCharges.map((deliveryCharge, index) => (
                                        <tr key={deliveryCharge.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{deliveryCharge.name}</td>
                                            <td className="border-b py-2">{deliveryCharge.amount}</td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${deliveryCharge.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleDeliveryChargeStatus(deliveryCharge)}
                                                >
                                                    {deliveryCharge.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {deliveryCharge.status === 1 && (
                                                    
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => handleEdit(deliveryCharge)}
                                                        aria-label={`Edit Delivery Charges ${deliveryCharge.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">No Delivery Charge found</td>
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
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Delivery Charge" : "Edit Delivery Charge"}</h5>
                            <button type="button" className="text-black" onClick={resetForm}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Delivery Charge Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="border rounded w-full p-2"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    className="border rounded w-full p-2"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                />
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
