import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_ENDPOINTS = {
    categories: '/categories',
    brands: '/brands',
    products: '/products/filter_products',
    storeStock: '/stocks/store',
};

export default function StockAdd() {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [stockQuantities, setStockQuantities] = useState([]);
    const [expiryDates, setExpiryDates] = useState([]);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchAllCategories(), fetchAllBrands()]);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory || selectedBrand) {
            fetchAllProductsByCategoryAndBrand(selectedCategory, selectedBrand);
        } else {
            setProducts([]);
        }
    }, [selectedCategory, selectedBrand]);

    const fetchAllCategories = async () => {
        try {
            const res = await axiosClient.get(API_ENDPOINTS.categories);
            setCategories(res.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setSubmissionStatus('Failed to fetch categories.');
        }
    };

    const fetchAllBrands = async () => {
        try {
            const res = await axiosClient.get(API_ENDPOINTS.brands);
            setBrands(res.data.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setSubmissionStatus('Failed to fetch brands.');
        }
    };

    const fetchAllProductsByCategoryAndBrand = async (categoryId, brandId) => {
        setLoading(true);
        try {
            const res = await axiosClient.get(`${API_ENDPOINTS.products}?category_id=${categoryId}&brand_id=${brandId}`);
            setProducts(res.data.data);
            setStockQuantities(new Array(res.data.data.length).fill(0));
            setExpiryDates(new Array(res.data.data.length).fill(''));
        } catch (error) {
            console.error('Error fetching products:', error);
            setSubmissionStatus('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setProducts([]);
        setStockQuantities([]);
        setExpiryDates([]);
    };

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
        resetForm();
        setSelectedBrand('');
    };

    const handleChangeBrand = (e) => {
        setSelectedBrand(e.target.value);
        resetForm();
    };

    const handleStockQuantityChange = (index, value) => {
        const numericValue = Math.max(0, parseInt(value, 10) || 0);
        const updatedQuantities = [...stockQuantities];
        updatedQuantities[index] = numericValue;
        setStockQuantities(updatedQuantities);
    };

    const handleExpiryDateChange = (index, value) => {
        const updatedExpiryDates = [...expiryDates];
        updatedExpiryDates[index] = value;
        setExpiryDates(updatedExpiryDates);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(null);
        setLoading(true);
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            setSubmissionStatus("No access token found");
            setLoading(false);
            return;
        }

        const submissionData = products.map((product, index) => ({
            productId: product.id,
            quantity: stockQuantities[index],
            expiryDate: expiryDates[index] || null,
            weightId: product.weight_id || null,
        }));

        try {
            await axiosClient.post(API_ENDPOINTS.storeStock, { stocks: submissionData }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Stock has been updated successfully!',
            });
            navigate('/admin/stocks');
        } catch (error) {
            console.error('Error during submission:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to submit stock.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Add Stock Form</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            className="border rounded-lg p-2 w-full"
                            value={selectedCategory}
                            onChange={handleChangeCategory}
                            required
                            disabled={loading}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Brand</label>
                        <select
                            className="border rounded-lg p-2 w-full"
                            value={selectedBrand}
                            onChange={handleChangeBrand}
                            disabled={loading}
                        >
                            <option value="">Select a brand</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Available Products</h3>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : products.length > 0 ? (
                        <div className='overflow-x-auto'>
                            <table className='min-w-full border border-gray-300'>
                                <thead>
                                    <tr>
                                        <th className='border-b text-center p-2'>S.No</th>
                                        <th className='border-b text-center p-2'>Category</th>
                                        <th className='border-b text-center p-2'>Brand</th>
                                        <th className='border-b text-center p-2'>Product</th>
                                        <th className='border-b text-center p-2'>Variant</th>
                                        <th className='border-b text-center p-2'>Stock</th>
                                        <th className='border-b text-center p-2'>Expiry Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className='border-b text-center p-2'>{index + 1}</td>
                                            <td className='border-b p-2'>{product.category?.name ?? '-'}</td>
                                            <td className='border-b p-2'>{product.brand?.name ?? '-'}</td>
                                            <td className='border-b p-2'>{product.name}</td>
                                            <td className='border-b p-2'>{product.size_name}</td>
                                            <td className='border-b p-2'>
                                                <input
                                                    type="number"
                                                    value={stockQuantities[index] || ''}
                                                    onChange={(e) => handleStockQuantityChange(index, e.target.value)}
                                                    className='border rounded-lg p-1 w-full'
                                                    min="0"
                                                    placeholder="Enter quantity"
                                                />
                                            </td>
                                            <td className='border-b p-2'>
                                                <input
                                                    type="date"
                                                    value={expiryDates[index] || ''}
                                                    onChange={(e) => handleExpiryDateChange(index, e.target.value)}
                                                    className='border rounded-lg p-1 w-full'
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Stock'}
                            </button>
                        </div>
                    ) : (
                        <p className='text-center'>No products available for the selected category and brand.</p>
                    )}
                </div>

                {submissionStatus && (
                    <div className={`mt-4 p-2 ${submissionStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                        {submissionStatus}
                    </div>
                )}
            </form>
        </div>
    );
}
