import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function ProductReviewsList() {
    const [productReviews, setProductReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllProductReviews();
    }, []);

    const fetchAllProductReviews = () => {
        setLoading(true);
        axiosClient.get('/products/allReviews')
            .then(res => {
                setLoading(false);
                setProductReviews(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
                handleError(err);
            });
    };

    const handleError = (err) => {
        let message = 'An error occurred';
        if (err.response) {
            console.error("Error Response:", err.response.data);
            message = err.response.data.message || "An error occurred";
        } else {
            console.error("Error:", err);
        }
        setErrorMessage(message);
        Swal.fire('Error', message, 'error'); // Show SweetAlert for error
    };

    const toggleProductReviewStatus = (productReview) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) {
            Swal.fire('Error', 'No access token found', 'error');
            return;
        }

        axiosClient.post(`/products/product_review/toggle-status/${productReview.id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            Swal.fire('Success', 'Product review status updated', 'success');
            fetchAllProductReviews();
        })
        .catch(err => {
            handleError(err);
        });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Product Reviews List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Product Name</th>
                                        <th className="border-b text-center py-2">User Type</th>
                                        <th className="border-b text-center py-2">User Name</th>
                                        <th className="border-b text-center py-2">Title</th>
                                        <th className="border-b text-center py-2">Message</th>
                                        <th className="border-b text-center py-2">Rating</th>
                                        <th className="border-b text-center py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productReviews.length > 0 ? productReviews.map((productReview, index) => (
                                        <tr key={productReview.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{productReview.product?.name}</td>
                                            <td className="border-b text-center py-2">{productReview.user_type === 1 ? 'Admin' : 'User'}</td>
                                            <td className="border-b py-2">{productReview.user?.name || 'N/A'}</td>
                                            <td className="border-b py-2">{productReview.title}</td>
                                            <td className="border-b py-2">{productReview.message}</td>
                                            <td className="border-b text-center py-2">{productReview.star_rating}</td>
                                            <td className='border-b text-center py-2'>
                                                <button
                                                    className={`py-1 px-3 rounded ${productReview.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleProductReviewStatus(productReview)}
                                                >
                                                    {productReview.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4">No Product Reviews found</td>
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
    );
}
