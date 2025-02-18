import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";
import "swiper/css/navigation";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";

const slides = [
  {
    mobileImage: "/hero-slider-img-1.webp",
    title: "Leading the Way in App Development Innovation",
    content:
      "We build Android & iOS Mobile Apps that cater to all your business needs and take it to the next level.",
  },
  {
    mobileImage: "/hero-slider-img-2.webp",
    title: "Transform Your Business with Cutting-Edge Apps",
    content:
      "Our innovative solutions help you stay ahead in the digital era with customized mobile applications.",
  },
  {
    mobileImage: "/hero-slider-img-3.webp",
    title: "Innovate and Elevate Your Digital Presence",
    content:
      "We create high-performance mobile apps designed to drive growth and enhance user engagement.",
  },
];

const Banner = () => {
  SwiperCore.use([Autoplay]);

  return (
    <div
      id="home"
      className="relative pt-32 h-[60rem] md:h-screen macbook:h-[60vh] w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-bg.webp')" }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center h-full px-10 md:px-20  lg:w-[80%] ">
        <Swiper
          modules={[Navigation]}
          navigation={{ nextEl: ".next", prevEl: ".prev" }}
          className="w-full"
          loop={true}
          autoplay={{
            delay: 2500, // Time in milliseconds between slides (3 seconds)
            disableOnInteraction: false, // Continue autoplay after user interaction
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex w-full flex-col lg:flex-row items-center justify-between">
                {/* Left Section - Changing Mobile Image */}
                <div className=" w-full lg:w-1/2 flex justify-center">
                  <img
                    src={slide.mobileImage}
                    alt={`Slide ${index + 1}`}
                    className=" sm:h-[600px] lg:max-h-[500px]"
                  />
                </div>
                {/* Right Section - Content */}
                <div className=" flex flex-col items-center lg:items-start lg:w-1/2 text-white">
                  <h1 className=" font-poppins text-center lg:text-start text-2xl md:text-4xl font-bold">
                    {slide.title}
                  </h1>
                  <p className=" font-poppins  mt-4 text-sm text-center lg:text-start md:text-lg">
                    {slide.content}
                  </p>
                  <button className="mt-6 font-poppins bg-gradient-to-r from-[#333333] to-[#dd1818] hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold">
                    GET A FREE QUOTE
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation Buttons */}
        <div className="lg:absolute lg:bottom-20 right-40 mt-6 mb-4  flex gap-4">
          <button className="prev bg-white text-black p-2 rounded-full">
            <MdOutlineArrowBack className="text-black" size={24} />
          </button>
          <button className="next bg-white text-black p-2 rounded-full">
            <MdOutlineArrowForward className="text-black" size={24} />
          </button>
        </div>
        ;
      </div>
    </div>
  );
};

export default Banner;
