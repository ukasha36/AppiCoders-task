import React, { useEffect, useState } from 'react';
import Spinner from '../../../Components/Spinner';
import axiosClient from '../../../axiosClient';
import SalesTrendChart from './SalesTrendChart';

export default function AdminDashboard() {
    // const [loading, setLoading] = useState(true);
    // const [nearExpireProducts, setNearExpireProducts] = useState([]);
    // const [salesData, setSaleDatas] = useState([]);
    // const [ordersSummary, setOrdersSummary] = useState({ totalOrders: 0, pendingOrders: 0, processingOrders: 0 });
    // const [error, setError] = useState('');

    // const fetchExpireProducts = async () => {
    //     try {
    //         const response = await axiosClient.get('/dashboards/expire_products');
    //         setNearExpireProducts(response.data.data);
    //     } catch (error) {
    //         console.error('Error fetching expire products:', error);
    //         setError('Failed to fetch expire products.');
    //     }
    // };

    // const fetchOrdersSummary = async () => {
    //     try {
    //         const response = await axiosClient.get('/dashboards/order_summary');
    //         setOrdersSummary(response.data.data);
    //     } catch (error) {
    //         console.error('Error fetching orders summary:', error);
    //         setError('Failed to fetch order summary.');
    //     }
    // };

    // const fetchSaleData = async () => {
    //     try {
    //         const response = await axiosClient.get('/dashboards/monthly_sale_summary');
    //         setSaleDatas(response.data.data);
    //     } catch (error) {
    //         console.error('Error fetching expire products:', error);
    //         setError('Failed to fetch expire products.');
    //     }
    // };

    

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         await Promise.all([fetchOrdersSummary(), fetchExpireProducts(), fetchSaleData()]);
    //         setLoading(false);
    //     };

    //     fetchData();
    // }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            </div>
        </div>
    );
}
