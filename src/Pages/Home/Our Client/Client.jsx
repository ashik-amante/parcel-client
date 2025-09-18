import React from "react";
import Marquee from "react-fast-marquee";

// Replace these with your actual logo paths or imports
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

const logos = [logo1, logo2, logo3, logo4, logo5,logo6,logo7];

const Client = () => {
  return (
    <section className="py-12 bg-gray-50">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          We have developed thousands of sales team
        </h2>
        <p className="text-gray-600 mt-2">
          These companies trust our service for their delivery and logistics.
        </p>
      </div>

      {/* Scrolling Logos */}
      <Marquee
        direction="right" // scrolling right to left by default, "right" reverses direction
        speed={50}
        gradient={false}
        pauseOnHover={true}
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-8 flex items-center justify-center">
            <img
              src={logo}
              alt={`Company ${index + 1}`}
              className=" w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Client;
