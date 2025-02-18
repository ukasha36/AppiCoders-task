import React from "react";

const Intro = () => {
  return (
    <div
      id="about"
      className=" flex md:flex-row flex-col gap-8  items-start  justify-center py-4 md:py-12 px-4"
    >
      <div className="  text-center  md:text-start md:w-[40%]   ">
        <h3 className=" text-4xl font-bold  ">
          {" "}
          <span className=" text-red-600 font-poppins ">Appicoders</span> - #{" "}
          <span className=" text-red-600 font-poppins  ">1</span> Mobile App &
          Web Development Company in USA
        </h3>
      </div>

      <div className="  text-center  md:text-start  md:w-[40%]">
        <p className=" font-bold font-poppins ">
          Welcome to Appicoders, your trusted partner for expert mobile app and
          web development. With over 10+ years of experience, we specialize in
          designing. developing, and marketing cutting-edge solutions for all
          major mobile platforms, including Android, iOS, and Windows. But we
          don t just stop there. Our team of experts also excels in emerging
          technologies like AR, VR, and ML, as well as enterprise app
          development and digital marketing. Partner with us and experience the
          power of technology brought to life.
        </p>
        <button className=" font-poppins text-[12px] md:text-lg w-[200px] mt-6 bg-gradient-to-r from-[#333333] to-[#dd1818] hover:bg-red-700 text-white py-2 px-6 rounded-lg font-semibold">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Intro;
