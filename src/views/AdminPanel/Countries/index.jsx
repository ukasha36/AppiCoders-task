import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newCountryName, setNewCountryName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllCountries();
    }, []);

    useEffect(() => {
        if (isEditing || isAdding) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isEditing, isAdding]);

    const fetchAllCountries = () => {
        setLoading(true);
        axiosClient.get('/countries')
            .then(res => {
                setLoading(false);
                setCountries(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    

    const editCountry = (country) => {
        setSelectedCountry(country);
        setEditedName(country.name);
        setIsEditing(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!editedName) {
            setErrorMessage("The name field is required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', editedName);
        try {
            await axiosClient.post(`/countries/update/${selectedCountry.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'Country Updated Successfully!', 'success');
            fetchAllCountries();
            setIsEditing(false);
            setSelectedCountry(null);
            setErrorMessage('');
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to updated Country. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const addCountry = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!newCountryName) {
            setErrorMessage("The name field is required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', newCountryName);
        try {
            await axiosClient.post('/countries/store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'Country Created Successfully!', 'success');
            fetchAllCountries();
            setIsAdding(false);
            setNewCountryName('');
            setErrorMessage('');
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to updated Country. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const handleError = (err) => {
        if (err.response) {
            console.error("Error Response:", err.response.data);
            setErrorMessage(err.response.data.message || "An error occurred");
        } else {
            console.error("Error:", err);
            setErrorMessage("An error occurred");
        }
    };

    const toggleCountryStatus = (country) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        axiosClient.post(`/countries/toggle-status/${country.id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            fetchAllCountries();
        })
        .catch((err) => {
            handleError(err);
        });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Country List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add Country</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {countries.length > 0 ? countries.map((country, index) => (
                                        <tr key={country.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{country.name}</td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${country.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleCountryStatus(country)}
                                                >
                                                    {country.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {country.status === 1 && (
                                                    
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editCountry(country)}
                                                        aria-label={`Edit Country ${country.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">No country found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
            </div>

            {(isEditing || isAdding) && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4">
                        <div className="flex justify-between items-center">
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Country" : "Edit Country"}</h5>
                            <button type="button" className="text-black" onClick={() => { setIsAdding(false); setIsEditing(false); }}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={isAdding ? addCountry : handleEditSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Country Name</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newCountryName : editedName}
                                    onChange={(e) => isAdding ? setNewCountryName(e.target.value) : setEditedName(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="button" className="bg-gray-300 text-black py-2 px-4 rounded mr-2" onClick={() => { setIsAdding(false); setIsEditing(false); }}>Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">{isAdding ? "Add" : "Save"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
