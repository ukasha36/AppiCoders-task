import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axiosClient'; // Adjust the import according to your project structure

const DispatchModal = ({ isOpen, onClose, order, onDispatch, loading }) => {
    const [dispatchDate, setDispatchDate] = useState('');
    const [barcodes, setBarcodes] = useState({}); // Store barcodes by product ID and weight ID
    const [selectedBarcodes, setSelectedBarcodes] = useState({}); // Store selected barcodes for each item

    useEffect(() => {
        if (isOpen && order) {
            const fetchBarcodes = async () => {
                try {
                    const requests = order.order_detail.map(item => 
                        axiosClient.get('/stocks/barcodes', {
                            params: { 
                                product_id: item.product.id, 
                                weight_id: item.weight_id, 
                                qty: item.quantity
                            }
                        })
                    );
                    const responses = await Promise.all(requests);
                    const barcodeData = {};
                    
                    responses.forEach((res, index) => {
                        const item = order.order_detail[index];
                        barcodeData[item.product.id] = barcodeData[item.product.id] || {};
                        barcodeData[item.product.id][item.weight_id] = res.data.data || []; // Store barcodes by weight_id
                    });
                    
                    setBarcodes(barcodeData);
                } catch (error) {
                    console.error('Error fetching barcodes:', error);
                }
            };

            fetchBarcodes();
        }
    }, [isOpen, order]);

    const handleBarcodeChange = (itemId, productId, weightId, value) => {
        setSelectedBarcodes(prev => ({
            ...prev,
            [`${itemId}_${productId}_${weightId}`]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (dispatchDate && order) {
            // Create an array of selected barcodes
            const barcodesToDispatch = order.order_detail.map(item => ({
                productId: item.product.id,
                weightId: item.weight_id,
                itemId: item.id,
                qty: item.quantity,
                barcode: selectedBarcodes[`${item.id}_${item.product.id}_${item.weight_id}`] || '',
            }));

            onDispatch(order.id, { 
                dispatchDate, 
                barcodes: barcodesToDispatch,
                invoiceDataId: order.invoiceDataId // Assuming invoiceDataId is part of the order
            });
            onClose(); // Close modal after dispatch
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl">
                <h2 className="text-lg font-semibold mb-4">Dispatch Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Dispatch Date</label>
                        <input 
                            type="date" 
                            value={dispatchDate} 
                            onChange={(e) => setDispatchDate(e.target.value)} 
                            className="border rounded-lg p-2 w-full" 
                            required 
                        />
                    </div>
                    <div id="invoice-content" className="space-y-4">
                        <div className="border-b pb-4">
                            <h3 className="text-lg font-semibold">Invoice Information</h3>
                            <table className='min-w-full'>
                                <tbody>
                                    <tr>
                                        <th className="text-left font-medium">Order No:</th>
                                        <td>{order?.order_no}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left font-medium">Order Date:</th>
                                        <td>{order?.created_date}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left font-medium">Invoice ID:</th>
                                        <td>{order?.invoiceDataId}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Order Summary</h3>
                            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded">
                                <table className='min-w-full'>
                                    <thead>
                                        <tr>
                                            <th className="text-left border-b p-2">Category</th>
                                            <th className="text-left border-b p-2">Brand</th>
                                            <th className="text-left border-b p-2">Item</th>
                                            <th className="text-left border-b p-2">Variant</th>
                                            <th className="text-left border-b p-2">Quantity</th>
                                            <th className="text-left border-b p-2">Price</th>
                                            <th className="text-left border-b p-2">Bar Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.order_detail?.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="border-b p-2">{item.category.name}</td>
                                                <td className="border-b p-2">{item.brand.name}</td>
                                                <td className="border-b p-2">{item.product.name}</td>
                                                <td className="border-b p-2">{item.size.name}</td>
                                                <td className="border-b p-2">{item.quantity}</td>
                                                <td className="border-b p-2">${item.product_sub_total}</td>
                                                <td className="border-b p-2">
                                                    {item.bar_code ? (
                                                        item.bar_code
                                                    ) : (
                                                        <select 
                                                            name={`bar_code_${item.id}_${item.product.id}_${item.weight_id}`} 
                                                            className="border rounded-lg p-1"
                                                            onChange={(e) => handleBarcodeChange(item.id, item.product.id, item.weight_id, e.target.value)}
                                                            value={selectedBarcodes[`${item.id}_${item.product.id}_${item.weight_id}`] || ''}
                                                        >
                                                            <option value="">Select Barcode</option>
                                                            {Array.isArray(barcodes[item.product.id]?.[item.weight_id]) && barcodes[item.product.id][item.weight_id].map((barcode) => (
                                                                <option key={barcode.bar_code} value={barcode.bar_code}>{barcode.bar_code}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="font-semibold">
                                            <td colSpan="5" className="border-t p-2 text-right">Grand Total:</td>
                                            <td className="border-t p-2">${order?.grand_total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="bg-gray-300 text-black p-2 rounded mr-2">Cancel</button>
                        <button 
                            type="submit" 
                            className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Dispatch'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DispatchModal;
