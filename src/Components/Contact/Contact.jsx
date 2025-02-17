import React from "react";
import { FiSearch, FiPhone } from "react-icons/fi";

const Contact = () => {
  return (
    <section id="contact" className="flex flex-col md:flex-row">
      {/* LEFT SECTION */}
      <div className="md:w-1/2 bg-red-600 text-white p-8 flex flex-col justify-center">
        <h3 className="text-xl uppercase font-bold">LET’S TALK</h3>
        <h2 className="text-3xl font-semibold mt-2">
          Got an idea? Let’s get in touch!
        </h2>
        <p className="mt-4 max-w-md">
          Briefly describe your idea or project here. Provide enough detail to
          let your users know what this contact section is for and why they
          should reach out.
        </p>

        {/* CONTACT FORM */}
        <form className="mt-6 space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none"
          />
          <textarea
            rows={4}
            placeholder="Message"
            className="w-full p-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#333333] to-[#dd1818] text-white py-3 px-6 w-full rounded hover:bg-opacity-90 transition"
          >
            Let’s get in touch
          </button>
        </form>
      </div>

      {/* RIGHT SECTION */}
      <div
        className="md:w-1/2 bg-white   flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/contact-img-1.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* IMAGE */}
        <img
          src="/contact-img.webp"
          alt="Contact"
          className="mb-6 max-w-full h-auto object-cover"
        />

        {/* CONTACT DETAILS */}
        <div className="text-center max-w-sm  py-4 ">
          <p className="text-white mb-4">
            Please submit your inquiry and our App Development Strategist will
            contact you shortly.
          </p>
          <div className="flex  flex-col items-center justify-center mb-2 gap-4 text-white  ">
            <span className="">
              <FiPhone className="mr-2 text-[50px]" />
            </span>
            <span className="text-white font-semibold text-[22px]  ">
              +1 (800) 826-8018
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-white">info@appcoders.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
