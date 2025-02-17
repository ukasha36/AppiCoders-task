import React from "react";

const Intro = () => {
  return (
    <div
      id="about"
      className=" flex md:flex-row flex-col gap-4  items-start  justify-center py-4 md:py-12 px-4"
    >
      <div className="  text-center  md:text-start md:w-[40%] ">
        <h3 className=" text-4xl  font-semibold ">
          {" "}
          <span className=" text-red-600 ">Appicoders</span> - #{" "}
          <span className=" text-red-600">1</span> Mobile App & Web Development
          Company in USA
        </h3>
      </div>

      <div className="  text-center  md:text-start  md:w-[40%]">
        <p className=" font-medium">
          Appicoders is the fastest-growing software development and consulting
          firm with locations and clients worldwide. For ten years, we have been
          recognized as highly professional and trusted assets in business
          process automation, custom software application development, mobile
          application development, business intelligence, IP auditing, and
          penetration services.
        </p>
        <button className=" text-[12px] md:text-lg w-[200px] mt-6 bg-gradient-to-r from-[#333333] to-[#dd1818] hover:bg-red-700 text-white py-2 px-6 rounded-lg font-semibold">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Intro;
