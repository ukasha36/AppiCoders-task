import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const properties = [
  {
    image: "/i5.png",
    name: "Dubai Hills Estate",
    price: "AED 14,50,000",
  },
  {
    image: "/i4.png",
    name: "Downtown Dubai",
    price: "AED 14,50,000",
  },
  {
    image: "/i3.png",
    name: "Dubai Creek Harbour",
    price: "AED 14,50,000",
  },
  {
    image: "/i2.png",
    name: "Jumeirah Village Circle",
    price: "AED 14,50,000",
  },
  {
    image: "/i5.png",
    name: "Business Bay",
    price: "AED 14,50,000",
  },
];

const PropertyList = () => {
  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-8">
      <h1 className=" text-[21px] md:text-[48px] font-bold text-[#8F8F8F] mb-8 text-center">
        Top Properties for Investing
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:w-[90%] lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-3 md:gap-4">
        {properties.map((property, index) => (
          <div
            key={index}
            className={`   bg-white md:p-[6px]   ${
              index === 4 ? "hidden xl:block" : ""
            }`}
          >
            <div
              className={`relative  w-[175px] h-[270px] md:w-full md:h-auto overflow-hidden ${
                index % 2 === 0
                  ? " rounded-tl-[60px]  md:rounded-tl-[100px]"
                  : " rounded-br-[60px] md:rounded-br-[100px]"
              }`}
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full md:object-cover"
              />
            </div>
            <h2 className=" text-[15px] text-center md:text-left md:text-[16px] font-bold mt-4 text-[#8F8F8F]">
              {property.name}
            </h2>
            <p className="text-[#8F8F8F] text-[16px] text-center md:text-left ">
              Starting price
            </p>
            <p className="text-[#8F8F8F] font-semibold text-[15px] md:text-[18px]  text-center md:text-left ">
              {property.price}
            </p>

            {/* Button and Icons */}
            <div className="flex items-center justify-between mt-4">
              <button className="bg-[#8F8F8F] w-[96px] md:w-[115px] text-[10px] text-white  py-1 md:px-4 rounded-[8px]">
                View More
              </button>
              <div className="flex gap-[5px]">
                <div className="bg-[#8F8F8F] p-[3px] rounded-[5px]">
                  <FaWhatsapp className="text-white text-[10px] md:text-[12px] cursor-pointer" />
                </div>
                <div className="bg-[#8F8F8F] p-[3px] rounded-[5px]">
                  <FaPhoneAlt className="text-white text-[10px] md:text-[12px] cursor-pointer" />
                </div>
                <div className="bg-[#8F8F8F] p-[3px] rounded-[5px]">
                  <FaEnvelope className="text-white text-[10px] md:text-[12px] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
