import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function Cities() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newCityName, setNewCityName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllCities();
        fetchStates();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isEditing || isAdding ? 'hidden' : 'unset';
    }, [isEditing, isAdding]);

    const fetchAllCities = () => {
        setLoading(true);
        axiosClient.get('/cities')
            .then(res => {
                setCities(res.data.data);
            })
            .catch(err => {
                console.error(err);
                Swal.fire('Error', 'Failed to fetch Cities. Please try again.', 'error');
            })
            .finally(() => setLoading(false));
    };

    const fetchStates = () => {
        axiosClient.get('/states')
            .then(res => {
                setStates(res.data.data);
            })
            .catch(err => {
                console.error("Failed to fetch states", err);
            });
    };

    const editCity = (city) => {
        setSelectedCity(city);
        setEditedName(city.name);
        setSelectedState(city.state_id);
        setIsEditing(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!editedName || !selectedState) {
            setErrorMessage("The name and state fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', editedName);
        formData.append('state_id', selectedState);

        try {
            await axiosClient.post(`/cities/update/${selectedCity.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'City Updated Successfully!', 'success');
            fetchAllCities();
            resetModal();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to update city. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const addCity = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!newCityName || !selectedState) {
            setErrorMessage("The name and state fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', newCityName);
        formData.append('state_id', selectedState);

        try {
            await axiosClient.post('/cities/store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'City Created Successfully!', 'success');
            fetchAllCities();
            resetModal();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to create city. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const toggleCityStatus = (city) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        axiosClient.post(`/cities/toggle-status/${city.id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            fetchAllCities();
        })
        .catch(err => {
            const errorMessage = err.response?.data?.message || "Failed to toggle status. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            console.error(err);
        });
    };

    const resetModal = () => {
        setIsAdding(false);
        setIsEditing(false);
        setSelectedState('');
        setNewCityName('');
        setEditedName('');
        setErrorMessage('');
        setSelectedCity(null);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">City List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add City</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">State</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cities.length > 0 ? cities.map((city, index) => (
                                        <tr key={city.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{city.name}</td>
                                            <td className="border-b py-2">{city.state.name}</td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${city.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleCityStatus(city)}
                                                >
                                                    {city.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {city.status === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editCity(city)}
                                                        aria-label={`Edit City ${city.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">No city found</td>
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
                            <h5 className="text-lg font-semibold">{isAdding ? "Add City" : "Edit City"}</h5>
                            <button type="button" className="text-black" onClick={resetModal}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={isAdding ? addCity : handleEditSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Select State</label>
                                <select
                                    className="border rounded w-full p-2"
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                >
                                    <option value="">Select a state</option>
                                    {states.map(state => (
                                        <option key={state.id} value={state.id}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">City Name</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newCityName : editedName}
                                    onChange={(e) => isAdding ? setNewCityName(e.target.value) : setEditedName(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="button" className="bg-gray-300 text-black py-2 px-4 rounded mr-2" onClick={resetModal}>Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">{isAdding ? "Add" : "Save"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
