import React from "react";

const ConsultancySection = () => {
  return (
    <section className=" h-[400px] mt-[100px]  flex justify-center ">
      {/* Container for the hero section */}

      <div className="flex flex-col bg-[url('/consultancy.png')] bg-left md:bg-center bg-cover w-[90%] md:w-[85%] items-center justify-center rounded-br-[160px] md:rounded-br-[0px]  md:rounded-tl-[160px]  ">
        <div className="flex flex-col  w-[90%] gap-[20px]  ">
          <h1 className="text-[24px]  md:text-[48px] md:leading-[52.5px] font-normal md:w-[776px]">
            <span className="text-white  ">
              Professional Develop <br /> Management Consultancy
            </span>
          </h1>
          <p className="text-white md:text-[20px] ">
            Expert Guidance in Property Development, Investment, and Planning
          </p>

          <div className="flex s md:w-[206px] ">
            <button className="bg-white text-[#8F8F8F]   py-3 px-4 rounded-[7.21px] border border-white text-[11px]">
              Consult with Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultancySection;
