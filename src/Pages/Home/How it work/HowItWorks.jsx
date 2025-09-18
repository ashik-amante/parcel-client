import React from "react";
import { FaMapMarkerAlt, FaTruck, FaMoneyBillAlt, FaBox } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaMapMarkerAlt className="text-4xl text-[#caeb66]" />,
    title: "Booking",
    description: "Easily book your shipment online or via our app in just a few clicks.",
  },
  {
    id: 2,
    icon: <FaTruck className="text-4xl text-[#caeb66]" />,
    title: "Pick & Drop",
    description: "Our courier will pick up and deliver your package safely and on time.",
  },
  {
    id: 3,
    icon: <FaMoneyBillAlt className="text-4xl text-[#caeb66]" />,
    title: "Cash on Delivery",
    description: "Receive cash on delivery anywhere in Bangladesh with full security.",
  },
  {
    id: 4,
    icon: <FaBox className="text-4xl text-[#caeb66]" />,
    title: "Parcel Tracking",
    description: "Track your parcel in real-time from pick-up to delivery.",
  },
];

const HowItWorksBox = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      {/* Heading */}
      <div className="max-w-3xl mx-auto mb-12 text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works ?</h2>
        
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
          >
            {step.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksBox;
