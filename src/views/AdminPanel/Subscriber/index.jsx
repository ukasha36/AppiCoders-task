import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function SubscriberList() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllSubscribers();
    }, []);

    const fetchAllSubscribers = () => {
        setLoading(true);
        axiosClient.get('/subscribers')
            .then(res => {
                setLoading(false);
                setSubscribers(res.data.data);
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

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Subscribers List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscribers.length > 0 ? subscribers.map((subscriber, index) => (
                                        <tr key={subscriber.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{subscriber.email}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="2" className="text-center py-4">No subscriber found</td>
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
