import React from "react";

const categories = [
  { title: "Buying", icon: "/renting.png" },
  { title: "Selling", icon: "/selling.png" },
  { title: "Renting", icon: "/property.png" },
  { title: "Property Management", icon: "/buying.png" },
];

const CategoriesSection = () => {
  return (
    <div className=" hidden md:flex justify-center gap-[20px] p-8">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`w-56 h-56 flex flex-col items-center justify-center`}
        >
          <div
            className={` bg-[#616161B5] h-[215px] w-[223px] flex items-center justify-center ${
              index === 0
                ? "rounded-bl-[90px]"
                : index === categories.length - 1
                ? "rounded-br-[90px]"
                : ""
            }`}
          >
            <img
              src={category.icon}
              alt={category.title}
              className="h-16 w-16 object-contain"
            />
          </div>
          <h3 className="mt-4 text-lg font-medium">{category.title}</h3>
          <button className="mt-4 px-4 py-1 text-[16px] bg-[#616161B5] text-white rounded-[8px] ">
            View more detail
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSection;
