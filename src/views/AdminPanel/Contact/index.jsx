import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const dropdownRef = useRef([]);

    useEffect(() => {
        fetchAllContacts();
    }, []);

    const fetchAllContacts = () => {
        setLoading(true);
        axiosClient.get('/contacts')
            .then(res => {
                setLoading(false);
                setContacts(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
                handleError(err);
            });
    };

    const handleError = (err) => {
        if (err.response) {
            console.error("Error Response:", err.response.data);
            setErrorMessage(err.response.data.message || "An error occurred");
            Swal.fire('Error', err.response.data.message || 'An error occurred', 'error'); // Show error alert
        } else {
            console.error("Error:", err);
            setErrorMessage("An error occurred");
            Swal.fire('Error', 'An error occurred', 'error'); // Show general error alert
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Contacts List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">Mobile No</th>
                                        <th className="border-b text-center py-2">Email</th>
                                        <th className="border-b text-center py-2">Message</th>
                                        <th className="border-b text-center py-2">Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.length > 0 ? contacts.map((contact, index) => (
                                        <tr key={contact.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{contact.name}</td>
                                            <td className="border-b py-2">{contact.mobile_no}</td>
                                            <td className="border-b py-2">{contact.email}</td>
                                            <td className="border-b py-2">{contact.message}</td>
                                            <td className="border-b py-2">{contact.address}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">No contact found</td>
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
