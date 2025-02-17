import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Property data
const properties = {
  Apartments: [
    {
      id: 1,
      image: "/p1.png",
      name: "Contemporary Apartment",
      price: "$450,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 2,
      image: "/p2.png",
      name: "Urban Apartment",
      price: "$410,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 3,
      image: "/p3.png",
      name: "Luxury Apartment",
      price: "$500,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 4,
      image: "/p1.png",
      name: "Contemporary Apartment",
      price: "$450,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 5,
      image: "/p2.png",
      name: "Urban Apartment",
      price: "$410,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 6,
      image: "/p3.png",
      name: "Luxury Apartment",
      price: "$500,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
  ],
  Villas: [
    {
      id: 1,
      image: "/p3.png",
      name: "Luxury Villa",
      price: "$1,000,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 2,
      image: "/p3.png",
      name: "Family Villa",
      price: "$850,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 3,
      image: "/p3.png",
      name: "Modern Villa",
      price: "$900,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 4,
      image: "/p1.png",
      name: "Contemporary Apartment",
      price: "$450,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 5,
      image: "/p2.png",
      name: "Urban Apartment",
      price: "$410,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 6,
      image: "/p3.png",
      name: "Luxury Apartment",
      price: "$500,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
  ],
  Townhouses: [
    {
      id: 1,
      image: "/p3.png",
      name: "Smart Townhouse",
      price: "$700,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 2,
      image: "/p3.png",
      name: "Cozy Townhouse",
      price: "$650,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 3,
      image: "/p3.png",
      name: "Family Townhouse",
      price: "$720,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 4,
      image: "/p1.png",
      name: "Contemporary Apartment",
      price: "$450,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 5,
      image: "/p2.png",
      name: "Urban Apartment",
      price: "$410,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
    {
      id: 6,
      image: "/p3.png",
      name: "Luxury Apartment",
      price: "$500,000",
      beds: 3,
      sqft: "4000 sq ft",
    },
  ],
};

const LifeStyleSection = () => {
  const [activeTab, setActiveTab] = useState("Apartments");

  const handleTabClick = (type) => {
    setActiveTab(type);
  };

  const currentProperties = properties[activeTab];

  return (
    <div className="container mx-auto py-8 flex md:justify-center flex-col items-center ">
      <h2 className="text-center text-[#8F8F8F] text-[17px] w-[296px] md:w-full md:text-[34px] font-semibold mb-8">
        Life Style in Dubai
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        {["Apartments", "Villas", "Townhouses"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 font-bold mx-2 ${
              activeTab === type
                ? " text-[#8F8F8F]   bg-gray-200 "
                : " text-white bg-[#8F8F8F]"
            } rounded`}
            onClick={() => handleTabClick(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Cards/Grid (Desktop) */}
      <div className="hidden md:grid grid-cols-3 md:gap-y-[20px] md:w-[80%] ">
        {currentProperties.map((property, index) => (
          <div
            key={index}
            className="bg-white md:w-[300px] border border-black px-[5px] p-2  rounded-[13px] overflow-hidden flex flex-col items-center "
          >
            <img
              src={property.image}
              alt={property.name}
              className={` md:w-[280px] w-[173px] h-[159px] md:h-[200px] object-contain ${
                index === 0
                  ? "rounded-bl-[74px]"
                  : index === properties.length - 1
                  ? "rounded-br-[74px]"
                  : ""
              }`}
            />
            <div className="flex flex-col items-center w-full  p-[10px] pt-[0px] ">
              <h3 className="text-[12px] md:text-[17px] font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                {property.name}
              </h3>
              <div className="text-gray-600 text-[11px] flex flex-col items-center mb-1 md:mb-4">
                <p className="text-[8.9px] md:text-[15px] text-[#8F8F8F]">
                  Start from{" "}
                </p>
                <p className="text-[8.9px] md:text-[18px] font-bold text-[#8F8F8F]">
                  {property.price}
                </p>
              </div>

              <div className="flex justify-evenly w-full text-sm text-[#8F8F8F] mb-4">
                <div className="flex items-center gap-1 pr-[10px] border-r border-black">
                  <img
                    src="/bed.png"
                    alt="bed icon"
                    className="w-[9.9px]  md:w-[20px] "
                  />
                  <span>Beds {property.beds}</span>
                </div>
                <div className="flex items-center  gap-1">
                  <img
                    src="/feet.png"
                    alt="sqft icon"
                    className="w-[9.9px] md:w-[20px] "
                  />
                  <span>{property.sqft}</span>
                </div>
              </div>

              <button className="w-[100px] md:w-[202px] text-[9px] py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-gray-800">
                View more detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slider (Mobile) */}
      <div className="block md:hidden h-[378px] w-full px-4">
        <Swiper
          spaceBetween={15}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
        >
          {currentProperties.map((property, index) => (
            <SwiperSlide key={property.id}>
              <div className="bg-white border border-black h-[339px] p-4 rounded-[13px] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-[159px] object-cover rounded-t-[13px]"
                />
                <div className="text-center py-3">
                  <h3 className="text-[12px] font-semibold mb-2 text-[#8F8F8F]">
                    {property.name}
                  </h3>
                  <p className="text-[8.9px] text-[#8F8F8F]">Start from</p>
                  <p className="text-[12px] font-bold text-[#8F8F8F] mb-2">
                    {property.price}
                  </p>

                  <div className="flex justify-center space-x-4 text-sm text-[#8F8F8F]">
                    <div className="flex items-center gap-1">
                      <img
                        src="/bed.png"
                        alt="bed icon"
                        className="w-[9.9px]"
                      />
                      <span>Beds {property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/feet.png"
                        alt="sqft icon"
                        className="w-[9.9px]"
                      />
                      <span>{property.sqft}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full text-[9px] py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-gray-800">
                  View more detail
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* See All Properties Button */}
      <div className="text-center mt-[20px]  md:mt-[50px]">
        <button className="w-[176px] h-[55px] text-[16px] px-4 py-1 bg-[#8F8F8F] text-white rounded-[8px] hover:bg-gray-800">
          See All Property
        </button>
      </div>
    </div>
  );
};

export default LifeStyleSection;
