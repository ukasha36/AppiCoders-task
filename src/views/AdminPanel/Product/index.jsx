import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../Components/Spinner';
import axiosClient from '../../../axiosClient';
import { BASE_IMAGE_URL } from '../../../Utils/const';

const ProductList = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15); // Items per page
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosClient.get('/products');
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategoriesAndBrands = async () => {
            try {
                const categoriesResponse = await axiosClient.get('/categories');
                const brandsResponse = await axiosClient.get('/brands');
                setCategories(categoriesResponse.data.data);
                setBrands(brandsResponse.data.data);
            } catch (error) {
                console.error("Error fetching categories and brands:", error);
            }
        };

        fetchProducts();
        fetchCategoriesAndBrands();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? product.category.id === parseInt(categoryFilter) : true;
        const matchesBrand = brandFilter ? product.brand?.id === parseInt(brandFilter) : true;
        
        return matchesName && matchesCategory && matchesBrand;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const toggleProductStatus = async (product) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return alert("No access token found");

        try {
            await axiosClient.post(`/products/toggle-status/${product.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(prevProducts => 
                prevProducts.map(p => (p.id === product.id ? { ...p, status: p.status === 1 ? 0 : 1 } : p))
            );
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Product List</h2>
                <div className="flex space-x-4 mb-4">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border rounded-lg p-2"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    
                    <select
                        value={brandFilter}
                        onChange={(e) => setBrandFilter(e.target.value)}
                        className="border rounded-lg p-2"
                    >
                        <option value="">All Brands</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                    
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-lg p-2"
                    />
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border-b text-center p-4">S.No</th>
                                    <th className="border-b text-center p-4">Image</th>
                                    <th className="border-b text-center p-4">Category Name</th>
                                    <th className="border-b text-center p-4">Brand Name</th>
                                    <th className="border-b text-center p-4">Name</th>
                                    <th className="border-b text-center p-4">Slug</th>
                                    <th className="border-b text-center p-4">Description</th>
                                    <th className="border-b text-center p-4">Price</th>
                                    <th className="border-b text-center p-4">Discount</th>
                                    <th className="border-b text-center p-4">Status</th>
                                    <th className="border-b text-center p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.length > 0 ? currentProducts.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-gray-100">
                                        <td className='text-center border-b p-4'>{startIndex + index + 1}</td>
                                        <td className='text-center border-b p-4'>
                                            {product.image_path && (
                                                <img
                                                    src={`${BASE_IMAGE_URL}${product.image_path}`}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover"
                                                />
                                            )}
                                        </td>
                                        <td className='border-b p-4'>{product.category.name}</td>
                                        <td className='border-b p-4'>{product.brand?.name}</td>
                                        <td className='border-b p-4'>{product.name}</td>
                                        <td className='border-b p-4'>{product.slug}</td>
                                        <td className='border-b p-4'>{product.product_description}</td>
                                        <td className='border-b p-4'>{product.amount}</td>
                                        <td className='border-b p-4'>{product.discount_percent}%</td>
                                        <td className='border-b text-center py-2'>
                                            <button
                                                className={`py-1 px-3 rounded ${product.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                onClick={() => toggleProductStatus(product)}
                                            >
                                                {product.status === 1 ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className='border-b p-4 text-center'>
                                            {product.status === 1 && (
                                                <button
                                                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                                    className="bg-blue-500 text-white px-4 py-1 rounded"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="11" className='text-center border-b p-4'>No products found</td>
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

export default ProductList;
