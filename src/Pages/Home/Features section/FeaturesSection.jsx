import React from "react";

// Example images
import trackingImg from "../../../assets/live-tracking.png";
import safeImg from "../../../assets/safe-delivery.png";
import supportImg from "../../../assets/safe-delivery.png";

const featuresData = [
  {
    title: "Live Parcel Tracking",
    description: "Track your parcels in real-time with live updates from pick-up to delivery.",
    image: trackingImg,
  },
  {
    title: "100% Safe Delivery",
    description: "We ensure every package reaches safely with proper handling and insurance.",
    image: safeImg,
  },
  {
    title: "24x7 Call Support",
    description: "Our support team is available around the clock to help with your queries.",
    image: supportImg,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-5 bg-gray-50">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm p-4 bg-white rounded-lg"
          >
            {/* Left Image */}
            <div className="flex-shrink-0">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* Vertical Dotted Line */}
            <div className="hidden md:flex flex-col justify-center items-center">
              <div className="w-px h-24 border-l-2 border-dotted border-gray-300"></div>
            </div>

            {/* Right Content */}
            <div className="md:pl-6 text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
