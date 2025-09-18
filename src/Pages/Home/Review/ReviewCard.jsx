import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review, isActive }) => {
  const base =
    "rounded-2xl bg-white p-6 md:p-8 shadow-md flex flex-col justify-between";
  const transition = "transition-transform transition-opacity duration-500 ease-in-out";
  const classes = isActive
    ? "opacity-100 scale-100"
    : "opacity-50 scale-95";

  return (
    <div className={`${base} ${classes} ${transition} w-full md:max-w-md`}>
      <div>
        <span className="inline-flex items-center justify-center rounded-full bg-gray-100 p-3">
          <FaQuoteLeft className="text-xl text-gray-500" />
        </span>
        <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
          {review.text}
        </p>
      </div>
      <div className="mt-6 border-t border-dotted border-gray-300 pt-4 flex items-center gap-4">
        <img
          src={review.image}
          alt={review.name}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-semibold text-gray-800">
            {review.name}
          </div>
          <div className="text-xs text-gray-500">{review.title}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard
