import { Outlet, Navigate, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../axiosClient";
import Sidebar from "./Sidebar";
import './Layout.css';
import Spinner from "./Spinner";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (token) {
      axiosClient
        .get("/user")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token, setUser]);

  if (!loading && !token) {
    return <Navigate to="/admin/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient
      .get("/logout")
      .then(() => {
        setUser(null);
        setToken(null);
        navigate('/admin')
      })
      .catch((err) => {
        console.error("Error logging out:", err);
      });
  };

  const toggleDropdown = () => {
    setIsOpenHeader(!isOpenHeader);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenHeader(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToChangePassword = () => {
    navigate('/admin/change-password'); // Update this path to your actual change password route
  };

  return (
    <div
      id="defaultLayout"
      className={`layout ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isOpen ? "expanded" : "collapsed"}`}>
        <div className="relative bg-white w-full px-10 py-3 shadow-md top-0 z-50">
          {/* Header Container */}
          <div className="flex justify-between items-center w-full">
            {/* Left Side: Home Link */}
            <Link to="/" className="text-lg font-semibold text-gray-800 hover:text-gray-600">
              Home
            </Link>

            {/* Right Side: User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {/* Dropdown Toggle Button */}
              <button
                onClick={toggleDropdown}
                className="flex items-center bg-[#004274DE] text-white focus:outline-none rounded-full p-1 px-3"
              >
               <span>{user?.name }</span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg> */}
              </button>

              {/* Dropdown Menu */}
              {isOpenHeader && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={navigateToChangePassword}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <main>{loading ? <div><Spinner /></div> : <Outlet />}</main>
      </div>
    </div>
  );
}
