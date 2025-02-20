import React, { useState } from "react";

const productsData = [
  {
    id: 1,
    category: "Health Supreme",
    images: [
      "/products/HealthSupreme/Health-Supreme01.png",
      "/products/HealthSupreme/Health-Supreme02.png",
    ],
  },
  {
    id: 2,
    category: "CRM 365",
    images: ["/products/365CRM/CRM01.png", "/products/365CRM/CRM02.png"],
  },
  {
    id: 3,
    category: "OSDA",
    images: ["/products/OSDA/OSDA01.png", "/products/OSDA/OSDA02.png"],
  },
  {
    id: 4,
    category: "Marketplace E-Commerce Platform",
    images: [
      "/products/MarketplaceE-CommercePlatform/Marketplace-E-Commerce-Platform.png",
      "/products/MarketplaceE-CommercePlatform/Marketplace-E-Commerce-Platform01.png",
      "/products/MarketplaceE-CommercePlatform/Marketplace-E-Commerce-Platform02.png",
    ],
  },
  {
    id: 5,
    category: "Sports Training App",
    images: [
      "/products/Sports-Training-App/Sports-Training-App01.png",
      "/products/Sports-Training-App/Sports-Training-App02.png",
      "/products/Sports-Training-App/Sports-Training-App03.png",
    ],
  },
  {
    id: 6,
    category: "Fitness",
    images: [
      "/public/products/Fitness/Fitness01.png",
      "/public/products/Fitness/Fitness02.png",
      "/public/products/Fitness/Fitness03.png",
    ],
  },
];

const categories = [
  "All",
  ...new Set(productsData.map((product) => product.category)),
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((product) => product.category === selectedCategory);

  return (
    <div
      id="portfolio"
      className=" py-8 bg-red-600 text-white"
      style={{
        backgroundImage: "url('/products-bg.webp')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h2 className="text-center text-3xl font-bold">Products</h2>
      <div className="flex md:justify-center justify-start space-x-4 mx-1 overflow-x-auto mt-4 scrollbar-hide md:flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={` px-1 md:px-4 py-2  text-[12px] md:text-[16px]  rounded ${
              selectedCategory === category
                ? "border-white text-white rounded-none border-b-2"
                : "bg-transparent text-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className=" flex justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-8 md:w-[80%] ">
          {filteredProducts.map((product) =>
            product.images.map((img, index) => (
              <div
                key={`${product.id}-${index}`}
                className="bg-white p-4 rounded-lg"
              >
                <img
                  src={img}
                  alt={product.category}
                  className="w-full rounded mb-2"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
