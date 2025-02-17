import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PropertyTypes() {
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        meta_title: '',
        meta_description: '',
        description: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllPropertyTypes();
    }, []);

    useEffect(() => {
        document.body.style.overflow = (isEditing || isAdding) ? 'hidden' : 'unset';
    }, [isEditing, isAdding]);

    const fetchAllPropertyTypes = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/property-types');
            setPropertyTypes(res.data.data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const editPropertyType = (propertyType) => {
        setSelectedPropertyType(propertyType);
        setFormData({
            name: propertyType.name,
            slug: propertyType.slug,
            meta_title: propertyType.meta_title || '',
            meta_description: propertyType.meta_description || '',
            description: propertyType.description || ''
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            Swal.fire('Error', 'No access token found', 'error');
            return;
        }

        if (!formData.name) {
            Swal.fire('Error', "The name field is required.", 'error');
            return;
        }

        const url = isAdding ? '/property-types/store' : `/property-types/update/${selectedPropertyType.id}`;
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            await axiosClient.post(url, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            fetchAllPropertyTypes();
            resetForm();
            Swal.fire('Success', `Property Type ${isAdding ? 'added' : 'updated'} successfully!`, 'success');
        } catch (err) {
            handleError(err);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            meta_title: '',
            meta_description: '',
            description: ''
        });
        setIsAdding(false);
        setIsEditing(false);
        setSelectedPropertyType(null);
    };

    const handleError = (err) => {
        let message = 'An error occurred';
        if (err.response) {
            message = err.response.data.message || message;
        }
        setErrorMessage(message);
        Swal.fire('Error', message, 'error');
    };

    const togglePropertyTypeStatus = async (propertyType) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            Swal.fire('Error', 'No access token found', 'error');
            return;
        }

        try {
            await axiosClient.post(`/property-types/toggle-status/${propertyType.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchAllPropertyTypes();
            Swal.fire('Success', 'Property Type status updated successfully!', 'success');
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Property Type List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add Property Type</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">Slug</th>
                                        <th className="border-b text-center py-2">Meta Title</th>
                                        <th className="border-b text-center py-2">Meta Description</th>
                                        <th className="border-b text-center py-2">Description</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {propertyTypes.length > 0 ? propertyTypes.map((propertyType, index) => (
                                        <tr key={propertyType.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{propertyType.name}</td>
                                            <td className="border-b py-2">{propertyType.slug}</td>
                                            <td className="border-b py-2">{propertyType.meta_title}</td>
                                            <td className="border-b py-2" dangerouslySetInnerHTML={{ __html: propertyType.meta_description }}></td>
                                            <td className="border-b py-2" dangerouslySetInnerHTML={{ __html: propertyType.description }}></td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${propertyType.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => togglePropertyTypeStatus(propertyType)}
                                                >
                                                    {propertyType.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {propertyType.status === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editPropertyType(propertyType)}
                                                        aria-label={`Edit Property Type ${propertyType.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4">No Property Type found</td>
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
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Property Type" : "Edit Property Type"}</h5>
                            <button type="button" className="text-black" onClick={resetForm}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Property Type Name</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Slug</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={formData.meta_title}
                                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Meta Description</label>
                                <ReactQuill
                                    value={formData.meta_description}
                                    onChange={(value) => setFormData({ ...formData, meta_description: value })}
                                    theme="snow"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Description</label>
                                <ReactQuill
                                    value={formData.description}
                                    onChange={(value) => setFormData({ ...formData, description: value })}
                                    theme="snow"
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
