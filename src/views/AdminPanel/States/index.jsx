import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function States() {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newStateName, setNewStateName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllStates();
        fetchCountries();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isEditing || isAdding ? 'hidden' : 'unset';
    }, [isEditing, isAdding]);

    const fetchAllStates = () => {
        setLoading(true);
        axiosClient.get('/states')
            .then(res => {
                setStates(res.data.data);
            })
            .catch(err => {
                console.error(err);
                Swal.fire('Error', 'Failed to fetch states. Please try again.', 'error');
            })
            .finally(() => setLoading(false));
    };

    const fetchCountries = () => {
        axiosClient.get('/countries')
            .then(res => {
                setCountries(res.data.data);
            })
            .catch(err => {
                console.error("Failed to fetch countries", err);
            });
    };

    const editState = (state) => {
        setSelectedState(state);
        setEditedName(state.name);
        setSelectedCountry(state.country_id);
        setIsEditing(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!editedName || !selectedCountry) {
            setErrorMessage("The name and country fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', editedName);
        formData.append('country_id', selectedCountry);

        try {
            await axiosClient.post(`/states/update/${selectedState.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'State Updated Successfully!', 'success');
            fetchAllStates();
            resetModal();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to update state. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const addState = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!newStateName || !selectedCountry) {
            setErrorMessage("The name and country fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', newStateName);
        formData.append('country_id', selectedCountry);

        try {
            await axiosClient.post('/states/store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'State Created Successfully!', 'success');
            fetchAllStates();
            resetModal();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to create state. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const toggleStateStatus = (state) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        axiosClient.post(`/states/toggle-status/${state.id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            fetchAllStates();
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
        setSelectedCountry('');
        setNewStateName('');
        setEditedName('');
        setErrorMessage('');
        setSelectedState(null);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">State List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add State</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">Country</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {states.length > 0 ? states.map((state, index) => (
                                        <tr key={state.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{state.name}</td>
                                            <td className="border-b py-2">{state.country.name}</td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${state.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleStateStatus(state)}
                                                >
                                                    {state.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {state.status === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editState(state)}
                                                        aria-label={`Edit State ${state.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">No state found</td>
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
                            <h5 className="text-lg font-semibold">{isAdding ? "Add State" : "Edit State"}</h5>
                            <button type="button" className="text-black" onClick={resetModal}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={isAdding ? addState : handleEditSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Select Country</label>
                                <select
                                    className="border rounded w-full p-2"
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                >
                                    <option value="">Select a country</option>
                                    {countries.map(country => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">State Name</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newStateName : editedName}
                                    onChange={(e) => isAdding ? setNewStateName(e.target.value) : setEditedName(e.target.value)}
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
