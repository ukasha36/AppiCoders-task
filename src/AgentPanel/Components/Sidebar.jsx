import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdCategory, MdBrandingWatermark, MdFormatSize, MdProductionQuantityLimits, MdArticle } from 'react-icons/md';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [showProducts, setShowProducts] = useState(false);
    const [showBlogs, setShowBlogs] = useState(false);
    const [showStocks, setShowStocks] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);

    const toggleProducts = () => {
        setShowProducts((prev) => !prev);
        setShowBlogs((prev) => false);
        setShowStocks((prev) => false);
    };
    const toggleBlogs = () => {
        setShowBlogs((prev) => !prev);
        setShowProducts((prev) => false);
        setShowStocks((prev) => false);
    };

    const toggleStocks = () => {
        setShowStocks((prev) => !prev);
        setShowProducts((prev) => false);
        setShowBlogs((prev) => false);
    };

    // Toggle sidebar visibility
    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
        toggleSidebar(); // Call parent toggle function to manage external state if needed
    };

    // Close sidebar on mobile screens by default and handle resize events
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsSidebarOpen(false); // Close sidebar on mobile by default
                handleSidebarToggle();
            }
        };

        // Set initial state based on screen size
        handleResize();

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className={`m-2 rounded-2xl min-h-screen ${isOpen ? 'w-52' : 'w-12'} bg-[#222222] text-white transition-all duration-300`}>
            {/* Sidebar Header */}
            <div className="p-4 flex items-center justify-between">
                {/* <h1 className={`${isOpen ? 'text-lg' : 'hidden'} font-bold`}>Admin Panel</h1> */}
                <img src="/AgentPanel/Sidebar-Logo.png" alt="Next Level" className={`${isOpen ? 'w-30 h-12' : 'hidden'} font-bold`}/>
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <span className={`${isOpen ? 'rotate-180' : ''} text-white transition-transform duration-300`}>
                        &#9776;
                    </span>
                </button>
            </div>

            {/* Sidebar Menu */}
            <ul className="fixed mt-4 space-y-2 ">
                <Link >
                    <li className="px-4 py-2 hover:rounded-tr-full hover:rounded-br-full hover:bg-white hover:text-[#8F8F8F] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Dashboard</span>
                    </li>
                </Link>
                <Link to='profile'>
                    <li className="px-4 py-2 hover:rounded-tr-full hover:rounded-br-full hover:bg-white hover:text-[#8F8F8F] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Profile</span>
                    </li>
                </Link>
                <Link>
                    <li className="px-4 py-2 hover:bg-white hover:text-[#8F8F8F] flex items-center">
                        <MdBrandingWatermark className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Property Cateogry</span>
                    </li>
                </Link>
                <Link>
                    <li className="px-4 py-2 hover:bg-white hover:text-[#8F8F8F] flex items-center">
                        <MdBrandingWatermark className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Blog Cateogry</span>
                    </li>
                </Link>

                <Link >
                    <li className="px-4 py-2 hover:bg-white hover:text-[#8F8F8F] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Property Type</span>
                    </li>
                </Link>
                <Link >
                    <li className="px-4 py-2 hover:bg-white hover:text-[#8F8F8F] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Departments</span>
                    </li>
                </Link>

                {/* Blogs Dropdown */}
                <li className="px-4 py-2 hover:bg-white hover:text-[#8F8F8F] flex items-center justify-between cursor-pointer" onClick={toggleBlogs}>
                    <div className="flex items-center">
                        <MdArticle className="mr-2" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Blogs</span>
                    </div>
                    {isOpen && (showBlogs ? <FaChevronUp /> : <FaChevronDown />)}
                </li>
                {isOpen && showBlogs && (
                    <ul className="ml-8 space-y-2 md:space-y-0 h-20 overflow-y-auto">
                        <Link to="" className="block px-4 py-2">
                            <li>
                                Blog List
                            </li>
                        </Link>
                        <Link to="/" className="block px-4 py-2 hover:bg-white hover:text-[#8F8F8F]">
                            <li>
                                Add Blog
                            </li>
                        </Link>
                    </ul>
                )}
                <Link to="">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#8F8F8F] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Contact List</span>
                    </li>
                </Link>
                <Link to="">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#8F8F8F] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Subscriber List</span>
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default Sidebar;
