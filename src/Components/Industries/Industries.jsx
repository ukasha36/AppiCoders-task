import React from "react";
import { FaIndustry, FaLaptopCode, FaBriefcase } from "react-icons/fa";

const industries = [
  {
    id: 1,
    image: "/industry-icon-1.webp",
    name: "Manufacturing",
    description:
      "We provide tailored solutions for the manufacturing industry to streamline operations and enhance productivity.",
  },
  {
    id: 2,
    image: "/industry-icon-2.webp",
    name: "Technology",
    description:
      "Our innovative solutions help technology companies stay ahead with modern tools and strategies.",
  },
  {
    id: 3,
    image: "/industry-icon-3.webp",
    name: "Business Services",
    description:
      "We assist businesses with comprehensive services to optimize workflows and maximize efficiency.",
  },
  {
    id: 4,
    image: "/industry-icon-4.webp",
    name: "Business Services",
    description:
      "We assist businesses with comprehensive services to optimize workflows and maximize efficiency.",
  },
  {
    id: 5,
    image: "/industry-icon-5.webp",
    name: "Business Services",
    description:
      "We assist businesses with comprehensive services to optimize workflows and maximize efficiency.",
  },
  {
    id: 6,
    image: "/industry-icon-6.webp",
    name: "Business Services",
    description:
      "We assist businesses with comprehensive services to optimize workflows and maximize efficiency.",
  },
  {
    id: 7,
    image: "/industry-icon-4.webp",
    name: "Business Services",
    description:
      "We assist businesses with comprehensive services to optimize workflows and maximize efficiency.",
  },
  {
    id: 8,
    image: "/industry-icon-5.webp",
    name: "Business Services",
    description:
      "We assist businesses with comprehensive services to optimize workflows and maximize efficiency.",
  },
  {
    id: 9,
    image: "/industry-icon-6.webp",
    name: "Business Services",
    description:
      "We assist businesses with comprehensive services to optimize workflows and maximize efficiency.",
  },
];

const Industries = () => {
  return (
    <section id="services" className="bg-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-poppins  font-bold text-center text-gray-800 mb-8">
          Industries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="bg-white p-6 rounded-lg shadow-md flex gap-8 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100"
            >
              <div>
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-32 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {industry.name}
                </h3>
                <p className="text-gray-600 font-poppins">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
