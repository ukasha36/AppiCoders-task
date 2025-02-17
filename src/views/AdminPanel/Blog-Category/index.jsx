import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BlogCategories() {
    const [blogCategories, setBlogCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({
        id: null,
        name: '',
        slug: '',
        meta_title: '',
        meta_description: '',
        description: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllBlogCategories();
    }, []);

    const fetchAllBlogCategories = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/blog-categories');
            setBlogCategories(res.data.data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (field, value) => {
        setCurrentCategory((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return Swal.fire('Error', 'No access token found', 'error');

        const { name, slug, meta_title, meta_description, description } = currentCategory;
        if (!name) return Swal.fire('Error', "The name field is required.", 'error');

        const formData = new FormData();
        Object.entries({ name, slug, meta_title, meta_description, description }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            if (isAdding) {
                await axiosClient.post('/blog-categories/store', formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Swal.fire('Success', 'Blog Category added successfully!', 'success');
            } else {
                await axiosClient.post(`/blog-categories/update/${currentCategory.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Swal.fire('Success', 'Blog Category updated successfully!', 'success');
            }
            fetchAllBlogCategories();
            resetForm();
        } catch (err) {
            handleError(err);
        }
    };

    const resetForm = () => {
        setCurrentCategory({ id: null, name: '', slug: '', meta_title: '', meta_description: '', description: '' });
        setIsAdding(false);
        setIsEditing(false);
    };

    const editBlogCategory = (blogCategory) => {
        setCurrentCategory(blogCategory);
        setIsEditing(true);
    };

    const toggleBlogCategoryStatus = async (blogCategory) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return Swal.fire('Error', 'No access token found', 'error');

        try {
            await axiosClient.post(`/blog-categories/toggle-status/${blogCategory.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAllBlogCategories();
            Swal.fire('Success', 'Blog Category status updated successfully!', 'success');
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
                <h2 className="text-lg font-semibold mb-4">Blog Category List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add Blog Category</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">Slug</th>
                                        <th className="border-b text-center py-2">Meta Title</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogCategories.length > 0 ? blogCategories.map((category, index) => (
                                        <tr key={category.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{category.name}</td>
                                            <td className="border-b py-2">{category.slug}</td>
                                            <td className="border-b py-2">{category.meta_title}</td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${category.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleBlogCategoryStatus(category)}
                                                >
                                                    {category.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {category.status === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editBlogCategory(category)}
                                                        aria-label={`Edit Blog Category ${category.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">No Blog Category found</td>
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
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Blog Category" : "Edit Blog Category"}</h5>
                            <button type="button" className="text-black" onClick={resetForm}>
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Blog Category Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="border rounded w-full p-2"
                                    value={currentCategory.name}
                                    onChange={handleCategoryChange}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    className="border rounded w-full p-2"
                                    value={currentCategory.slug}
                                    onChange={handleCategoryChange}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    name="meta_title"
                                    className="border rounded w-full p-2"
                                    value={currentCategory.meta_title}
                                    onChange={handleCategoryChange}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Meta Description</label>
                                <ReactQuill
                                    value={currentCategory.meta_description}
                                    onChange={(value) => handleEditorChange('meta_description', value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Description</label>
                                <ReactQuill
                                    value={currentCategory.description}
                                    onChange={(value) => handleEditorChange('description', value)}
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
