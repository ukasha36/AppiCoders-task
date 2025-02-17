import React from 'react';

export const GetInTouch = () => {
  return (
    <div className="flex flex-wrap lg:flex-row justify-between lg:justify-center items-center p-10 lg:p-24 bg-white">
      {/* Left form section */}
      <div className="flex flex-col space-y-6 w-full md:w-1/3">
        <h2 className="text-2xl text-center md:text-start md:text-4xl font-light text-gray-500">
          GET IN TOUCH FOR A FREE GUIDE
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border-b-[0.5px] border-black outline-none py-2 text-gray-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border-b-[0.5px] border-black outline-none py-2 text-gray-600"
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full border-b-[0.5px] border-black outline-none py-2 text-gray-600"
          />
          <button
            type="submit"
            className="w-32 lg:w-1/3 bg-gray-500 text-white py-3 px-4 mt-4 rounded-lg hover:bg-gray-600 transition"
          >
            Click For a Free Call
          </button>
        </form>
      </div>

      {/* Right image section */}
      <div className="relative w-full md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
        {/* Image */}
        <img
          src="/Areas/GetTouch.png"
          alt="Contact Person"
          className="w-[300px] md:w-[400px] rounded-lg shadow-lg"
        />
        {/* Info Card */}
        <div className="absolute bottom-[-50px] md:bottom-[-30px] md:right-[-20px] w-64 md:w-96 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-gray-700">MR. COLLING WOOD</h3>
          <p className="text-sm text-gray-500">
            Senior Sales Advisor Of Next Level Real Estate
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M21 10v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6"
              />
            </svg>
            <p className="text-gray-500 text-sm">+9 715 5258 8870</p>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7l9-4 9 4v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
              />
            </svg>
            <p className="text-gray-500 text-sm">
              1505, Opal Tower Burj Khalifa Boulevard – Business Bay – Dubai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
