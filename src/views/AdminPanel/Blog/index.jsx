import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../Components/Spinner';
import axiosClient from '../../../axiosClient';
import { BASE_IMAGE_URL } from '../../../Utils/const';
const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 15;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogsAndCategories = async () => {
            setLoading(true);
            try {
                const blogsResponse = await axiosClient.get('/blogs');
                setBlogs(blogsResponse.data.data);
                const categoriesResponse = await axiosClient.get('/blog-categories');
                setCategories(categoriesResponse.data.data);
            } catch (error) {
                setError("Failed to load blogs and categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogsAndCategories();
    }, []);

    const filterBlogs = () => {
        setCurrentPage(1); // Reset to first page on new filter
    };

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesTitle = blog.title?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter ? blog.category?.toLowerCase() === categoryFilter.toLowerCase() : true;

            const blogDate = new Date(blog.date);
            //const isInRange = (!startDate || blogDate >= new Date(startDate)) && (!endDate || blogDate <= new Date(endDate));

            return matchesTitle && matchesCategory;
        });
    }, [blogs, searchTerm, categoryFilter]);

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

    const toggleBlogStatus = async (blog) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return alert("No access token found");

        try {
            await axiosClient.post(`/blogs/toggle-status/${blog.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlogs(prevBlogs => 
                prevBlogs.map(b => (b.id === blog.id ? { ...b, status: b.status === 1 ? 0 : 1 } : b))
            );
            filterBlogs(); // Reapply filters after status change
        } catch (err) {
            setError("Failed to update blog status.");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString() || 'N/A';
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Blog List</h2>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                    <div>
                        <label>Blog Title</label>
                        <input
                            type="text"
                            placeholder="Search by blog title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border rounded-lg p-2 mb-4"
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="border rounded-lg p-2 mb-4"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex space-x-1">
                        <button onClick={filterBlogs} className="bg-blue-500 text-white px-4 py-2 rounded">Filter Data</button>
                    </div>
                </div>
                
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <div className="text-red-600">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                    {['S.No', 'Image', 'Title', 'Date', 'Category', 'Status', 'Actions'].map(header => (
                                        <th key={header} className="border-b text-center p-4">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentBlogs.length > 0 ? currentBlogs.map((blog, index) => (
                                    <tr key={blog.id} className="hover:bg-gray-100">
                                        <td className='text-center border-b p-4'>{startIndex + index + 1}</td>
                                        <td className='text-center border-b p-4'>
                                            {blog.blog_image && (
                                                <img
                                                    src={`${BASE_IMAGE_URL}${blog.blog_image}`}
                                                    alt={blog.title || "Blog Image"}
                                                    className="w-12 h-12 object-cover"
                                                />
                                            )}
                                        </td>
                                        <td className='border-b p-4 cursor-pointer' onClick={() => navigate(`/admin/blogs/detail/${blog.id}`)}>
                                            {blog.title}
                                        </td>
                                        <td className='border-b p-4'>{formatDate(blog.date)}</td>
                                        <td className='border-b p-4'>{blog.category || 'N/A'}</td>
                                        <td className='border-b text-center py-2'>
                                            <button
                                                className={`py-1 px-3 rounded ${blog.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                onClick={() => toggleBlogStatus(blog)}
                                            >
                                                {blog.status === 1 ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className='border-b p-4 text-center'>
                                            {blog.status === 1 && (
                                                <button
                                                    onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className='text-center border-b p-4'>No blogs found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
