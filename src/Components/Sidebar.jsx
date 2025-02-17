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
        <div className={`min-h-screen ${isOpen ? 'w-48' : 'w-14'} bg-[#004274DE] text-white transition-all duration-300`}>
            {/* Sidebar Header */}
            <div className="p-4 flex items-center justify-between">
                <h1 className={`${isOpen ? 'text-lg' : 'hidden'} font-bold`}>Admin Panel</h1>
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <span className={`${isOpen ? 'rotate-180' : ''} text-white transition-transform duration-300`}>
                        &#9776;
                    </span>
                </button>
            </div>

            {/* Sidebar Menu */}
            <ul className="fixed mt-4 space-y-2 ">
                <Link to="/admin/dashboards">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Dashboard</span>
                    </li>
                </Link>
                <Link to="/admin/users">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Users</span>
                    </li>
                </Link>
                {/* <Link to="/admin/categories">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Category</span>
                    </li>
                </Link> */}
                <Link to="/admin/property-categories">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdBrandingWatermark className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Property Cateogry</span>
                    </li>
                </Link>
                <Link to="/admin/blog-categories">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdBrandingWatermark className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Blog Cateogry</span>
                    </li>
                </Link>

                <Link to="/admin/property-types">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Property Type</span>
                    </li>
                </Link>
                <Link to="/admin/departments">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Departments</span>
                    </li>
                </Link>
                <Link to="/admin/agents">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Agents</span>
                    </li>
                </Link>
                <Link to="/admin/countries">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Countries</span>
                    </li>
                </Link>
                <Link to="/admin/states">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>States</span>
                    </li>
                </Link>
                <Link to="/admin/cities">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Cities</span>
                    </li>
                </Link>
                <Link to="/admin/areas">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Areas</span>
                    </li>
                </Link>
                <Link to="/admin/features">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Features</span>
                    </li>
                </Link>
                <Link to="/admin/additional-features">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Additional Features</span>
                    </li>
                </Link>
                {/* <Link to="/admin/discount-codes">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Discount Codes</span>
                    </li>
                </Link> */}
                {/* <Link to="/admin/delivery-charges">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Delivery Charges</span>
                    </li>
                </Link> */}
                {/* <Link to="/admin/orders">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdFormatSize className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Orders</span>
                    </li>
                </Link> */}
                {/* Product Dropdown */}
                {/* <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center justify-between cursor-pointer" onClick={toggleProducts}>
                    <div className="flex items-center">
                        <MdProductionQuantityLimits className="mr-2 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Product</span>
                    </div>
                    {isOpen && (showProducts ? <FaChevronUp /> : <FaChevronDown />)}
                </li>
                {isOpen && showProducts && (
                    <ul className="ml-8 space-y-2 md:space-y-0 h-20 overflow-y-auto">
                        <Link to="/admin/products" className="block px-4 py-2 hover:bg-white hover:text-[#004274DE]">
                            <li>
                                Product List
                            </li>
                        </Link>
                        <Link to="/admin/products/create" className="block px-4 py-2 hover:bg-white hover:text-[#004274DE]">
                            <li>
                                Add Product
                            </li>
                        </Link>
                    </ul>
                )} */}

                {/* Blogs Dropdown */}
                <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center justify-between cursor-pointer" onClick={toggleBlogs}>
                    <div className="flex items-center">
                        <MdArticle className="mr-2" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Blogs</span>
                    </div>
                    {isOpen && (showBlogs ? <FaChevronUp /> : <FaChevronDown />)}
                </li>
                {isOpen && showBlogs && (
                    <ul className="ml-8 space-y-2 md:space-y-0 h-20 overflow-y-auto">
                        <Link to="/admin/blogs" className="block px-4 py-2">
                            <li>
                                Blog List
                            </li>
                        </Link>
                        <Link to="/admin/blogs/create" className="block px-4 py-2 hover:bg-white hover:text-[#004274DE]">
                            <li>
                                Add Blog
                            </li>
                        </Link>
                    </ul>
                )}
                <Link to="/admin/contacts">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Contact List</span>
                    </li>
                </Link>
                <Link to="/admin/subscribers">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Subscriber List</span>
                    </li>
                </Link>
                {/* <Link to="/admin/product-reviews">
                    <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center">
                        <MdCategory className="mr-2 mt-4 md:mt-0" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}> Product Reviews</span>
                    </li>
                </Link> */}

                {/* Stocks Dropdown */}
                {/* <li className="px-4 py-2 hover:bg-white hover:text-[#004274DE] flex items-center justify-between cursor-pointer" onClick={toggleStocks}>
                    <div className="flex items-center">
                        <MdArticle className="mr-2" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Stocks</span>
                    </div>
                    {isOpen && (showStocks ? <FaChevronUp /> : <FaChevronDown />)}
                </li>
                {isOpen && showStocks && (
                    <ul className="ml-8 space-y-2 md:space-y-0 h-20 overflow-y-auto">
                        <Link to="/admin/stocks" className="block px-4 py-2">
                            <li>
                                Stock List
                            </li>
                        </Link>
                        <Link to="/admin/stocks/create" className="block px-4 py-2 hover:bg-white hover:text-[#004274DE]">
                            <li>
                                Add Stock
                            </li>
                        </Link>
                    </ul>
                )} */}
            </ul>
        </div>
    );
};

export default Sidebar;
