import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import { BASE_IMAGE_URL } from '../../../Utils/const';
import Swal from 'sweetalert2';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [newCategoryBannerImage, setNewCategoryBannerImage] = useState(null);
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('');
    const [newDisplayShopByCategory, setNewDisplayShopByCategory] = useState(1); // Default value
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedColor, setEditedColor] = useState('');
    const [editedImage, setEditedImage] = useState(null);
    const [editedBannerImage, setEditedBannerImage] = useState(null);
    const [editedDisplayShopByCategory, setEditedDisplayShopByCategory] = useState(1); // Default value
    const [errorMessage, setErrorMessage] = useState('');
    const dropdownRef = useRef([]);

    useEffect(() => {
        fetchAllCategories();
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.some(ref => ref && ref.contains(event.target))) {
                setOpenDropdownIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isEditing || isAdding) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isEditing, isAdding]);

    const fetchAllCategories = () => {
        setLoading(true);
        axiosClient.get('/categories')
            .then(res => {
                setLoading(false);
                setCategories(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const editCategory = (category) => {
        setSelectedCategory(category);
        setEditedName(category.name);
        setEditedDescription(category.description);
        setEditedColor(category.color);
        setEditedDisplayShopByCategory(category.display_shop_by_category);
        setEditedImage(null);
        setEditedBannerImage(null);
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
        formData.append('description', editedDescription);
        formData.append('color', editedColor);
        formData.append('display_shop_by_category', editedDisplayShopByCategory);
        
        if (editedImage) {
            try {
                const webpImage = await convertToWebP(editedImage);
                formData.append('image', webpImage);
            } catch (error) {
                setErrorMessage('Error converting image to WebP format.');
                return;
            }
        }

        if (editedBannerImage) {
            try {
                const webpImage = await convertToWebP(editedBannerImage);
                formData.append('banner_image', webpImage);
            } catch (error) {
                setErrorMessage('Error converting image to WebP format.');
                return;
            }
        }

        try {
            await axiosClient.post(`/categories/update/${selectedCategory.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            Swal.fire('Success', 'Category Updated Successfully!', 'success');
            fetchAllCategories();
            resetEditState();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to updated Category. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const addCategory = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!newCategoryName) {
            setErrorMessage("The name field is required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', newCategoryName);
        formData.append('description', newCategoryDescription);
        formData.append('color', newCategoryColor);
        formData.append('display_shop_by_category', newDisplayShopByCategory);
        
        if (newCategoryImage) {
            try {
                const webpImage = await convertToWebP(newCategoryImage);
                formData.append('image', webpImage);
            } catch (error) {
                setErrorMessage('Error converting image to WebP format.');
                return;
            }
        }

        if (newCategoryBannerImage) {
            try {
                const webpImage = await convertToWebP(newCategoryBannerImage);
                formData.append('banner_image', webpImage);
            } catch (error) {
                setErrorMessage('Error converting image to WebP format.');
                return;
            }
        }

        try {
            await axiosClient.post('/categories/store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            Swal.fire('Success', 'Category Created Successfully!', 'success');
            fetchAllCategories();
            resetAddState();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to transaction. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const convertToWebP = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), { type: 'image/webp' });
                        resolve(webpFile);
                    } else {
                        reject(new Error('Failed to convert image to WebP format.'));
                    }
                }, 'image/webp');
            };
            reader.readAsDataURL(file);
        });
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

    const toggleCategoryStatus = (category) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        axiosClient.post(`/categories/toggle-status/${category.id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            fetchAllCategories();
        })
        .catch((err) => {
            handleError(err);
        });
    };

    const resetEditState = () => {
        setIsEditing(false);
        setSelectedCategory(null);
        setEditedName('');
        setEditedDescription('');
        setEditedColor('');
        setEditedDisplayShopByCategory(1); // Reset default value
        setEditedImage(null);
        setEditedBannerImage(null);
        setErrorMessage('');
    };

    const resetAddState = () => {
        setIsAdding(false);
        setNewCategoryName('');
        setNewCategoryDescription('');
        setNewCategoryColor('');
        setNewDisplayShopByCategory(1); // Reset default value
        setNewCategoryImage(null);
        setNewCategoryBannerImage(null);
        setErrorMessage('');
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Category List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex justify-end mb-4">
                            <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => setIsAdding(true)}>Add Category</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center p-4">S.No</th>
                                        <th className="border-b text-center p-4">Image</th>
                                        <th className="border-b text-center p-4">Banner Image</th>
                                        <th className="border-b text-center p-4">Name</th>
                                        <th className="border-b text-center p-4">Slug</th>
                                        <th className="border-b text-center p-4">Status</th>
                                        <th className="border-b text-center p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 ? categories.map((category, index) => (
                                        <tr key={category.id} className="hover:bg-gray-100">
                                            <td className='text-center border-b p-4'>{index + 1}</td>
                                            <td className='text-center border-b p-4'>
                                                {category.image_path && (
                                                    <img
                                                        src={`${BASE_IMAGE_URL}${category.image_path}`}
                                                        alt={category.name}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                )}
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {category.banner_image && (
                                                    <img
                                                        src={`${BASE_IMAGE_URL}${category.banner_image}`}
                                                        alt={category.name}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                )}
                                            </td>
                                            <td className='border-b p-4'>{category.name}</td>
                                            <td className='border-b p-4'>{category.slug}</td>
                                            <td className='text-center border-b p-4'>
                                                <button
                                                    className={`px-3 py-1 rounded ${category.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleCategoryStatus(category)}
                                                >
                                                    {category.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {category.status === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editCategory(category)}
                                                        aria-label={`Edit category ${category.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="100" className='text-center border-b p-4'>No category found</td>
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
                            <h3 className="text-lg font-semibold">{isAdding ? "Add Category" : "Edit Category"}</h3>
                            <button type="button" className="text-gray-600" onClick={() => resetAddState() || resetEditState()}>
                                <span>&times;</span>
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={isAdding ? addCategory : handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Category Name</label>
                                <input
                                    type="text"
                                    className="border rounded-lg p-2 w-full"
                                    value={isAdding ? newCategoryName : editedName}
                                    onChange={(e) => isAdding ? setNewCategoryName(e.target.value) : setEditedName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Category Description</label>
                                <textarea
                                    className="border rounded-lg p-2 w-full"
                                    value={isAdding ? newCategoryDescription : editedDescription}
                                    onChange={(e) => isAdding ? setNewCategoryDescription(e.target.value) : setEditedDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Category Color</label>
                                <input
                                    type="color"
                                    className="border rounded-lg p-2 w-full"
                                    value={isAdding ? newCategoryColor : editedColor}
                                    onChange={(e) => isAdding ? setNewCategoryColor(e.target.value) : setEditedColor(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Display Shop by Category</label>
                                <select 
                                    className="border rounded-lg p-2 w-full"
                                    value={isAdding ? newDisplayShopByCategory : editedDisplayShopByCategory}
                                    onChange={(e) => isAdding ? setNewDisplayShopByCategory(e.target.value) : setEditedDisplayShopByCategory(e.target.value)}
                                >
                                    <option value={1}>Yes</option>
                                    <option value={2}>No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Category Image</label>
                                <input
                                    type="file"
                                    className='border rounded-lg p-2 w-full'
                                    accept="image/*"
                                    onChange={(e) => isAdding ? setNewCategoryImage(e.target.files[0]) : setEditedImage(e.target.files[0])}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Banner Image</label>
                                <input
                                    type="file"
                                    className='border rounded-lg p-2 w-full'
                                    accept="image/*"
                                    onChange={(e) => isAdding ? setNewCategoryBannerImage(e.target.files[0]) : setEditedBannerImage(e.target.files[0])}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={() => resetAddState() || resetEditState()}>Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isAdding ? "Add" : "Save"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
