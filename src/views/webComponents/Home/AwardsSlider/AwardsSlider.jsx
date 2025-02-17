import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./AwardsSlider.css"; // <-- Import your custom CSS

const AwardsSlider = () => {
  const awards = [
    {
      id: 1,
      imgSrc: "/home/award.png", // Update with actual image path
      title: "Our Associated Agency Partner",
    },
    {
      id: 2,
      imgSrc: "/home/award.png", // Update with actual image path
      title: "Our Associated Agency Partner",
    },
    {
      id: 3,
      imgSrc: "/home/award.png", // Update with actual image path
      title: "Our Associated Agency Partner",
    },
    {
      id: 4,
      imgSrc: "/home/award.png", // Update with actual image path
      title: "Our Associated Agency Partner",
    },
    {
      id: 5,
      imgSrc: "/home/award.png", // Update with actual image path
      title: "Our Associated Agency Partner",
    },
    {
      id: 6,
      imgSrc: "/home/award.png", // Update with actual image path
      title: "Our Associated Agency Partner",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center text-3xl font-bold mb-8">
        Our Winning Awards
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
                <p className="text-center mt-4 text-lg font-medium">
                  {award.title}
                </p>
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
              top: "-200px",
              left: "25px",
              width: "1rem",
            }}
          ></div>
          <div
            className="custom-next swiper-button-next px-4"
            style={{
              color: "#8F8F8F", // White text color
              top: "-200px",
              right: "25px",
              width: "1rem",
            }}
          ></div>
        </div>

        {/* View All Awards Button */}
        {/* View All Areas Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-[#8F8F8F] text-white rounded-[6.5px] ">
            View All Awards
          </button>
        </div>
      </div>
    </div>
  );
};

export default AwardsSlider;
