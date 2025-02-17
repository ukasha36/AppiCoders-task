import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

function Footer() {
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);

  return (
    <footer className="bg-[#272737] text-white py-10 px-5 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Logo & Contact Info */}
        <div className="text-center md:text-left md:w-1/3">
          <img
            className="w-40 mx-auto md:mx-0"
            src="/logo.webp"
            alt="Appicoders Logo"
          />
          <div className="mt-5">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm">Tel: +1 (800) 896-8018</p>
            <p className="text-sm">Email: info@appicoders.com</p>
          </div>
        </div>

        {/* Mobile Dropdowns */}
        <div className="md:hidden w-full mt-8">
          <div
            onClick={() => setAboutOpen(!isAboutOpen)}
            className="flex justify-between items-center cursor-pointer py-2 border-b border-gray-600"
          >
            <p className="text-sm font-medium">About</p>
            {isAboutOpen ? (
              <MdOutlineExpandLess size={24} />
            ) : (
              <MdOutlineExpandMore size={24} />
            )}
          </div>
          {isAboutOpen && (
            <ul className="mt-2 space-y-2">
              <li className="text-sm hover:underline">Home</li>
              <li className="text-sm hover:underline">About Us</li>
              <li className="text-sm hover:underline">Contact Us</li>
            </ul>
          )}

          <div
            onClick={() => setServicesOpen(!isServicesOpen)}
            className="flex justify-between items-center cursor-pointer py-2 border-b border-gray-600 mt-4"
          >
            <p className="text-sm font-medium">Appicoders Services</p>
            {isServicesOpen ? (
              <MdOutlineExpandLess size={24} />
            ) : (
              <MdOutlineExpandMore size={24} />
            )}
          </div>
          {isServicesOpen && (
            <ul className="mt-2 space-y-2">
              <li className="text-sm hover:underline">
                iPhone Application Development
              </li>
              <li className="text-sm hover:underline">
                Android Application Development
              </li>
              <li className="text-sm hover:underline">
                Enterprise App Development
              </li>
            </ul>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex md:w-2/3 justify-between mt-8 md:mt-0">
          <div>
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="mt-3 space-y-2">
              <li className="text-sm hover:underline">Home</li>
              <li className="text-sm hover:underline">About Us</li>
              <li className="text-sm hover:underline">Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Appicoders Services</h3>
            <ul className="mt-3 space-y-2">
              <li className="text-sm hover:underline">
                Android Application Development
              </li>
              <li className="text-sm hover:underline">
                Android Application Development
              </li>
              <li className="text-sm hover:underline">
                Android Application Development
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-10 border-t border-gray-700 pt-5 text-sm">
        © 2023 APPICODERS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default Footer;
