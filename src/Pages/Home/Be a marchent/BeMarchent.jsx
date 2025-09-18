import React from 'react';
import img from '../../../assets/location-merchant.png';

const BeMarchent = () => {
  return (
    <div className="bg-[#03373d] bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat rounded-3xl p-6 sm:p-10 lg:p-20">
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center lg:items-center gap-8 lg:gap-16">
        {/* Image */}
        <img
          src={img}
          alt="Merchant Satisfaction"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg object-contain"
        />

        {/* Text Content */}
        <div className="text-center lg:text-left text-white max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-4 sm:py-6 text-sm sm:text-base md:text-lg">
            We offer the lowest delivery charge with the highest value along with
            100% safety of your product. Pathao courier delivers your parcels in
            every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="btn text-black rounded-full bg-[#caeb66] hover:bg-[#b5d95b] transition-colors duration-300">
              Become a Merchant
            </button>
            <button className="btn btn-outline rounded-full  border-white hover:bg-white hover:text-[#03373d] transition-colors duration-300 text-[#b5d95b]">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMarchent;
