import React, { useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import img1  from '../../../assets/customer-top.png'
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    id: 1,
    text:
      "Profast Courier made my life easy — realtime tracking and on-time delivery every single time. Highly recommended!",
    name: "Shakib Ahmed",
    title: "Founder, ShopBangla",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    text:
      "Their team is responsive and the packaging is secure. Our returns process became painless after switching to them.",
    name: "Ayesha Khan",
    title: "Ecommerce Manager, StyleMart",
    image:
      "https://images.unsplash.com/photo-1545996124-1f6b1f2e2c5f?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    text:
      "Excellent customer support 24/7 and consistent delivery times. Our customers love the live tracking feature.",
    name: "Rafi Uddin",
    title: "Operations Head, QuickBuy",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    text:
      "Reliable and affordable. The merchant onboarding was smooth and intuitive. Great partner for our logistics.",
    name: "Mina Chowdhury",
    title: "COO, UrbanCart",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&q=80&auto=format&fit=crop",
  },
];


const ReviewSection = () => {
  const [active, setActive] = useState(0);
  const len = reviews.length;

  const prevIndex = (active - 1 + len) % len;
  const nextIndex = (active + 1) % len;

  const goPrev = () => setActive((prev) => (prev - 1 + len) % len);
  const goNext = () => setActive((prev) => (prev + 1) % len);

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <img
          src={img1}
          alt="customers"
          className="mx-auto rounded-xl "
        />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-8">
          What our customers are saying
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Feedback from merchants and customers who use our delivery and logistics services.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto mt-14">
        <div className="flex items-center justify-center gap-6">
          {/* Left Card */}
          <div className="hidden sm:block flex-1 flex justify-end">
            <ReviewCard review={reviews[prevIndex]} isActive={false} />
          </div>

          {/* Center Card with Framer Motion */}
          <div className="flex-1 flex -translate-y-7  justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                <ReviewCard review={reviews[active]} isActive={true} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Card */}
          <div className="hidden sm:block flex-1">
            <ReviewCard review={reviews[nextIndex]} isActive={false} />
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            aria-label="Previous review"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#caeb66]"
          >
            <FaChevronLeft />
          </button>

          {/* Dots */}
          <div className="hidden sm:flex items-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 w-8 rounded-full ${
                  i === active ? "bg-[#03373d]" : "bg-gray-300"
                } transition-all duration-300`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next review"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#caeb66]"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
