import { Outlet, Navigate, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Components/Sidebar";
import { CiUser } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { ProfileDropDown } from "./Components/ProfileDropDown";

export default function AgentPanelLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false); // Set loading to false initially
    const [isOpenHeader, setIsOpenHeader] = useState(false);
    const dropdownRef = useRef(null);  // Ref to track the dropdown

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsOpenHeader(!isOpenHeader);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenHeader(false); // Close the dropdown if clicked outside
            }
        };

        // Add event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="flex min-h-screen bg-[#ECEBE8]">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300`}>
                {/* Header */}
                <header className="bg-transparent border-b-2 border-[#222222] w-full max-w-full p-4 m2 flex justify-between items-center ">
                    {/* Left Side: Logo or Home Link */}
                    <Link to="/" className="text-lg font-semibold text-black hover:text-gray-600">
                        Agent Dashboard
                    </Link>

                    {/* Right Side: Notification, Profile, and Dropdown */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Icon */}
                        <div className="relative">
                            <button className="flex items-center text-black rounded-full border-[0.5px] border-black p-1 focus:outline-none">
                                <GoBell size={24} />
                            </button>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative mr-2" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center text-black rounded-full border-[0.5px] border-black p-1 focus:outline-none"
                            >
                                {/* Profile Icon */}
                                <CiUser size={24} />
                            </button>

                            {/* Dropdown Menu */}
                            {isOpenHeader && (
                                <ProfileDropDown />
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="pt-6 px-4 flex-1 overflow-y-auto">
                    {/* Display content or a loading spinner */}
                    {loading ? <div>Loading...</div> : <Outlet />}
                </div>
            </div>
        </div>
    );
}
