import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { FiSearch, FiPhone } from "react-icons/fi";
import { scrollTo } from "./ScrollTo";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  // Array for desktop navigation items
  const desktopNavItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Why Choose us", id: "whychooseus" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Projects", id: "portfolio" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Technologies", id: "technologies" },
    { name: "Contact", id: "contact" },
  ];

  // Array for mobile navigation items (if different, you can customize accordingly)
  const mobileNavItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Why Choose us", id: "whychooseus" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Projects", id: "projects" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  const toggleShowNavbar = () => {
    setShowNav(!showNav);
  };

  const handleCallClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div>
      <nav className="w-full absolute z-10 top-[30px] flex justify-center items-center h-[100px]">
        <div className="flex relative lg:justify-around w-[80%] lg:w-[90%] macbook:w-[70%] lg:items-center h-[100px] rounded-bl-[20px] rounded-br-[20px]">
          {/* Logo */}
          <a href="/">
            <picture>
              <img
                src="/logo.webp"
                alt="logo"
                className="w-[130px] h-[50px] object-contain"
              />
            </picture>
          </a>

          {/* Desktop Header */}
          <ul className="hidden md:flex h-full w-[80%] macbook:w-[80%] justify-center items-center xl:gap-[1.5rem] lg:gap-4 macbook:gap-14">
            {desktopNavItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer font-poppins text-[14px] text-white macbook:text-[18px] font-newsLetter"
                onClick={() => scrollTo(item.id)}
              >
                {item.name}
              </li>
            ))}

            {/* Call Section */}
            <div className=" cursor-pointer font-poppins  flex items-center text-white justify-center bg-transparent border-2 border-white rounded-[30px] outline-none px-2 py-2">
              <FiPhone className="mr-2" size={18} />
              <p onClick={() => handleCallClick("+1 (800) 826-8018")}>
                +1 (800) 826-8018
              </p>
            </div>
          </ul>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div
          className="lg:hidden text-white cursor-pointer right-[35px] absolute top-[10px]"
          onClick={toggleShowNavbar}
        >
          <RxHamburgerMenu size={24} />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white bg-opacity-50 transition-transform transform ${
            showNav ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-2/3 relative z-30 bg-[#272737] h-full p-4 ml-auto">
            <button className="text-black" onClick={() => setShowNav(false)}>
              <IoClose size={24} />
            </button>
            <ul className="space-y-4 mt-8 flex flex-col gap-2">
              {mobileNavItems.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer font-poppins py-1 border-b border-gray-500 text-white font-newsLetter"
                  onClick={() => {
                    scrollTo(item.id);
                    setShowNav(false);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
