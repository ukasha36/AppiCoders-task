import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AdditionalFeatures() {
    const [additionalFeatures, setAdditionalFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdditionalFeature, setSelectedAdditionalFeature] = useState(null);
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
        fetchAllAdditionalFeatures();
    }, []);

    useEffect(() => {
        document.body.style.overflow = (isEditing || isAdding) ? 'hidden' : 'unset';
    }, [isEditing, isAdding]);

    const fetchAllAdditionalFeatures = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/additional-features');
            setAdditionalFeatures(res.data.data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const editAdditionalFeature = (additionalFeature) => {
        setSelectedAdditionalFeature(additionalFeature);
        setFormData({
            name: additionalFeature.name,
            slug: additionalFeature.slug,
            meta_title: additionalFeature.meta_title || '',
            meta_description: additionalFeature.meta_description || '',
            description: additionalFeature.description || ''
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

        const url = isAdding ? '/additional-features/store' : `/additional-features/update/${selectedAdditionalFeature.id}`;
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

            fetchAllAdditionalFeatures();
            resetForm();
            Swal.fire('Success', `Additional Feature ${isAdding ? 'added' : 'updated'} successfully!`, 'success');
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
        setSelectedAdditionalFeature(null);
    };

    const handleError = (err) => {
        let message = 'An error occurred';
        if (err.response) {
            message = err.response.data.message || message;
        }
        setErrorMessage(message);
        Swal.fire('Error', message, 'error');
    };

    const toggleAdditionalFeatureStatus = async (additionalFeature) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            Swal.fire('Error', 'No access token found', 'error');
            return;
        }

        try {
            await axiosClient.post(`/additional-features/toggle-status/${additionalFeature.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchAllFeatures();
            Swal.fire('Success', 'Additional Feature status updated successfully!', 'success');
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Additional Feature List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add Additional Feature</button>
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
                                    {additionalFeatures.length > 0 ? additionalFeatures.map((additionalFeature, index) => (
                                        <tr key={additionalFeature.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{additionalFeature.name}</td>
                                            <td className="border-b py-2">{additionalFeature.slug}</td>
                                            <td className="border-b py-2">{additionalFeature.meta_title}</td>
                                            <td className="border-b py-2" dangerouslySetInnerHTML={{ __html: additionalFeature.meta_description }}></td>
                                            <td className="border-b py-2" dangerouslySetInnerHTML={{ __html: additionalFeature.description }}></td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${additionalFeature.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleAdditionalFeatureStatus(additionalFeature)}
                                                >
                                                    {additionalFeature.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {additionalFeature.status === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editAdditionalFeature(additionalFeature)}
                                                        aria-label={`Edit Additional Feature ${additionalFeature.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4">No Additional Features found</td>
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
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Additional Feature" : "Edit Additional Feature"}</h5>
                            <button type="button" className="text-black" onClick={resetForm}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Additional Feature Name</label>
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
