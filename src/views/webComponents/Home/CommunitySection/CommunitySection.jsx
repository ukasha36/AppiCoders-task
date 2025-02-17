import React from "react";

const CommunitySection = () => {
  return (
    <div className="bg-white py-8 flex flex-col items-center">
      <h2 className="text-center text-[#8F8F8F] text-[25px]  md:text-[48px] font-normals mb-1">
        POPULAR COMMUNITIES
      </h2>
      <p className="text-center text-[#8F8F8F] mb-4 text-[12px] w-[90%] md:text-[18px] ">
        Next Level Real Estate was established in 2015 and has been the driving
        force behind some of the greatest:
      </p>
      <div className="flex md:w-[90%] gap-[10px] justify-center ">
        <div className="flex justify-center md:w-[80%] flex-col items-center ">
          <div className="flex justify-center flex-wrap md:flex-nowrap w-[100%] gap-[10px] mb-[10px]  ">
            {/* First Row */}
            <div className="relative w-[45%]  md:w-[30%] h-[174px] md:h-[284px] ">
              <img
                src="/c1.png"
                alt="Community 1"
                className="object-cover rounded-tl-[61px] md:rounded-tl-[100px] w-[100%] h-[100%]"
              />
              <p className="absolute bottom-4 left-4 text-white font-bold">1</p>
            </div>
            <div className="relative w-[45%]  md:w-[30%] h-[174px] md:h-[284px] ">
              <img
                src="/c2.png"
                alt="Community 1"
                className="object-cover  w-[100%] h-[100%] "
              />
              <p className="absolute bottom-4 left-4 text-white font-bold">2</p>
            </div>
            <div className="relative w-[94%]  md:w-[40%] h-[193px] md:h-[284px] ">
              <img
                src="/c1.png"
                alt="Community 1"
                className="object-cover rounded-bl-[50px] w-[100%] h-[100%]"
              />
              <p className="absolute bottom-4 left-4 text-white font-bold">3</p>
            </div>
          </div>
          {/* Second Row */}

          <div className=" w-[100%] hidden md:flex gap-[10px] justify-center">
            <div className="relative w-[60%] flex gap-[5px]">
              <div className="relative w-[620px] h-[280px] rounded-bl-[50px] overflow-hidden">
                <img
                  src="/c4.png"
                  alt="Community 3"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
              </div>
              <p className="absolute bottom-4 left-4 text-white font-bold">1</p>
            </div>

            <div className="relative  w-[40%] ">
              <img
                src="/c2.png"
                alt="Community 3"
                className="object-cover rounded-tr-[100px]  w-[100%] h-[280px]"
              />
              <p className="absolute bottom-4 left-4 text-white font-bold">2</p>
            </div>
          </div>
        </div>

        <div className="  ">
          <div className="relative  hidden md:block w-[254px] ">
            <img
              src="/c1.png"
              alt="Community 3"
              className="object-cover rounded-tr-[100px] rounded-br-[100px] w-[254px] h-[580px]"
            />
            <p className="absolute bottom-4 left-4 text-white font-bold">
              DUMMY TEXT
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-16 ">
        <button className="px-6 py-2 bg-[#8F8F8F] text-white rounded-md">
          VIEW ALL COMMUNITY
        </button>
      </div>
    </div>
  );
};

export default CommunitySection;
