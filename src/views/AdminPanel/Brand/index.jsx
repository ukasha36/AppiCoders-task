import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import { BASE_IMAGE_URL } from '../../../Utils/const';
import Swal from 'sweetalert2';

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newBrandName, setNewBrandName] = useState('');
    const [newBrandDescription, setNewBrandDescription] = useState('');
    const [newBannerImage, setNewBannerImage] = useState(null);
    const [newMainImage, setNewMainImage] = useState(null);
    const [newDescriptionImage, setNewDescriptionImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedBannerImage, setEditedBannerImage] = useState(null);
    const [editedMainImage, setEditedMainImage] = useState(null);
    const [editedDescriptionImage, setEditedDescriptionImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const dropdownRef = useRef([]);

    useEffect(() => {
        fetchAllBrands();
    }, []);

    useEffect(() => {
        if (isEditing || isAdding) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isEditing, isAdding]);

    const fetchAllBrands = () => {
        setLoading(true);
        axiosClient.get('/brands')
            .then(res => {
                setLoading(false);
                setBrands(res.data.data);
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
                Swal.fire('Error', 'Failed to fetch brands', 'error');
            });
    };

    const editBrand = (brand) => {
        setSelectedBrand(brand);
        setEditedName(brand.name);
        setEditedDescription(brand.description);
        setEditedBannerImage(null);
        setEditedMainImage(null);
        setEditedDescriptionImage(null);
        setIsEditing(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return alert("No access token found");
        if (!editedName) return setErrorMessage("The name field is required.");

        const formData = new FormData();
        formData.append('name', editedName);
        formData.append('description', editedDescription);
        if (editedBannerImage) formData.append('banner_image', editedBannerImage);
        if (editedMainImage) formData.append('main_image', editedMainImage);
        if (editedDescriptionImage) formData.append('description_image', editedDescriptionImage);

        try {
            await axiosClient.post(`/brands/update/${selectedBrand.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            Swal.fire('Success', 'Brand updated successfully!', 'success');
            fetchAllBrands();
            setIsEditing(false);
            setSelectedBrand(null);
            setErrorMessage('');
        } catch (err) {
            handleError(err);
        }
    };

    const addBrand = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return alert("No access token found");
        if (!newBrandName) return setErrorMessage("The name field is required.");

        const formData = new FormData();
        formData.append('name', newBrandName);
        formData.append('description', newBrandDescription);
        if (newBannerImage) formData.append('banner_image', newBannerImage);
        if (newMainImage) formData.append('main_image', newMainImage);
        if (newDescriptionImage) formData.append('description_image', newDescriptionImage);

        try {
            await axiosClient.post('/brands/store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            Swal.fire('Success', 'Brand added successfully!', 'success');
            fetchAllBrands();
            setIsAdding(false);
            setNewBrandName('');
            setNewBrandDescription('');
            setNewBannerImage(null);
            setNewMainImage(null);
            setNewDescriptionImage(null);
            setErrorMessage('');
        } catch (err) {
            handleError(err);
        }
    };

    const handleFileChange = (e, setImage) => {
        const file = e.target.files[0]; // Get the first file only
        setImage(file);
    };

    const handleError = (err) => {
        if (err.response) {
            console.error("Error Response:", err.response.data);
            setErrorMessage(err.response.data.message || "An error occurred");
            Swal.fire('Error', err.response.data.message || 'An error occurred', 'error');
        } else {
            console.error("Error:", err);
            setErrorMessage("An error occurred");
            Swal.fire('Error', 'An error occurred', 'error');
        }
    };

    const toggleBrandStatus = (brand) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return alert("No access token found");

        axiosClient.post(`/brands/toggle-status/${brand.id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            Swal.fire('Success', `Brand status updated to ${brand.status === 1 ? 'Inactive' : 'Active'}`, 'success');
            fetchAllBrands();
        })
        .catch(err => {
            handleError(err);
        });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Brand List</h2>
                <div>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-end mb-4">
                                <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => setIsAdding(true)}>Add Brand</button>
                            </div>
                            <div className="overflow-auto">
                                <table className='min-w-full bg-white'>
                                    <thead>
                                        <tr>
                                            <th className='border-b-2 text-center py-2'>S.No</th>
                                            <th className='border-b-2 text-center py-2'>Image</th>
                                            <th className='border-b-2 text-center py-2'>Name</th>
                                            <th className='border-b-2 text-center py-2'>Slug</th>
                                            <th className='border-b-2 text-center py-2'>Description</th>
                                            <th className='border-b-2 text-center py-2'>Status</th>
                                            <th className='border-b-2 text-center py-2'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {brands.length > 0 ? brands.map((brand, index) => (
                                            <tr key={brand.id} className="hover:bg-gray-100">
                                                <td className='border-b text-center py-2'>{index + 1}</td>
                                                <td className='border-b text-center py-2'>
                                                    {brand.image_path && (
                                                        <img
                                                            src={`${BASE_IMAGE_URL}${brand.image_path}`}
                                                            alt={brand.name}
                                                            className="w-12 h-12 object-cover"
                                                        />
                                                    )}
                                                </td>
                                                <td className='border-b py-2'>{brand.name}</td>
                                                <td className='border-b py-2'>{brand.slug}</td>
                                                <td className='border-b py-2'>{brand.description}</td>
                                                <td className='border-b text-center py-2'>
                                                    <button
                                                        className={`py-1 px-3 rounded ${brand.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                        onClick={() => toggleBrandStatus(brand)}
                                                    >
                                                        {brand.status === 1 ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className='text-center border-b p-4'>
                                                    {brand.status === 1 && (
                                                        <button
                                                            className="bg-blue-500 text-white px-4 py-1 rounded"
                                                            onClick={() => editBrand(brand)}
                                                            aria-label={`Edit brand ${brand.name}`}
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className='text-center py-4'>No brand found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                </div>
            </div>

            {(isEditing || isAdding) && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4">
                        <div className="flex justify-between items-center">
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Brand" : "Edit Brand"}</h5>
                            <button type="button" className="text-black" onClick={() => { setIsAdding(false); setIsEditing(false); }}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={isAdding ? addBrand : handleEditSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Brand Name</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newBrandName : editedName}
                                    onChange={(e) => isAdding ? setNewBrandName(e.target.value) : setEditedName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Brand Description</label>
                                <textarea
                                    className="border rounded-lg p-2 w-full"
                                    value={isAdding ? newBrandDescription : editedDescription}
                                    onChange={(e) => isAdding ? setNewBrandDescription(e.target.value) : setEditedDescription(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Banner Image</label>
                                <input
                                    type="file"
                                    className='border rounded w-full p-2'
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, isAdding ? setNewBannerImage : setEditedBannerImage)}
                                />
                                <div className="mt-2">
                                    {isAdding && newBannerImage ? newBannerImage.name : editedBannerImage ? editedBannerImage.name : ''}
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Main Image</label>
                                <input
                                    type="file"
                                    className='border rounded w-full p-2'
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, isAdding ? setNewMainImage : setEditedMainImage)}
                                />
                                <div className="mt-2">
                                    {isAdding && newMainImage ? newMainImage.name : editedMainImage ? editedMainImage.name : ''}
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Description Image</label>
                                <input
                                    type="file"
                                    className='border rounded w-full p-2'
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, isAdding ? setNewDescriptionImage : setEditedDescriptionImage)}
                                />
                                <div className="mt-2">
                                    {isAdding && newDescriptionImage ? newDescriptionImage.name : editedDescriptionImage ? editedDescriptionImage.name : ''}
                                </div>
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
