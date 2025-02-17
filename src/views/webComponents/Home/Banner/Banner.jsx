import React from "react";
import { CiSearch } from "react-icons/ci";

const Banner = () => {
  return (
    <div className="flex justify-center">
      <div
        className=" h-[34rem] md:h-screen w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px]  md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('./banner.png')",
        }}
      >
        {/* Heading */}
        <h1 className="text-white md:text-[40px] text-[22px] font-bold  ">
          FIND YOUR PROPERTY
        </h1>

        <div className="flex gap-[20px] mb-[10px] ">
          <button className=" bg-white text-[#8D7F76] py-2 px-4   text-[10px] md:text-[20px]  h-[30px] w-[80px] md:h-[52px] md:w-[160px] rounded-[20px] md:rounded-[50px]">
            Residential
          </button>
          <button className=" bg-transparent text-white border border-white md:text-[20px] py-2 px-4 h-[30px] w-[80px] md:h-[52px] text-[10px] md:w-[160px] rounded-[20px] md:rounded-[50px]">
            Commercial
          </button>
          <button className=" bg-transparent text-white border border-white md:text-[20px] py-2 px-4 h-[30px] w-[84px] md:h-[52px] text-[10px] md:w-[160px] rounded-[20px] md:rounded-[50px]">
            OFF PLAN
          </button>
        </div>

        {/* Combined Input Section */}
        <div className="flex md:flex-row md:justify-between flex-col items-center w-[320px] h-[89px] md:w-[941px] px-[5px] md:px-[20px] md:h-[82px] bg-white rounded-tl-[17px] md:rounded-tl-[50px] rounded-br-[17px] md:rounded-br-[50px]   overflow-hidden   ">
          {/* Buy Select (20% width) */}
          <select className=" w-full md:w-[10%] text-[#8D7F76]  px-4 mr-[5px] pt-3 md:py-3 bg-transparent    focus:outline-none">
            <option>Buy</option>
            <option>Rent</option>
            <option>Lease</option>
          </select>

          <div className="w-full h-[131px] md:h-[82px] justify-between items-center md:w-[941px] flex  ">
            {/* Community or Building Input */}
            <input
              type="text"
              placeholder="Community or building    "
              className="md:w-[40%] md:text-[24px] w-[150px] text-[#8D7F764D] text-[13px] pl-[10px] md:px-4 py-3 bg-transparent border-r border-gray-300 text-gray-600 focus:outline-none"
            />

            {/* Price, Type, or Size Input */}
            <input
              type="text"
              placeholder="Price, Type or size"
              className="  w-[115px] md:w-[40%] md:text-[24px] text-[13px] text-[#8D7F764D] pl-[10px] md:px-4 py-3 bg-transparent   text-gray-600 focus:outline-none"
            />

            {/* Search Button */}
            <button className="bg-[#8A7C72] text-white w-[28px]  h-[28px]  py-3  md:w-[55px] md:h-[53px] rounded-full flex justify-center items-center">
              <CiSearch className="text-[white] text-[12px] md:text-[20px] " />
            </button>
          </div>
        </div>

        {/* Subtext and Contact Us Button */}
        <div className="text-center text-white mt-8">
          <div>
            <p className="text-[11px] md:text-[20px] ">
              Prices are always changing
            </p>
            <p className="text-[11px] md:text-[20px] ">
              Find out the value of your property today
            </p>
          </div>

          <button className=" bg-white text-[#8D7F76] py-2 px-4  mt-4 text-[10px] md:text-[20px]  h-[30px] w-[84px] md:h-[52px] md:w-[160px] rounded-[20px] md:rounded-[50px]">
            Contact US
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
