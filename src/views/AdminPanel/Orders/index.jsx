import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../Components/Spinner';
import axiosClient from '../../../axiosClient';
import InvoiceModal from './InvoiceModal';
import DispatchModal from './DispatchModal';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';

const OrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoiceLoading, setInvoiceLoading] = useState(false);
    
    const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
    const [dispatchData, setDispatchData] = useState(null);
    const [dispatchLoading, setDispatchLoading] = useState(false);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setFromDate(currentDate);
        setToDate(currentDate);
        fetchOrders(currentDate, currentDate, '', '');
    }, []);

    useEffect(() => {
        if (fromDate && toDate) {
            fetchOrders(fromDate, toDate, searchTerm, orderStatus);
        }
    }, [fromDate, toDate, searchTerm, orderStatus]);

    const handleFromDateChange = (e) => setFromDate(e.target.value);
    const handleToDateChange = (e) => setToDate(e.target.value);
    
    const handleSearchChange = debounce((e) => {
        setSearchTerm(e.target.value);
    }, 300);

    const fetchOrders = async (fromDate, toDate, searchTerm, orderStatus) => {
        setLoading(true);
        setErrorMessage('');

        if (new Date(fromDate) > new Date(toDate)) {
            setErrorMessage('To Date must be greater than From Date.');
            Swal.fire('Error', 'To Date must be greater than From Date.', 'error');
            setLoading(false);
            return;
        }

        try {
            const res = await axiosClient.get('/orders', {
                params: { from_date: fromDate, to_date: toDate, search: searchTerm, status: orderStatus },
            });
            setOrders(res.data.data);
        } catch (error) {
            setErrorMessage('Error fetching orders. Please try again later.');
            console.error('Error fetching orders:', error);
            Swal.fire('Error', 'Error fetching orders. Please try again later.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const resetFilters = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        setFromDate(currentDate);
        setToDate(currentDate);
        setSearchTerm('');
        setOrderStatus('');
        Swal.fire('Reset', 'Filters have been reset.', 'info');
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axiosClient.put(`/orders/${orderId}/status`, { status: newStatus });
            fetchOrders(fromDate, toDate, searchTerm, orderStatus);
            Swal.fire('Success', 'Order status updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating order status:', error);
            Swal.fire('Error', 'Error updating order status. Please try again.', 'error');
        }
    };

    const openInvoiceModal = async (orderId) => {
        setInvoiceLoading(true);
        setIsModalOpen(true);
        try {
            const res = await axiosClient.get(`/orders/${orderId}/invoice`);
            setSelectedInvoice(res.data.data);
        } catch (error) {
            console.error('Error fetching invoice:', error);
            setSelectedInvoice(null);
            Swal.fire('Error', 'Error fetching invoice. Please try again.', 'error');
        } finally {
            setInvoiceLoading(false);
        }
    };

    const closeInvoiceModal = () => {
        setIsModalOpen(false);
        setSelectedInvoice(null);
    };

    const openDispatchModal = async (orderId) => {
        setDispatchLoading(true);
        setIsDispatchModalOpen(true);
        try {
            const res = await axiosClient.get(`/orders/${orderId}/invoice`);
            setDispatchData(res.data.data);
        } catch (error) {
            console.error('Error fetching invoice:', error);
            setDispatchData(null);
            Swal.fire('Error', 'Error fetching invoice. Please try again.', 'error');
        } finally {
            setDispatchLoading(false);
        }
    };

    const closeDispatchModal = () => {
        setIsDispatchModalOpen(false);
        setDispatchData(null);
    };

    const handleDispatch = async (orderId, dispatchDetails) => {
        setDispatchLoading(true);
        try {
            await axiosClient.post(`/orders/${orderId}/dispatch`, dispatchDetails);
            fetchOrders(fromDate, toDate, searchTerm, orderStatus);
            Swal.fire('Success', 'Order dispatched successfully!', 'success');
        } catch (error) {
            console.error('Error updating dispatch:', error);
            Swal.fire('Error', 'Error updating dispatch. Please try again.', 'error');
        } finally {
            setDispatchLoading(false);
            closeDispatchModal();
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Orders List</h2>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                    <div>
                        <label>From Date</label>
                        <input 
                            type="date" 
                            value={fromDate} 
                            onChange={handleFromDateChange} 
                            className="border rounded-lg p-2 w-full" 
                        />
                    </div>
                    <div>
                        <label>To Date</label>
                        <input 
                            type="date" 
                            value={toDate} 
                            onChange={handleToDateChange} 
                            className="border rounded-lg p-2 w-full" 
                        />
                    </div>
                    <div>
                        <label>Search</label>
                        <input 
                            type="text" 
                            onChange={handleSearchChange} 
                            placeholder="Search by Order No or Name"
                            className="border rounded-lg p-2 w-full" 
                        />
                    </div>
                    <div>
                        <label>Status</label>
                        <select
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                        >
                            <option value="">All Statuses</option>
                            <option value="1">Pending</option>
                            <option value="2">Processing</option>
                            <option value="3">Delivered</option>
                            <option value="4">Cancelled</option>
                            <option value="5">Remaining Amount</option>
                            <option value="6">Received Amount</option>
                            <option value="7">Shipped</option>
                        </select>
                    </div>
                    <div className="flex space-x-1">
                        <button onClick={() => fetchOrders(fromDate, toDate, searchTerm, orderStatus)} className="bg-blue-500 text-white px-4 py-2 rounded">Filter Data</button>
                    </div>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border-b text-center p-4">S.No</th>
                                    <th className="border-b text-center p-4">Order No</th>
                                    <th className="border-b text-center p-4">Name</th>
                                    <th className="border-b text-center p-4">Phone No</th>
                                    <th className="border-b text-center p-4">Address</th>
                                    <th className="border-b text-center p-4">Grand Total</th>
                                    <th className="border-b text-center p-4">Status</th>
                                    <th className="border-b text-center p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? orders.map((order, index) => (
                                    <tr key={order.id} className="hover:bg-gray-100">
                                        <td className='text-center border-b p-4'>{index + 1}</td>
                                        <td className='border-b p-4'>{order.order_no}</td>
                                        <td className='border-b p-4'>{`${order.first_name} ${order.last_name}`}</td>
                                        <td className='border-b p-4'>{order.phone}</td>
                                        <td className='border-b p-4'>{order.address}</td>
                                        <td className='border-b p-4'>{order.grand_total}</td>
                                        <td className='border-b p-4'>
                                            <select 
                                                value={order.order_status} 
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)} 
                                                className="border rounded-lg p-1"
                                            >
                                                <option value="1">Pending</option>
                                                <option value="2">Processing</option>
                                                <option value="3">Delivered</option>
                                                <option value="4">Cancelled</option>
                                                <option value="5">Remaining Amount</option>
                                                <option value="6">Received Amount</option>
                                                <option value="7">Shipped</option>
                                            </select>
                                        </td>
                                        <td className='border-b p-4'>
                                            <button 
                                                onClick={() => openInvoiceModal(order.id)} 
                                                className="bg-blue-500 text-white p-1 rounded" aria-label="View Invoice">
                                                View Invoice
                                            </button>
                                            <button 
                                                onClick={() => openDispatchModal(order.id)} 
                                                className="bg-green-500 text-white p-1 rounded ml-2" aria-label="View Dispatch">
                                                View Dispatch
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" className='text-center border-b p-4'>No orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Invoice Modal */}
            <InvoiceModal 
                isOpen={isModalOpen} 
                onClose={closeInvoiceModal} 
                invoiceData={selectedInvoice} 
                loading={invoiceLoading} 
            />
            {/* Dispatch Detail Modal */}
            <DispatchModal 
                isOpen={isDispatchModalOpen} 
                onClose={closeDispatchModal} 
                order={dispatchData}
                invoiceData={selectedInvoice}
                onDispatch={handleDispatch}
                loading={dispatchLoading} 
            />
        </div>
    );
};

export default OrderList;
