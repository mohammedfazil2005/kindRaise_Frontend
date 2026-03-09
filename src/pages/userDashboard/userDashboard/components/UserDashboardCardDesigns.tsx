import { motion } from "framer-motion";
import React from "react";

const luxuryProperties = [
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=600&fit=crop",
    title: "Santorini Villa",
    description:
      "Luxury villa overlooking the Aegean Sea, offering breathtaking sunset views.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=600&fit=crop",
    title: "Alpine Retreat",
    description:
      "Exclusive mountain villa with panoramic views of the Swiss Alps.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=600&fit=crop",
    title: "Tropical Paradise",
    description:
      "Beachfront resort with crystal-clear waters and white sand beaches.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=600&fit=crop",
    title: "Ocean Escape",
    description:
      "Relaxing beachfront property with luxury suites.",
  },
];

const UserDashboardCardDesigns = () => {
  return (
    <div className="mt-10 space-y-6">

      {/* Section Header */}
      <div className="flex items-center justify-between">

        {/* Left Title */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            My Supported Campaigns
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Campaigns you have contributed to
          </p>
        </div>

        {/* Right Button */}
      <motion.button
  initial={{ opacity: 0.9 }}
  whileHover={{ opacity: 1 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.3 }}
  className="px-4 py-2 text-sm font-medium rounded-lg
  bg-emerald-500 text-white
  hover:bg-emerald-600"
>
  View My Donations
</motion.button>

      </div>

      {/* Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >

        {luxuryProperties.map((property, index) => (

          <motion.div
                  key={index}
                  className="relative w-full overflow-hidden rounded-3xl bg-black"
                >

                

                  <div className="relative h-[220px] w-full overflow-hidden">

                    <motion.img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Top Buttons */}

                  

                  </div>

                  {/* Share Menu */}

                 

                  {/* Content */}

                  <div className="bg-gradient-to-b from-black/80 to-black px-3 py-3 space-y-1">

                    <h2 className="text-base font-semibold text-white">
                      {property.title}
                    </h2>

                    <p className="text-xs text-gray-300">
                      {property.description}
                    </p>

                    {/* Progress */}

                    <div className="mt-2 space-y-1">

                      <p className="text-emerald-400 text-xs font-semibold">
                        ₹45,230 raised
                      </p>

                      <div className="w-full bg-gray-700/60 h-1.5 rounded-full">

                        <div className="bg-emerald-500 h-1.5 rounded-full w-[75%]" />

                      </div>

                      <div className="flex justify-between text-[10px] text-gray-400">

                        <span>Goal: ₹60,000</span>

                        <span>12 Days Left</span>

                      </div>

                    </div>

                    {/* Button */}

                    <motion.button
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -3, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-3 w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600"
                    >
                      View Campaign
                    </motion.button>

                  </div>

                </motion.div>

        ))}

      </motion.div>

    </div>
  );
};

export default UserDashboardCardDesigns;