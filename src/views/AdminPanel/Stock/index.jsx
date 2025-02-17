import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';
import PrintBarcodeModal from './PrintBarcodeModal'; // Import the modal

export default function StockList() {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchAllCategories();
        fetchAllBrands();
        filterStockData();
    }, []);

    useEffect(() => {
        if (selectedCategory || selectedBrand) {
            filterStockData();
        }
    }, [selectedCategory, selectedBrand, fromDate, toDate]);

    const fetchAllCategories = async () => {
        try {
            const res = await axiosClient.get('/categories');
            setCategories(res.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            Swal.fire('Error', 'Failed to fetch categories.', 'error');
        }
    };

    const fetchAllBrands = async () => {
        try {
            const res = await axiosClient.get('/brands');
            setBrands(res.data.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
            Swal.fire('Error', 'Failed to fetch brands.', 'error');
        }
    };

    const filterStockData = async () => {
        setLoading(true);
        setErrorMessage('');

        // Validate date range
        if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
            setErrorMessage('To Date must be greater than From Date.');
            setLoading(false);
            return;
        }

        try {
            const res = await axiosClient.post(`/stocks/filter_stocks`, { 
                category_id: selectedCategory, 
                brand_id: selectedBrand,
                from_date: fromDate,
                to_date: toDate
            });
            setProducts(res.data.data);
        } catch (error) {
            console.error('Error fetching stocks:', error);
            Swal.fire('Error', 'Failed to fetch stock data.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleChangeBrand = (e) => {
        setSelectedBrand(e.target.value);
    };

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    const handlePrintBarcode = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Stock List</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                {/* Filters and buttons here... */}
            </div>

            <div className="mt-4">
                {loading ? (
                    <Spinner />
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
                                    <th className='border-b text-center p-2'>Bar Code</th>
                                    <th className='border-b text-center p-2'>Stock</th>
                                    <th className='border-b text-center p-2'>Dispatch Qty</th>
                                    <th className='border-b text-center p-2'>Current Balance</th>
                                    <th className='border-b text-center p-2'>Expiry Date</th>
                                    <th className='border-b text-center p-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className='border-b text-center p-2'>{index + 1}</td>
                                        <td className='border-b p-2'>{product.category_name}</td>
                                        <td className='border-b p-2'>{product.brand_name}</td>
                                        <td className='border-b p-2'>{product.name}</td>
                                        <td className='border-b p-2'>{product.size_name}</td>
                                        <td className='border-b p-2'>{product.bar_code}</td>
                                        <td className='border-b p-2'>{product.quantity}</td>
                                        <td className='border-b p-2'>{product.dispatchQty}</td>
                                        <td className='border-b p-2'>{product.quantity - product.dispatchQty}</td>
                                        <td className='border-b p-2'>{product.expiry_date || 'N/A'}</td>
                                        <td className='border-b p-2'>
                                            <button onClick={() => handlePrintBarcode(product)}>Print Bar Code</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className='text-center'>No products available for the selected category and brand.</p>
                )}
            </div>

            {/* Print Barcode Modal */}
            <PrintBarcodeModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                product={selectedProduct} 
            />
        </div>
    );
}
