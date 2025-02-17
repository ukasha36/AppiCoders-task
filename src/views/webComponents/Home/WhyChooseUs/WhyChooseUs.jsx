import React from "react";

const WhyChooseUs = () => {
  const reasons = [
    {
      id: 1,
      icon: "/home/house.png", // Replace this with an actual icon
      title: "Unmatched Digital Presence",
      description:
        "We at Next Level have put a lot of effort into maintaining an unmatched digital presence, which helps us gain real-time market insights and provide unparalleled client service.",
    },
    {
      id: 2,
      icon: "/home/agent.png", // Replace this with an actual icon      title: "Specialized Real Estate Agents",
      title: "Secure Investment",
      description:
        "We at Next Level have put a lot of effort into maintaining an unmatched digital presence, which helps us gain real-time market insights and provide unparalleled client service.",
    },
    {
      id: 3,
      icon: "/home/hand.png", // Replace this with an actual icon
      title: "Secure Investment",
      description:
        "We at Next Level have put a lot of effort into maintaining an unmatched digital presence, which helps us gain real-time market insights and provide unparalleled client service.",
    },
  ];

  return (
    <div className=" flex flex-col items-center w-full py-10">
      {/* Section Heading */}

      <div className="flex md:items-center  w-[70%] md:mb-16 flex-col mb-8 md:flex-row  justify-around  ">
        <h2 className="text-center text-[21px]  md:text-[30px] font-semibold mb-4  ">
          Why You Choose Next-Level Real Estate?
        </h2>
        {/* View All Areas Button */}
        <div className="text-center ">
          <button className="px-6 py-2 bg-[#8F8F8F] text-white rounded-[6.5px] ">
            Inquiry
          </button>
        </div>
      </div>

      {/* Reason Cards */}
      <div className=" flex flex-col md:flex-row  items-center md:justify-center gap-[10px] md:w-[100%] ">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className="flex flex-col md:w-[25%] mb-4 md:pl-[30px] items-center md:items-start text-center md:text-left "
          >
            {/* Icon */}
            <div className="">
              <img src={reason.icon} alt={reason.title} className="w-[70px] " />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#222222] mb-4">
              {reason.title}
            </h3>

            {/* Description */}
            <p className="text-[#222222] font-normal  w-[250px] ">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
