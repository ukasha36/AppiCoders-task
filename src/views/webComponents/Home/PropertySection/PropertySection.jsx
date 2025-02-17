import React from "react";

const properties = [
  {
    title: "Villa on Grand Avenue",

    image: "/p1.png", // Replace with the actual image path
    beds: 3,
    sqft: "4000 sq ft",
    price: "$30,000.00",
  },
  {
    title: "Contemporary Apartment",
    price: "$45,000.00",
    image: "/p2.png", // Replace with the actual image path
    beds: 2,
    sqft: "3000 sq ft",
  },
  {
    title: "Luxury Villa With Pool",
    price: "$63,000.00",
    image: "/p2.png", // Replace with the actual image path
    beds: 4,
    sqft: "5000 sq ft",
  },
  {
    title: "Luxury Villa With Pool",
    price: "$63,000.00",
    image: "/p3.png", // Replace with the actual image path
    beds: 4,
    sqft: "5000 sq ft",
  },
];

const PropertySection = () => {
  return (
    <div className="p-5 md:mt-10 flex justify-center flex-col items-center ">
      <h2 className="text-center text-[#8F8F8F] text-[17px] w-[296px] md:w-full md:text-[34px] font-semibold mb-8">
        EXPERIENCE THE LUXURY OFF PLAN PROPERTY FOR SALE
      </h2>

      {/* Adjusted layout using Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 md:w-[85%] justify-center gap-[10px] md:gap-[5px] md:mb-[50px]">
        {properties.map((property, index) => (
          <div
            key={index}
            className="bg-white md:w-[260px] border border-black px-[5px]  rounded-[13px] overflow-hidden flex flex-col items-center "
          >
            <img
              src={property.image}
              alt={property.title}
              className={` md:w-[280px] w-[173px] h-[159px] md:h-[200px] object-contain ${
                index === 0
                  ? "rounded-bl-[74px]"
                  : index === properties.length - 1
                  ? "rounded-br-[74px]"
                  : ""
              }`}
            />
            <div className="flex flex-col items-center w-full  p-[10px] pt-[0px] ">
              <h3 className="text-[11px] md:text-[17px] font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                {property.title}
              </h3>
              <div className="text-[#8F8F8F] text-[11px] flex flex-col items-center mb-2 md:mb-4">
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
                  <span className=" text-[7px] ">Beds {property.beds}</span>
                </div>
                <div className="flex items-center  gap-1">
                  <img
                    src="/feet.png"
                    alt="sqft icon"
                    className="w-[9.9px] md:w-[20px] "
                  />
                  <span className="text-[7px]">{property.sqft}</span>
                </div>
              </div>

              <button className="w-[100px] md:w-[202px] text-[9px] py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-gray-800">
                View more detail
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-[50px]">
        <button className="w-[176px] h-[55px] text-[16px] px-4 py-1 bg-[#8F8F8F] text-white rounded-[8px] hover:bg-gray-800">
          See All Property
        </button>
      </div>
    </div>
  );
};

export default PropertySection;
