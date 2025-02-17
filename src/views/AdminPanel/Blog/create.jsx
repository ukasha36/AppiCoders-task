import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function BlogCreate() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingCategories, setFetchingCategories] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        blog_date: '',
        blog_title: '',
        category_id: '',
        blog_description: '',
        mainImage: null,
        blogImages: [],
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setFetchingCategories(true);
        try {
            const response = await axiosClient.get('/blog-categories/1');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories.');
        } finally {
            setFetchingCategories(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setBlog(prev => ({
            ...prev,
            [name]: files ? Array.from(files) : value,
            ...(name === 'mainImage' && { mainImage: files[0] }),
        }));
    };

    const handleDescriptionChange = (value) => {
        setBlog(prev => ({ ...prev, blog_description: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) {
            alert("No access token found");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        for (const key in blog) {
            if (Array.isArray(blog[key])) {
                blog[key].forEach((file) => {
                    formData.append(`${key}[]`, file);
                });
            } else {
                formData.append(key, blog[key]);
            }
        }

        try {
            await axiosClient.post('/blogs/store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            Swal.fire('Success', 'Blog created Successfully!', 'success');
            navigate('/admin/blogs');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to created Blog. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setError(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit}>
                    {/* Date Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            name="blog_date"
                            className='border rounded-lg p-2 w-full'
                            value={blog.blog_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Title Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="blog_title"
                            className='border rounded-lg p-2 w-full'
                            value={blog.blog_title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Category Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            className="border rounded-lg p-2 w-full"
                            name="category_id"
                            value={blog.category_id}
                            onChange={handleChange}
                            required
                            disabled={fetchingCategories}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* Description Text Editor */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Blog Description</label>
                        <ReactQuill
                            value={blog.blog_description}
                            onChange={handleDescriptionChange}
                            required
                            className='border rounded-lg p-2 w-full'
                            style={{ height: '200px' }}
                        />
                    </div>
                    {/* Main Image Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Main Image</label>
                        <input
                            type="file"
                            className='border rounded-lg p-2 w-full'
                            accept="image/*"
                            name="mainImage"
                            onChange={handleChange}
                        />
                    </div>
                    {/* Additional Images Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Images</label>
                        <input
                            type="file"
                            className='border rounded-lg p-2 w-full'
                            accept="image/*"
                            multiple
                            name="blogImages"
                            onChange={handleChange}
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${loading || fetchingCategories ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading || fetchingCategories}
                    >
                        {loading ? 'Creating...' : 'Create Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
}
