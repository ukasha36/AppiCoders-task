import React from "react";

const ExploreDeveloperSection = () => {
  const developers = [
    {
      id: 1,
      name: "DANUBE PROPERTIES",
      imgSrc: "/home/d1.png", // Replace with the actual image path
    },
    {
      id: 2,
      name: "DAMAC",
      imgSrc: "/home/d2.png", // Replace with the actual image path
    },
    {
      id: 3,
      name: "EMAAR",
      imgSrc: "/home/d3.png", // Replace with the actual image path
    },
    {
      id: 4,
      name: "DUBAI PROPERTIES",
      imgSrc: "/home/d4.png", // Replace with the actual image path
    },
  ];

  return (
    <div className="container mx-auto py-12">
      {/* Section Heading */}
      <h3 className="text-center text-sm font-semibold text-gray-500 mb-2">
        DUBAI TOP RATING DEVELOPERS
      </h3>
      <h2 className="text-center text-3xl font-bold mb-8">
        EXPLORE DEVELOPERS
      </h2>

      {/* Developers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {developers.map((developer, index) => (
          <div key={index} className={`relative `}>
            <div
              className={`  ${
                index === 0
                  ? "rounded-bl-[150px]"
                  : index === developers.length - 1
                  ? "rounded-br-[150px]"
                  : ""
              }`}
            >
              {/* Developer Image */}
              <img
                src={developer.imgSrc}
                alt={developer.name}
                className="w-full  h-[300px] object-cover"
              />
            </div>

            {/* Overlay with Developer Name */}
            <div className="absolute bottom-[20px] left-[30%]  bg-opacity-50 flex items-center justify-center  ">
              <h3 className="text-white text-lg font-bold">{developer.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default ExploreDeveloperSection;
