import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./Testimonial.css";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    image: "/testimonial-img-1.webp",
    name: "Jesenia Liseth Tovar",
    quote:
      "We're so glad after completion of our App development project by Appicoders, they stand for the incendiary fusion of form and function. You can see and feel the difference. They make apps that excite your eyes and set your thumbs on fire. Thank you 'Team Appicoders Inc.'",
  },
  {
    image: "/testimonial-img-2.png",
    name: "Jesenia Liseth Tovar",
    quote:
      "We're so glad after completion of our App development project by Appicoders, they stand for the incendiary fusion of form and function. You can see and feel the difference. They make apps that excite your eyes and set your thumbs on fire. Thank you 'Team Appicoders Inc.'",
  },
  {
    image: "/testimonial-img-3.png",
    name: "Jesenia Liseth Tovar",
    quote:
      "We're so glad after completion of our App development project by Appicoders, they stand for the incendiary fusion of form and function. You can see and feel the difference. They make apps that excite your eyes and set your thumbs on fire. Thank you 'Team Appicoders Inc.'",
  },
  {
    image: "/testimonial-img-4.png",
    name: "Jesenia Liseth Tovar",
    quote:
      "We're so glad after completion of our App development project by Appicoders, they stand for the incendiary fusion of form and function. You can see and feel the difference. They make apps that excite your eyes and set your thumbs on fire. Thank you 'Team Appicoders Inc.'",
  },
  {
    image: "/testimonial-img-5.png",
    name: "Jesenia Liseth Tovar",
    quote:
      "We're so glad after completion of our App development project by Appicoders, they stand for the incendiary fusion of form and function. You can see and feel the difference. They make apps that excite your eyes and set your thumbs on fire. Thank you 'Team Appicoders Inc.'",
  },
  {
    image: "/testimonial-img-6.png",
    name: "Jesenia Liseth Tovar",
    quote:
      "We're so glad after completion of our App development project by Appicoders, they stand for the incendiary fusion of form and function. You can see and feel the difference. They make apps that excite your eyes and set your thumbs on fire. Thank you 'Team Appicoders Inc.'",
  },
];

const Testimonial = () => {
  SwiperCore.use([Autoplay]);

  return (
    <div
      id="testimonials"
      className="relative flex items-center justify-center  h-[50rem]  md:h-screen macbook:h-[60vh] w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/testimonial-bg.webp')" }}
    >
      <div className="bg-[#c02626de] relative text-white p-4 py-12 md:p-8 rounded-lg shadow-lg w-11/12 md:w-[80%] lg:w-2/3">
        <div className="flex justify-start items-center mb-6 absolute top-[-30px] ">
          <div className="text-5xl bg-white text-red-500 rounded-[50%] px-4 pt-2  ">
            ❝
          </div>
        </div>
        <div className=" flex flex-col md:flex-row items-center   ">
          <div className="text-white  ">
            <h2 className="text-lg md:text-xl font-semibold">
              Client Testimonial
            </h2>
            <h1 className="text-3xl md:text-3xl font-bold">
              What our clients are Saying.
            </h1>
          </div>

          <div className=" w-full md:w-[60%] ">
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="mt-6"
              loop={true}
              autoplay={{
                delay: 2500, // Time in milliseconds between slides (3 seconds)
                disableOnInteraction: false, // Continue autoplay after user interaction
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white text-black p-6 rounded-lg shadow-lg">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-20 object-contain rounded-full"
                      />
                      <div className="flex flex-col ">
                        <h3 className="text-lg font-bold">
                          {testimonial.name}
                        </h3>
                        <div className=" w-16 h-[0.16rem] rounded-[1px] bg-red-600" />
                      </div>
                    </div>
                    <p className="text-gray-700 py-8  ">{testimonial.quote}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
