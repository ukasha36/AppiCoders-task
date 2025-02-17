import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const OrderDetailsModal = ({ isOpen, onRequestClose, orders }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Order Details</h2>
            <div className="overflow-auto">
                <table className='min-w-full bg-white'>
                    <thead>
                        <tr>
                            <th className='border-b text-center p-2'>Order ID</th>
                            <th className='border-b text-center p-2'>Status</th>
                            <th className='border-b text-center p-2'>Amount</th>
                            {/* Add other necessary columns */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? orders.map((order, index) => (
                            <tr key={index}>
                                <td className='border-b text-center p-2'>{order.id}</td>
                                <td className='border-b text-center p-2'>{order.status}</td>
                                <td className='border-b text-center p-2'>{order.amount}</td>
                                {/* Add other necessary data */}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className='text-center p-2'>No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default OrderDetailsModal;
