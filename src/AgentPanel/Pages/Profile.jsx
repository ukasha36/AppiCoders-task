import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { LiaUserEditSolid } from 'react-icons/lia';

const Profile = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [profilePicture, setProfilePicture] = useState('');
    const dummyProfilePic = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQDw8QEBAQDg8PDw0PDQ0QDQ8NDw0PFhEWFhURExMYHSggGBolGxMTITEhJSk3Li4uFx8zODMsNygtLisBCgoKDQ0NDg0NDysZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGB//EADAQAQACAAMFBgYCAwEAAAAAAAABAgMEESExQVFxBRJhgZHBIjJSobHRovATQuFy/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANZxI5tf8ANHP7SCQR/wCaP7EsxiRzBuMRLIAAAAAAAAAAAAAAAAAAAMWtpvBlpfEiP0hvizO7ZCMEtsaeiOZYEAAAAGYlvXFmPFGAs1xYnwSKTemJMeMclFoa0tE7mwAAAAAAAAAAAAAMWnTaDF7aK1rTO8vbWWqAAAAAAAEAAAAAM1nTcs4d9evFVZrOm0Fwa0trDZQAAAAAAAAAAVsa+s6cITYttIVQAEAABpjY0UjWfKOMmNiRWszPDhznk5OJiTadZ3/gE2LnLTu+GPDf6oJnXft67WBUIlPhZu9ePejlO37oAHWwMxF92yeMJXFraYnWNkxul1ctjd+uvGNkx4oqUAAAG+HfSfDitKSxgW2acvwolAAAAAAAAAkFfHtt6ImZlhAAAABz+0cTW0V4RtnrKolzU/Hb/wBTHoiVAAAABYyOJpeI4W2T7K7NZ0mJ5TEg7QywigADfCtpMejQBdGKTrEMqAAAAAADXEnZLZHj/LPl+QVgEAAAAHJzddL266+u1Evdo4e63lPsoqgAAAA2w662iOcxH3arXZ+FrbvcK/kHSYBFAAAAWcCdiRFl909fZKoAAAAAAI8f5Z8vykaYsbJBVAQAAAAYtWJiYnbE73LzGBNJ5xwl1WLViY0mNYngDii9i5D6Z08J/aC2UvH+uvSYlUQCaMrf6fvEJ8LIfVPlH7BVwcKbzpHnPCHWwsOKxERw+/izSkVjSI0hlFAAAAAAWMvunr7JUeBGxIoAAAAAAMTDICnLCTGrpPXajQAAAQ5jMxTZvnlHuCYmXLxM1e3HSOUbEEyo7XejnHqd6OcerigO13o5x6nejnHq4oDtxI4iXDzN67p18J2wDrCvl83Ftk/DP2nosIAAANsOuswCzSNIhsCgAAAAAAACPGrrHRWXVXFppPhO4GgMXtpEzO6I1QQZzMd2NI+aftHNzJbXvNpmZ3y1VAAAAAAAABfyWZ1+G2//AFnn4KBE6bt/AHbGmBid6sT69W6KLGBXjzQ0rrOi3EKAAAAAAAAAADW9dY0bAKdo02KvaFtKac5iPf2dPEpr14S5XakaRWPGQc8AQAAAAAAAAABf7NtstHKYn++i7EOf2Z81unu7GFh6dfwKzh00jx4twAAAAAAAAAAAAAQ5nL1xI0t5TxhMA8/msnbD37a8LRu8+Su9RMKGY7MrbbX4J5b6+nAHGFjGyWJTfXWOdfihXEAAAAATYOUvfdWdOc7IBCmy+WtiT8MbONp3Q6OX7LiNt570/TGyv/XQrWIjSI0iN0RsgVBlMpXDjZttO+3P9LAAAAAAAAAAAAAAAAAAAAI8TArb5qxPjMRr6pAFO/ZmHPCY6Wn3Rz2TT6rfx/ToAOdHZNPqt/H9JK9mYcfVPW36XQEWHlqV3ViPHTWfVKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=";

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedValues(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files) {
            const file = files[0];
            if (file) {
                if (file.type.startsWith('image/')) {
                    setProfilePicture(URL.createObjectURL(file)); // Preview the image
                    setFormData((prevState) => ({ ...prevState, photo: file }));
                } else {
                 toast.error('Please select a valid image file.');
                }
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    return (
        <div className='max-w-full md:max-w-7xl mx-auto bg-white rounded-2xl shadow-md'>
            <img src="/banner.png" alt="" className='h-48 w-full object-cover rounded-t-2xl' />
            <div className="relative px-8 pb-8">
                {/* Profile Image Overlap */}
                <div className="absolute -top-16 left-8">
                    {/* <img
                        className="w-32 h-32 rounded-full object-cover border-4 border-white"
                        src={dummyProfilePic}
                        alt="Profile"
                    /> */}
                    <div className="relative h-24 w-24 flex justify-center items-center rounded-full overflow-hidden border-4 border-gray-700">
                    <img
                        src={profilePicture || dummyProfilePic}
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                    <LiaUserEditSolid className="absolute text-[#222222] text-2xl bottom-1 right-4" />
                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleChange}
                    />
                </div>
                </div>
                <button className='absolute right-6 top-10 text-white p-2 px-4 rounded-md bg-[#222222]'>
                    Update
                </button>
                <div className="pt-16">
                    <h2 className="text-2xl font-bold">Jordan Hamidul</h2>
                    <p className="text-gray-600">A student information collection form is a document...</p>
                    <div className="mt-3 flex flex-wrap md:space-x-4 text-gray-500">
                        <div className="flex items-center">
                            <MdLocationOn className="mr-2" />
                            <span>Jamsed pora USA 3564</span>
                        </div>
                        <div className="flex items-center">
                            <FiPhone className="mr-2" />
                            <span>+880 345678990</span>
                        </div>
                        <div className="flex items-center">
                            <FiMail className="mr-2" />
                            <span>jordanhamidul@gmail.com</span>
                        </div>
                    </div>
                </div>

                {/* Personal Details Form */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="mt-2 p-2 w-full border rounded-lg"
                            placeholder="Jordan"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-2 p-2 w-full border rounded-lg"
                            placeholder="agent@Nextlevel.com"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mobile Number</label>
                        <input
                            type="tel"
                            className="mt-2 p-2 w-full border rounded-lg"
                            placeholder="+880 345678990"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Whatsapp Number</label>
                        <input
                            type="tel"
                            className="mt-2 p-2 w-full border rounded-lg"
                            placeholder="+880 345678990"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Agent Introduction</label>
                        <textarea
                            className="mt-2 p-2 w-full h-[107px] border rounded-lg resize-none"
                            cols={4}
                            rows={2}
                            name="" id=""
                        ></textarea>
                    </div>

                    {/* Checkboxes */}
                    <div>
                        <label className="block text-gray-700">Select Services</label>
                        <div className="mt-2 space--2 flex flex-wrap gap-1">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    value="Sale"
                                    onChange={handleCheckboxChange}
                                    className="form-checkbox"
                                />
                                <span className="ml-2">Sale</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    value="Rent"
                                    onChange={handleCheckboxChange}
                                    className="form-checkbox"
                                />
                                <span className="ml-2">Rent</span>
                            </label>
                        </div>

                        {/* Display selected values */}
                        {selectedValues.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Selected Services:</h4>
                                <ul className="listdisc ml-2 flex flex-wrap gap-1">
                                    {selectedValues.map((value, index) => (
                                        <li key={index}>{value}{","}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* ReactQuill Editor */}
                    <div className="col-span-2">
                        <label className="block text-gray-700">Agent Description</label>
                        <ReactQuill className="mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
