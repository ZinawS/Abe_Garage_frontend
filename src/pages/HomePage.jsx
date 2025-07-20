import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ServiceCard from "../components/common/ServiceCard";
import mechanicImage from "../assets/images/mechanic.png";
import { FaCheck, FaPhone, FaCalendarAlt } from "react-icons/fa";

const LandingPage = () => {
  const services = [
    {
      title: "Performance Upgrade",
      description: "Enhance your vehicle's performance with our expert tuning.",
      icon: "🚀",
    },
    {
      title: "Transmission Services",
      description: "Expert transmission repair and maintenance services.",
      icon: "⚙️",
    },
    {
      title: "Brake Repair & Service",
      description: "Premium brake services to ensure your safety on the road.",
      icon: "🛑",
    },
    {
      title: "Engine Service & Repair",
      description: "Comprehensive engine diagnostics and repair solutions.",
      icon: "🔧",
    },
    {
      title: "Tyre & Wheels",
      description: "Quality tire and wheel services for optimal performance.",
      icon: "🛞",
    },
    {
      title: "Denting & Painting",
      description: "Professional dent removal and paint restoration.",
      icon: "🎨",
    },
  ];

  const whyChooseUs = [
    "Certified Expert Mechanics",
    "Fast and Quality Service",
    "Best Prices in Town",
    "Awarded Workshop",
    "24/7 Roadside Assistance",
    "5-Year Warranty on Repairs",
  ];

  const additionalServices = [
    "General Auto Repair & Maintenance",
    "Transmission Repair & Replacement",
    "Tyre State Inspections",
    "Brake Job/Brake Services",
    "Electrical Diagnostics",
    "Steering and Charging Repair",
    "Wheel Alignment",
    "Computer Diagnostic Testing",
    "AC Repair & Service",
    "Exhaust System Repair",
    "Suspension Services",
    "Oil Change & Fluid Services",
  ];

  const stats = [
    { value: "15+", label: "Years Experience", icon: "🏆" },
    { value: "10K+", label: "Happy Customers", icon: "😊" },
    { value: "98%", label: "Customer Satisfaction", icon: "⭐" },
    { value: "24/7", label: "Roadside Assistance", icon: "🛟" },
  ];

  return (
    <div className="font-sans bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Car service background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Premium <span className="text-red-500">Auto Care</span> Services
            </h1>
            <p className="text-xl mb-8">
              Experience top-notch vehicle maintenance with our certified
              mechanics and state-of-the-art facilities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/book-service">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <FaCalendarAlt />
                  Book Appointment
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
                >
                  Our Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">
                Ready to book your service?
              </h2>
              <p>Fast, easy online booking available 24/7</p>
            </div>
            <Link to="/book-service">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center gap-2"
              >
                <FaCalendarAlt />
                Book Now
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50" id="services">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Our Premium Services
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive automotive services to keep your vehicle
              running at its best. Our certified technicians use the latest
              technology to diagnose and repair your vehicle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <img
                src={mechanicImage}
                alt="Mechanic working"
                className="rounded-lg shadow-xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                Why Choose Our Auto Service
              </h2>
              <div className="w-20 h-1 bg-red-500 mb-6"></div>
              <p className="text-gray-600 mb-8">
                We are committed to providing the highest quality auto repair
                services at competitive prices. Our team of ASE-certified
                technicians has the knowledge and experience to handle all your
                automotive needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-4">
                      <FaCheck className="text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
                  >
                    Learn More About Us
                  </motion.button>
                </Link>
                <a href="tel:18004567890">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold"
                  >
                    <FaPhone />
                    Call Us Now
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Auto Services
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto opacity-90">
              We offer a full range of automotive repair and maintenance
              services to meet all your vehicle's needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="bg-red-500 p-2 rounded-full mr-4">
                    <FaCheck className="text-white" />
                  </div>
                  <h3 className="font-semibold">{service}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-blue-900 rounded-xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Premium Auto Care?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Schedule your appointment today and let our experts take care of
              your vehicle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/book-service">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <FaCalendarAlt />
                  Book Online
                </motion.button>
              </Link>
              <a href="tel:18004567890">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <FaPhone />
                  Call Now
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
