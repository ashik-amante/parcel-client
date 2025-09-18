import React from "react";
import { FaBuilding, FaGlobeAsia, FaMoneyBillWave, FaUndo, FaWarehouse } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";


const servicesData = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaTruckFast className="text-blue-500 text-4xl mb-4" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobeAsia className="text-green-500 text-4xl mb-4" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaWarehouse className="text-yellow-500 text-4xl mb-4" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave className="text-purple-500 text-4xl mb-4" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding className="text-pink-500 text-4xl mb-4" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndo className="text-red-500 text-4xl mb-4" />,
  },
];

const Service = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold  mb-4 text-primary">Our Service</h2>
        <p className="text-gray-600">
          Enjoy fast, reliable parcel delivery with real-time tracking and JiraHustle.
          From personal package to business shipment, we deliver on time, every time.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, index) => (
          <div
            data-aos="zoom-in-right"
            data-aos-duration="3000"
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg p-6 flex flex-col items-center text-center hover:bg-[#caeb66] transition   duration-500 ease-in-out"
          >
            {service.icon}
            <h3 className="text-xl font-semibold  mb-2 text-primary">{service.title}</h3>
            <p className="text-gray-600 text-sm text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
