// ReviewSlider.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PlatformSlider = () => {
  const reviews = [
    { rating: 4.2, platform: "Trustpilot", logo: "/trustpilot.png" },
    { rating: 4.3, platform: "Google", logo: "/google.png" },
    { rating: 4.1, platform: "Hidubai", logo: "/HiDubai.png" },
    { rating: 3.5, platform: "Sortlist", logo: "/sortlist.png" },
    { rating: 5, platform: "GoodFirms", logo: "/dil.png" },
    { rating: 4.6, platform: "Other", logo: "/star.png" },
    { rating: 5, platform: "GoodFirms", logo: "/dil.png" },
  ];

  return (
    <div className="w-full md:w-[1100px] mt-[25px] h-auto mx-auto px-4 py-10">
      <Swiper
        slidesPerView={5} // Desktop layout
        spaceBetween={10}
        breakpoints={{
          1024: { slidesPerView: 6, spaceBetween: 20 }, // Desktop
          768: { slidesPerView: 3, spaceBetween: 15 }, // Tablet
          640: { slidesPerView: 2, spaceBetween: 10 }, // Small Tablet
          0: { slidesPerView: 2, spaceBetween: 8 }, // Mobile
        }}
        className="mySwiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{review.rating}</p>
                <img
                  src="/rating.png"
                  alt={review.platform}
                  className="w-[94px] h-[16px] mb-2"
                />
              </div>

              <img
                src={review.logo}
                alt={review.platform}
                className="w-[116px] h-[38px] object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PlatformSlider;
