import { Swiper, SwiperSlide } from "swiper/react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./AgentSlider.css"; // <-- Import your custom CSS

const AgentSlider = () => {
  const awards = [
    {
      id: 1,
      imgSrc: "/home/agentimg.png", // Update with actual image path
      title: "Shakil Ahemd",
      postion: "Managing Director",
    },
    {
      id: 2,
      imgSrc: "/home/agentimg.png", // Update with actual image path
      title: "Shakil Ahemd",
      postion: "Managing Director",
    },
    {
      id: 3,
      imgSrc: "/home/agentimg.png", // Update with actual image path
      title: "Shakil Ahemd",
      postion: "Managing Director",
    },
    {
      id: 4,
      imgSrc: "/home/agentimg.png", // Update with actual image path
      title: "Shakil Ahemd",
      postion: "Managing Director",
    },
    {
      id: 5,
      imgSrc: "/home/agentimg.png", // Update with actual image path
      title: "Shakil Ahemd",
      postion: "Managing Director",
    },
    {
      id: 6,
      imgSrc: "/home/agentimg.png", // Update with actual image path
      title: "Shakil Ahemd",
      postion: "Managing Director",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center text-[#8F8F8F] md:text-[48px]  mb-8">
        Our Excellent Agents
      </h2>

      <div className="relative">
        {/* Swiper Slider */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1.3}
          breakpoints={{
            1024: { slidesPerView: 3, spaceBetween: 20 }, // Desktop
            768: { slidesPerView: 3, spaceBetween: 15 }, // Tablet
            640: { slidesPerView: 1.3, spaceBetween: 5 }, // Small Tablet
            0: { slidesPerView: 1.3, spaceBetween: 8 }, // Mobile
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Pagination, Navigation]}
          loop={true}
          className="awards-slider"
        >
          {awards.map((award) => (
            <SwiperSlide key={award.id}>
              <div className="flex flex-col items-center">
                <img
                  src={award.imgSrc}
                  alt={award.title}
                  className="max-w-full h-[300px] "
                />
                <p className="text-center text-[#0E1625] mt-4 text-[24px] font-semibold">
                  {award.title}
                </p>
                <p className="text-center  text-[#969AA5] text-[16px] ">
                  {award.postion}
                </p>
                {/* Button and Icons */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-[5px]">
                    <div className="bg-[#8F8F8F] p-[5px] rounded-[5px]">
                      <FaWhatsapp className="text-white text-[10px] md:text-[15px] cursor-pointer" />
                    </div>
                    <div className="bg-[#8F8F8F] p-[5px] rounded-[5px]">
                      <FaPhoneAlt className="text-white text-[10px] md:text-[15px] cursor-pointer" />
                    </div>
                    <div className="bg-[#8F8F8F] p-[5px] rounded-[5px]">
                      <FaEnvelope className="text-white text-[10px] md:text-[15px] cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <div className="absolute z-10 w-full hidden lg:block">
          <div
            className="custom-prev swiper-button-prev px-4"
            style={{
              color: "#8F8F8F", // White text color
              top: "-220px",
              left: "25px",
              width: "1rem",
            }}
          ></div>
          <div
            className="custom-next swiper-button-next px-4"
            style={{
              color: "#8F8F8F", // White text color
              top: "-220px",
              right: "25px",
              width: "1rem",
            }}
          ></div>
        </div>

        {/* View All Awards Button */}
        {/* View All Areas Button */}
      </div>
    </div>
  );
};

export default AgentSlider;
