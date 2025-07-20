import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/NavBar.jsx";
import Footer from "../components/common/Footer";
// import mechanicTeam from "../assets/images/mechanic-team.png";
import garageInterior from "../assets/images/garage-interior.png";
import founder from "../assets/images/mechanic-team.png";

const AboutPage = () => {
  const milestones = [
    { year: "2008", event: "Founded as a small neighborhood garage" },
    { year: "2012", event: "Expanded to full-service auto care center" },
    { year: "2015", event: "Certified as ASE Blue Seal shop" },
    { year: "2018", event: "Opened second location in downtown" },
    { year: "2021", event: "Launched 24/7 emergency roadside assistance" },
    { year: "2023", event: "Recognized as 'Best Auto Shop' by City Magazine" },
  ];

  const teamMembers = [
    {
      name: "Abe Johnson",
      role: "Founder & Master Technician",
      bio: "With 25+ years in the industry, Abe brings unparalleled expertise to every repair.",
      specialty: "Engine Diagnostics & Performance",
    },
    {
      name: "Maria Gonzalez",
      role: "Service Manager",
      bio: "Maria ensures every customer receives exceptional service from start to finish.",
      specialty: "Customer Relations & Logistics",
    },
    {
      name: "James Wilson",
      role: "Lead Technician",
      bio: "Our electrical systems specialist with 15 years of dealership experience.",
      specialty: "Electrical Systems & Computer Diagnostics",
    },
    {
      name: "Sarah Chen",
      role: "Body Shop Manager",
      bio: "Transforming damaged vehicles back to showroom condition since 2010.",
      specialty: "Collision Repair & Paint",
    },
  ];

  return (
    <div className="font-sans bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img
            src={garageInterior}
            alt="Abe Garage interior"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="text-red-500">Story</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            From humble beginnings to becoming the most trusted name in auto care
          </p>
        </motion.div>
      </section>

      {/* Our Story Section */}
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
                src={founder}
                alt="Abe Johnson, founder"
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
                The Abe Garage Difference
              </h2>
              <div className="w-20 h-1 bg-red-500 mb-6"></div>
              <p className="text-gray-600 mb-6">
                Founded in 2008 by master technician Abe Johnson, what began as
                a one-bay shop has grown into the region's premier auto service
                center through relentless commitment to quality and customer
                satisfaction.
              </p>
              <p className="text-gray-600 mb-6">
                Unlike chain shops, we maintain the personal touch of a
                neighborhood garage while offering the expertise and technology
                of a dealership service center. Our team treats every vehicle as
                if it were our own, because we believe that trust is earned one
                repair at a time.
              </p>
              <p className="text-gray-600 mb-8">
                Today, with two locations and a team of 15 certified technicians,
                we continue Abe's original vision: honest repairs, fair pricing,
                and relationships that last longer than your vehicle.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900 mb-1">
                    15+
                  </div>
                  <div className="text-gray-600">Certified Technicians</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900 mb-1">
                    10,000+
                  </div>
                  <div className="text-gray-600">Satisfied Customers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Our Journey
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 w-1 h-full bg-blue-200 transform -translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center`}
                >
                  <div className="flex-shrink-0 w-24 h-24 rounded-full bg-blue-900 border-4 border-white flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                    {item.year}
                  </div>
                  <div
                    className={`flex-grow ${index % 2 === 0 ? "ml-6 text-left" : "mr-6 text-right"}`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-gray-800">{item.event}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Meet Our Team
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The skilled professionals who make Abe Garage the best choice for
              your auto care needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-blue-900 flex items-center justify-center text-white text-6xl">
                  {member.name.charAt(0)}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-red-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-500">
                      Specialty:
                    </p>
                    <p className="text-blue-900">{member.specialty}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-filter backdrop-blur-sm border border-white border-opacity-20"
            >
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="opacity-90">
                We recommend only what your vehicle truly needs, with honest
                assessments and transparent pricing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-filter backdrop-blur-sm border border-white border-opacity-20"
            >
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-3">Expertise</h3>
              <p className="opacity-90">
                Continuous training and certification ensure we deliver
                dealership-quality work at independent shop prices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-filter backdrop-blur-sm border border-white border-opacity-20"
            >
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="opacity-90">
                We're proud to support local initiatives and treat every customer
                like family - because many have become just that.
              </p>
            </motion.div>
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
              Experience the Abe Garage Difference
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied customers who trust us with their
              vehicles
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="/book-appointment"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg"
              >
                Book Your Appointment
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Contact Our Team
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;