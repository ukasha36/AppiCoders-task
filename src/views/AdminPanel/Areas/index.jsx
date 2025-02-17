import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

export default function Areas() {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newAreaName, setNewAreaName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllAreas();
        fetchCities();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isEditing || isAdding ? 'hidden' : 'unset';
    }, [isEditing, isAdding]);

    const fetchAllAreas = () => {
        setLoading(true);
        axiosClient.get('/areas')
            .then(res => {
                setAreas(res.data.data);
            })
            .catch(err => {
                console.error(err);
                Swal.fire('Error', 'Failed to fetch Areas. Please try again.', 'error');
            })
            .finally(() => setLoading(false));
    };

    const fetchCities = () => {
        axiosClient.get('/cities')
            .then(res => {
                setCities(res.data.data);
            })
            .catch(err => {
                console.error("Failed to fetch cities", err);
            });
    };

    const editArea = (area) => {
        setSelectedArea(area);
        setEditedName(area.name);
        setSelectedCity(area.city_id);
        setIsEditing(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!editedName || !selectedCity) {
            setErrorMessage("The name and city fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', editedName);
        formData.append('city_id', selectedCity);

        try {
            await axiosClient.post(`/areas/update/${selectedArea.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'Area Updated Successfully!', 'success');
            fetchAllAreas();
            resetModal();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to update area. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const addArea = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        if (!newAreaName || !selectedCity) {
            setErrorMessage("The name and city fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append('name', newAreaName);
        formData.append('city_id', selectedCity);

        try {
            await axiosClient.post('/areas/store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            Swal.fire('Success', 'Area Created Successfully!', 'success');
            fetchAllAreas();
            resetModal();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to create area. Please try again.";
            Swal.fire('Error', errorMessage, 'error');
            setErrorMessage(errorMessage);
        }
    };

    const toggleAreaStatus = (area) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (!token) {
            alert("No access token found");
            return;
        }

        axiosClient.post(`/areas/toggle-status/${area.id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            fetchAllAreas();
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
        setSelectedCity('');
        setNewAreaName('');
        setEditedName('');
        setErrorMessage('');
        setSelectedArea(null);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Area List</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsAdding(true)}>Add Area</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border-b text-center py-2">S.No</th>
                                        <th className="border-b text-center py-2">Name</th>
                                        <th className="border-b text-center py-2">City</th>
                                        <th className="border-b text-center py-2">Status</th>
                                        <th className="border-b text-center py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {areas.length > 0 ? areas.map((area, index) => (
                                        <tr key={area.id} className="hover:bg-gray-100">
                                            <td className="border-b text-center py-2">{index + 1}</td>
                                            <td className="border-b py-2">{area.name}</td>
                                            <td className="border-b py-2">{area.city.name}</td>
                                            <td className="border-b text-center py-2">
                                                <button
                                                    className={`py-1 px-3 rounded ${area.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                                    onClick={() => toggleAreaStatus(area)}
                                                >
                                                    {area.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className='text-center border-b p-4'>
                                                {area.status === 1 && (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                                        onClick={() => editArea(area)}
                                                        aria-label={`Edit Area ${area.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">No area found</td>
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
                            <h5 className="text-lg font-semibold">{isAdding ? "Add Area" : "Edit Area"}</h5>
                            <button type="button" className="text-black" onClick={resetModal}>
                                &times;
                            </button>
                        </div>
                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        <form onSubmit={isAdding ? addArea : handleEditSubmit}>
                            <div className="mt-4">
                                <label className="block mb-1">Select City</label>
                                <select
                                    className="border rounded w-full p-2"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                >
                                    <option value="">Select a city</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Area Name</label>
                                <input
                                    type="text"
                                    className="border rounded w-full p-2"
                                    value={isAdding ? newAreaName : editedName}
                                    onChange={(e) => isAdding ? setNewAreaName(e.target.value) : setEditedName(e.target.value)}
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
