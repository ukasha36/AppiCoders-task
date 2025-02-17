import { LiaBathSolid } from "react-icons/lia";
import { IoHeartOutline } from "react-icons/io5";

const TopProjectSection = () => {
  return (
    <div className="container mx-auto flex flex-col items-center py-10 ">
      <h2 className="text-center text-[#616161] text-[48px] font-semibold mb-8">
        Top Projects in Dubai Now
      </h2>

      <div className=" flex flex-col-reverse w-[90%] md:flex-row flex-wrap justify-center gap-8 items-center">
        {/* Information Card */}
        <div className="bg-white shadow-lg rounded-[20px] px-8 pb-4 pt-0 ">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-[#222222] mt-[10px] text-white text-xs font-bold px-3 py-1 rounded-[5px] ">
              FEATURED
            </span>
            <div className="text-white bg-[#222222] py-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-[22px] font-semibold mb-2 ">
            Luxury Villa With Pool
          </h3>
          <div className="flex w-[100%] justify-between  ">
            <div className="flex flex-col w-[100%] ">
              <p className="text-[#8F8F8F] text-[14px] font-bold  ">
                Start From
              </p>
              <p className="text-[#222222] text-[20px] font-bold mb-6 ">
                $63,000.00
              </p>
            </div>
            {/* <div className=" border border-[#8F8F8F] p-[3px] h-[30px]  ">
              <IoHeartOutline className=" text-[25px] text-[#8F8F8F]   " />
            </div> */}
          </div>

          <p className="text-[#222222] font-medium text-[16px]  mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusm{" "}
            <br />
            tempor incididunt labore.
          </p>

          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2 pr-[10px] border-r border-[#8F8F8F]">
              <img
                src="/bed.png"
                alt="bed icon"
                className="w-[8px] h-[15.9px]  md:w-[12px] "
              />
              <span className="text-[#8F8F8F] text-[13px] font-bold">
                4 Beds
              </span>
            </div>

            <div className="flex items-center gap-2 pr-[10px] border-r border-[#8F8F8F]">
              <LiaBathSolid className="text-[20px] text-[#8F8F8F]  font-semibold " />
              <span className=" text-[#8F8F8F] text-[13px] font-bold ">
                {" "}
                2 Baths{" "}
              </span>
            </div>

            <div className="flex items-center  gap-2">
              <img
                src="/feet.png"
                alt="sqft icon"
                className="w-[8px] h-[15.9px] md:w-[12px] "
              />
              <span className="text-[#8F8F8F] text-[13px] font-bold">
                600 Sq ft
              </span>
            </div>
          </div>

          <div className="   md:my-[20px]">
            <button className="w-[150px]  h-[40px] text-[16px] px-4 py-1 bg-[#222222] text-white rounded-[8px]">
              See All Property
            </button>
          </div>
        </div>

        {/* Project Image */}
        <div className="flex items-start h-full ">
          <img
            src="/p2.png"
            alt="Luxury Villa"
            className="w-full h-[90%] rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TopProjectSection;
