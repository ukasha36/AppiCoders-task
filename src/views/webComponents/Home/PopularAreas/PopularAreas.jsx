const PopularAreas = () => {
  const areas = [
    { id: 1, image: "/home/p1.png", text: "DUMMY TEXT" },
    { id: 2, image: "/home/p1.png", text: "DUMMY TEXT" },
    { id: 3, image: "/home/p1.png", text: "DUMMY TEXT" },
    { id: 4, image: "/home/p1.png", text: "DUMMY TEXT" },
    { id: 5, image: "/home/p1.png", text: "DUMMY TEXT" },
    { id: 6, image: "/home/p1.png", text: "DUMMY TEXT" },
    { id: 7, image: "/home/p1.png", text: "DUMMY TEXT" },
    { id: 8, image: "/home/p1.png", text: "DUMMY TEXT" },
  ];

  return (

    <div className=" flex flex-col items-center py-10">
      <h2 className="text-3xl text-[#8F8F8F] font-semibold text-center mb-2">
        MOST POPULAR AREAS
      </h2>
      <p className="text-center w-[80%] text-[#8F8F8F] mb-8">
        Next Level Real Estate was established in 2013 and has been the driving
        force behind some of the greatest:
      </p>

      <div className="flex  md:w-[100%] gap-[10px] justify-center ">
        <div className="flex justify-center w-[90%] md:w-[80%] flex-col items-center ">
          <div className="flex justify-center flex-wrap md:flex-nowrap md:w-[100%] gap-[10px] mb-[10px]  ">
            {/* First Row */}
            <div className="relative w-[360px]  md:w-[55%] h-[174px] md:h-[284px] ">
              <img
                src="/home/p1.png"
                alt="Community 1"
                className="object-cover rounded-[18px]  w-[100%] h-[100%]"
              />
              <p className="absolute bottom-4 left-4 text-white font-bold">
                DUMMY TEXT
              </p>
            </div>
            <div className="relative w-[45%]  hidden md:block md:w-[25%] h-[174px] md:h-[284px] ">
              <img
                src="/home/i5.png"
                alt="Community 1"
                className="object-cover rounded-[18px]   w-[100%] h-[100%] "
              />
              <p className="absolute bottom-4 left-4 text-white font-bold">
                DUMMY TEXT
              </p>
            </div>
            <div className="relative w-[94%] hidden md:block md:w-[25%] h-[193px] md:h-[284px] ">
              <img
                src="/home/p4.png"
                alt="Community 1"
                className="object-cover rounded-[18px]  w-[100%] h-[100%]"
              />
              <p className="absolute bottom-4 left-4 text-white font-bold">
                DUMMY TEXT
              </p>
            </div>
          </div>
          {/* Second Row */}

          <div className=" w-[100%] flex gap-[10px] justify-center">
            <div className="relative md:w-[25%] flex gap-[5px]">
              <div className="relative w-[192px] md:w-[620px] h-[220px] md:h-[280px] rounded-[18px] overflow-hidden">
                <img
                  src="/home/p5.png"
                  alt="Community 3"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
              </div>
              <p className="absolute bottom-4 left-4 text-white font-bold">
                DUMMY TEXT
              </p>
            </div>

            <div className="relative md:w-[25%] flex gap-[5px]">
              <div className="relative h-[220px] md:w-[620px] md:h-[280px] rounded-[18px] overflow-hidden">
                <img
                  src="/home/p3.png"
                  alt="Community 3"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
              </div>
              <p className="absolute bottom-4 left-4 text-white font-bold">
                DUMMY TEXT
              </p>
            </div>
            <div className="relative  w-[25%] hidden md:flex gap-[5px]">
              <div className="relative w-[620px] rounded-[18px] h-[280px]  overflow-hidden">
                <img
                  src="/home/i1.png"
                  alt="Community 3"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
              </div>
              <p className="absolute bottom-4 left-4 text-white font-bold">
                DUMMY TEXT
              </p>
            </div>

            <div className="relative rounded-[18px] hidden md:flex w-[25%] ">
              <img
                src="/home/p2.png"
                alt="Community 3"
                className="object-cover rounded-[18px]   w-[100%] h-[280px]"
              />
              <p className="absolute bottom-4 left-4 text-white font-bold">
                DUMMY TEXT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View All Areas Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-2 bg-[#8F8F8F] text-white rounded-[6.5px] ">
          View All Areas
        </button>
      </div>
    </div>
  );
};

export default PopularAreas;
