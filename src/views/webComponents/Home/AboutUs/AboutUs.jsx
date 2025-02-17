import React from "react";
import AboutImage from "/aboutsection.png"; // Update path if needed

const AboutUs = () => {
  return (
    <section className="about-us py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Column */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className=" text-[26px] md:text-[48px] font-normal text-[#8F8F8F]">
            ABOUT US
          </h2>
          <p className="text-[#8F8F8F] leading-relaxed">
            Next Level Real Estate was established in 2013 and has been the
            driving force behind some of the greatest: corporate, institutional,
            private residential land, and commercial sectors across Dubai. Our
            company provides incredible solutions to property-related concerns.
            If you are looking to buy or rent property, our ideal
            property-related services will give you all the answers to your
            problems. Our up-to-date skills, marketing experience, and dedicated
            team make maximum efforts to let your property be known to all.
          </p>
          <p className="text-[#8F8F8F] leading-relaxed">
            We understand the value of connections between people and their
            properties. This propels us to go the extra mile and provide highly
            suitable places with sufficient security for our valued clients.
          </p>

          {/* Statistics Section */}
          <div className=" hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="">
              <h3 className="text-[23px] font-bold text-[#555555]  ">1500+</h3>
              <p className="text-[18px] mt-[2px] mb-[7px] font-medium text-[#555555]">
                Properties Sold
              </p>
              <span className="text-gray-500 text-sm">
                We have the experience to get the deal done right.
              </span>
            </div>
            <div className="">
              <h3 className="text-[23px] font-bold text-[#555555]">1400+</h3>
              <p className="text-[18px] mt-[2px] mb-[7px] font-medium text-[#555555]">
                Families Served
              </p>
              <span className="text-gray-500 text-sm">
                We have the experience to get the deal done right.
              </span>
            </div>
            <div className="">
              <h3 className="text-[23px] font-bold text-[#555555]">1700+</h3>
              <p className="text-[18px] mt-[2px] mb-[7px] font-medium text-[#555555]">
                Properties Managed
              </p>
              <span className="text-gray-500 text-sm">
                We have the experience to get the deal done right.
              </span>
            </div>
          </div>

          <div className=" mt-[20px]  md:mt-[50px]">
            <button className="w-[116px] h-[55px] text-[16px] px-4 py-1 bg-[#8F8F8F] text-white rounded-[8px] hover:bg-gray-800">
              Read More
            </button>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="lg:w-1/2">
          <img
            src={AboutImage}
            alt="About Us"
            className=" rounded-bl-[150px] md:rounded-lg  object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
