import { TfiEmail } from "react-icons/tfi";
import { LuPhoneCall } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

const ContactSection = () => {
  return (
    <div className="container  py-10">
      <div className="flex flex-col md:flex-row w-[100%] items-center">
        {/* Left Column: Image with Contact Box */}
        <div className="relative w-[100%] h-[28rem] md:h-full flex justify-center md:justify-start md:w-[60%] ">
          <img
            src="/j.png"
            alt="Real Estate View"
            className="  w-[90%] h-[253px]  md:w-[600px] md:h-[350px] rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[0px]  md:rounded-tr-[100px] md:rounded-br-[100px] object-cover "
          />

          {/* Contact Us Overlay */}
          <div className="absolute md:pb-4 top-[160px] md:top-12 md:right-1 bg-[#222222] h-[240px]  w-[270px] md:h-[250px] md:w-[270px] text-white p-6 rounded-[20px]  ">
            <h3 className="md:text-[26px] font-semibold mb-1">CONTACT US</h3>
            <p className="text-sm  md:text-[17px] mb-4 ">
              Next Level Real Estate
            </p>

            <div className=" flex flex-col gap-[5px] ">
              <p className="text-sm mb-2 flex  items-center gap-[15px] ">
                <span className="font-bold ">
                  <TfiEmail />
                </span>
                info@nextlevelrealestate.ae
              </p>
              <p className="text-sm mb-2 flex  items-center gap-[15px] ">
                <span>
                  <LuPhoneCall />
                </span>
                +971 55 918 8970
              </p>
              <p className="text-sm mb-2 flex  items-start gap-[15px] ">
                <span>
                  <FaLocationDot />
                </span>
                905, Opal Tower Burj Khalifa <br /> Boulevard – Business Bay -
                Dubai
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Consultation Form */}
        <div className=" md:ml-[40px] md:w-[30%] flex flex-col items-center md:items-start ">
          <h2 className=" md:text-[40px] text-[25px] md:w-[50%] md:leading-[40px] text-[#919090]   md:mb-4">
            Get A Free Consultation
          </h2>
          <p className="text-[#555555] text-center  md:text-left text-[22px] md:text-[26px] mb-4">
            I am interested to! <br />{" "}
            <span className="text-[18px] "> Multiple Choice</span>
          </p>

          {/* Options: Buy, Rent, Sale */}
          <div className="flex gap-4 mb-6">
            <button className="flex flex-col items-center w-[89px] h-[89px]   bg-[#222222]  p-4 rounded-lg">
              <div className="flex flex-col gap-[10px] ">
                <div className="text-2xl text-white ">
                  <FaHome />
                </div>
                <input type="radio" name="" id="" />
              </div>

              <p className="mt-2 font-semibold">Buy</p>
            </button>
            <button className="flex flex-col items-center w-[89px] bg-[#222222] h-[89px]  p-4 rounded-lg">
              <div className="flex flex-col gap-[10px] ">
                <div className="text-2xl text-white ">
                  <FaHome />
                </div>
                <input type="radio" name="" id="" />
              </div>

              <p className="mt-2 font-semibold">Sale</p>
            </button>
            <button className="flex flex-col items-center w-[89px] h-[89px]  bg-[#222222]  p-4 rounded-lg">
              <div className="flex flex-col gap-[10px] ">
                <div className="text-2xl text-white ">
                  <FaHome />
                </div>
                <input type="radio" name="" id="" />
              </div>

              <p className="mt-2 font-semibold">Rent</p>
            </button>
          </div>

          {/* Next Button */}
          <button className="bg-[#8F8F8F] text-white py-2 px-6 rounded-[8px] ">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
