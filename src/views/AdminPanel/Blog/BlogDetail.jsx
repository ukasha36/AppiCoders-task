import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import { BASE_IMAGE_URL } from '../../../Utils/const';
import Spinner from '../../../Components/Spinner';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(`/blogs/details/${id}`);
                setBlog(response.data.data.blog);
            } catch (error) {
                setError("Failed to load blog details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [id]);

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-600">{error}</div>;
    if (!blog) return <div>No blog found.</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{blog.title}</h2>
                <img
                    src={`${BASE_IMAGE_URL}${blog.blog_image}`}
                    alt={blog.title}
                    className="w-full h-auto mb-3"
                />
                <p>{new Date(blog.date).toLocaleDateString()}</p>
                <p>{blog.category}</p>
                <div className="mt-4">{blog.body}</div>
            </div>
        </div>
    );
};

export default BlogDetail;
