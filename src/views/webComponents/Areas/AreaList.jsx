import React, { useState } from 'react';

export const AreaList = () => {
  // Property data
  const properties = [
    { id: 1, image: "/p1.png", name: "Contemporary Apartment", price: "$450,000", beds: 3, sqft: "4000 sq ft" },
    { id: 2, image: "/p2.png", name: "Urban Apartment", price: "$410,000", beds: 3, sqft: "4000 sq ft" },
    { id: 3, image: "/p3.png", name: "Luxury Apartment", price: "$500,000", beds: 3, sqft: "4000 sq ft" },
    { id: 4, image: "/p1.png", name: "Contemporary Apartment", price: "$450,000", beds: 3, sqft: "4000 sq ft" },
    { id: 5, image: "/p2.png", name: "Urban Apartment", price: "$410,000", beds: 3, sqft: "4000 sq ft" },
    { id: 6, image: "/p3.png", name: "Luxury Apartment", price: "$500,000", beds: 3, sqft: "4000 sq ft" },
    { id: 7, image: "/p3.png", name: "Luxury Villa", price: "$1,000,000", beds: 3, sqft: "4000 sq ft" },
    { id: 8, image: "/p3.png", name: "Family Villa", price: "$850,000", beds: 3, sqft: "4000 sq ft" },
    { id: 9, image: "/p3.png", name: "Modern Villa", price: "$900,000", beds: 3, sqft: "4000 sq ft" },
    { id: 10, image: "/p1.png", name: "Contemporary Apartment", price: "$450,000", beds: 3, sqft: "4000 sq ft" },
    { id: 11, image: "/p2.png", name: "Urban Apartment", price: "$410,000", beds: 3, sqft: "4000 sq ft" },
    { id: 12, image: "/p3.png", name: "Luxury Apartment", price: "$500,000", beds: 3, sqft: "4000 sq ft" },
    { id: 13, image: "/p3.png", name: "Smart Townhouse", price: "$700,000", beds: 3, sqft: "4000 sq ft" },
    { id: 14, image: "/p3.png", name: "Cozy Townhouse", price: "$650,000", beds: 3, sqft: "4000 sq ft" },
    { id: 15, image: "/p3.png", name: "Family Townhouse", price: "$720,000", beds: 3, sqft: "4000 sq ft" },
    { id: 16, image: "/p1.png", name: "Contemporary Apartment", price: "$450,000", beds: 3, sqft: "4000 sq ft" },
    { id: 17, image: "/p2.png", name: "Urban Apartment", price: "$410,000", beds: 3, sqft: "4000 sq ft" },
    { id: 18, image: "/p3.png", name: "Luxury Apartment", price: "$500,000", beds: 3, sqft: "4000 sq ft" }
  ];

  // State to control the number of visible properties
  const [visibleCount, setVisibleCount] = useState(6);

  // Load more properties by increasing the visible count by 6
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className='pt-12 md:pt-24 md:p-24 flex flex-wrap justify-center items-center gap-4'>
      {/* Display the visible properties */}
      {properties.slice(0, visibleCount).map((property, index) => (
        <div
          key={index}
          className="bg-white md:w-[350px] border border-black px-[5px] p-2  rounded-[13px] overflow-hidden flex flex-col items-center"
        >
          <img
            src={property.image}
            alt={property.name}
            className={`md:w-[340px] w-[173px] h-[159px] md:h-[250px] object-contain rounded`}
          />
          <div className="flex flex-col w-full p-[10px] pt-[0px]">
            <h3 className="text-[12px] md:text-[18px] font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
              {property.name}
            </h3>
            <div className="text-[#8F8F8F] text-[11px] flex flex-col items-center mb-1 md:mb-4">
              <p className="text-xs md:text-md font-bold text-[#8F8F8F]">
                Price From <span className="text-[16px]">{property.price}</span>
              </p>
            </div>
            <div className="flex justify-center gap-1">
              <button className="w-1/2 p-4 text-[12px] py-2 bg-[#8F8F8F] text-white rounded-[5px] hover:border-[1px] border-[#8F8F8F] hover:text-[#8F8F8F] hover:bg-transparent">
                Buy Property
              </button>
              <button className="w-1/2 p-4 text-[12px] py-2 bg-[#8F8F8F] text-white rounded-[5px] hover:border-[1px] border-[#8F8F8F] hover:text-[#8F8F8F] hover:bg-transparent">
                Rent Property
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Show the Load More button if there are more properties to load */}
      {visibleCount < properties.length && (
        <div className='w-full flex justify-center items-center'>
        <button
          onClick={loadMore}
          className="mt-8 py-2 px-4 border-2 border-[#8F8F8F] bg-[#8F8F8F] text-white rounded hover:text-[#8F8F8F] hover:bg-transparent text-center"
        >
          Load More
        </button>
        </div>
      )}
    </div>
  );
};
