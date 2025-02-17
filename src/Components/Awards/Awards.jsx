import React from "react";
import { FaIndustry, FaLaptopCode, FaBriefcase } from "react-icons/fa";

const industries = [
  {
    image: "/awards-img-1.webp",
  },
  {
    image: "/awards-img-2.webp",
  },
  {
    image: "/awards-img-3.webp",
  },
  {
    image: "/awards-img-4.webp",
  },
];

const Awards = () => {
  return (
    <section className=" bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Awards And Recoginization
        </h2>
        <div className=" flex flex-wrap  justify-center gap-8 ">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="bg-white p-6 rounded-[50%] shadow-md flex gap-8    "
            >
              <div className=" ">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className=" w-24 md:w-44   object-contain   "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
