import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-blue-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href="#"
        className="text-red-500 font-medium flex items-center hover:text-red-600 transition-colors duration-300"
      >
        Learn more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </motion.div>
  );
};

export default ServiceCard;
