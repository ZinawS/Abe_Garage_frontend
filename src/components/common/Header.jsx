import React from "react";
import { motion } from "framer-motion";
import abeLogo from "../../assets/images/AbeLogo.png"; // Adjust the path as necessary


const Header = () => {
  return (
    <header className="bg-blue-900 text-white p-4 flex flex-col md:flex-row justify-between items-center shadow-lg">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center mb-4 md:mb-0"
      >
        <img
          src={abeLogo}
          alt="ABE Garage Logo"
          className="h-12"
            style={{ filter: "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))",height: "100px", width: "auto", objectFit: "contain",borderRadius: "50px" }}
        />
        <span className="ml-3 text-red-400 font-medium hidden sm:inline">
          Enjoy the ride while we fix your car
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6"
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Mon-Sat: 7:00AM - 6:00PM</span>
        </div>
        <a
          href="tel:18004567890"
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Call Us: 1800 456 7890
        </a>
      </motion.div>
    </header>
  );
};

export default Header;
