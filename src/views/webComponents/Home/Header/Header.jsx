import React from "react";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleShowNavbar = () => {
    setShowNav(!showNav);
  };

  const closeNavbar = () => {
    setShowNav(false);
  };

  return (
    <div>
      <nav className="  w-full absolute top-[30px] flex justify-center items-center h-[100px]">
        <div className="flex md:justify-around w-[80%] md:w-[90%] md:items-center h-[100px] md:bg-white rounded-bl-[20px] rounded-br-[20px]">
          <Link to="/">
            <picture>
              <source media="(max-width: 768px)" srcSet="./mobilelogo.png" />
              <img src="./logo.png" alt="logo" className="w-[130px] h-[47px]" />
            </picture>
          </Link>

          <ul className="hidden md:flex h-full w-[80%] justify-center items-center gap-[25px]">
            <Link to="/about">
              <li className="text-[16px]">Buy</li>
            </Link>
            <Link to="/skills">
              <li className="text-[14px]">Rent</li>
            </Link>
            <Link to="/experience">
              <li className="text-[14px]">Off Plan</li>
            </Link>
            <Link to="/projects">
              <li className="text-[14px]">Luxury</li>
            </Link>
            <Link to="/contact">
              <li className="text-[14px]">Areas</li>
            </Link>
            <Link to="/contact">
              <li className="text-[14px]">Communities</li>
            </Link>
            <Link to="/contact">
              <li className="text-[14px]">Property Management</li>
            </Link>
            <Link to="/contact">
              <li className="text-[14px]">Blog</li>
            </Link>
            <Link to="/contact">
              <li className="text-[14px]">About us</li>
            </Link>

            <div className="flex gap-[5px] items-center">
              <button
                type="submit"
                className="w-[39px] h-[39px] bg-gray-500 flex justify-center items-center"
              >
                <FiSearch className="text-white" size={20} />
              </button>
              <form>
                <div>
                  <input
                    className="bg-transparent border-2 border-gray-500 px-4 p-2 w-[186px] h-[39px]"
                    type="text"
                    placeholder="type"
                  />
                </div>
              </form>
            </div>
          </ul>
        </div>

        <div
          className="md:hidden text-white cursor-pointer right-[30px] absolute top-[10px] "
          onClick={toggleShowNavbar}
        >
          <RxHamburgerMenu size={24} />
        </div>

        {/* Responsive Navbar */}
        <div
          className={`fixed w-full h-full top-0 bg-black bg-opacity-50 backdrop-blur-lg z-10 transition-all ${
            showNav ? "right-0" : "right-full"
          }`}
        >
          <ul className="flex flex-col justify-center items-start p-5 gap-4 h-[410px]">
            <div
              onClick={toggleShowNavbar}
              className="absolute right-4 top-4 text-white"
            >
              <IoClose size={24} />
            </div>

            <Link to="/" onClick={closeNavbar}>
              <li className="text-[16px] text-white">Buy</li>
            </Link>
            <Link to="/rent" onClick={closeNavbar}>
              <li className="text-[16px] text-white">Rent</li>
            </Link>

            <Link to="/skills" onClick={closeNavbar}>
              <li className="text-[16px] text-white ">Off Plan</li>
            </Link>
            <Link to="/experience" onClick={closeNavbar}>
              <li className="text-[16px] text-white ">Luxury</li>
            </Link>
            <Link to="/projects" onClick={closeNavbar}>
              <li className="text-[16px] text-white ">Areas</li>
            </Link>
            <Link to="/contact" onClick={closeNavbar}>
              <li className="text-[16px] text-white ">Communities</li>
            </Link>
            <Link to="/contact" onClick={closeNavbar}>
              <li className="text-[16px] text-white ">Property Management</li>
            </Link>
            <Link to="/contact" onClick={closeNavbar}>
              <li className="text-[16px] text-white">Blog</li>
            </Link>
            <Link to="/contact" onClick={closeNavbar}>
              <li className="text-[16px] text-white">About us</li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
