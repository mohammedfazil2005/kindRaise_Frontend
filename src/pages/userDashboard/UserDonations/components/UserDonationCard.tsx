import React from "react";
import { motion } from "framer-motion";

const donations = [
  {
    image:
      "https://img.freepik.com/free-photo/explaining-project-points_1098-15436.jpg?semt=ais_rp_50_assets&w=740&q=80",
    title: "Help Rural Schools",
    description: "Providing educational resources for rural children.",
    amount: "₹2,000",
    goal: "₹60,000",
    raised: "₹45,230",
    daysLeft: "12 Days Left",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=500",
    title: "Medical Aid for Children",
    description: "Helping children receive critical medical treatment.",
    amount: "₹5,000",
    goal: "₹80,000",
    raised: "₹50,400",
    daysLeft: "8 Days Left",
  },
];

const UserDonationCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Grid Layout */}
      <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

        {donations.map((donation, index) => (

          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="relative w-full overflow-hidden rounded-3xl bg-black"
          >

            {/* Image */}
            <div className="relative h-[220px] w-full overflow-hidden">

              <motion.img
                src={donation.image}
                alt={donation.title}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            </div>

            {/* Content */}
            <div className="bg-gradient-to-b from-black/80 to-black px-4 py-4 space-y-2">

              <h2 className="text-base font-semibold text-white">
                {donation.title}
              </h2>

              <p className="text-xs text-gray-300">
                {donation.description}
              </p>

              {/* Donation Amount */}
              <p className="text-xs text-gray-400">
                You donated
                <span className="text-emerald-400 font-semibold ml-1">
                  {donation.amount}
                </span>
              </p>

              {/* Progress */}
              <div className="mt-2 space-y-1">

                <p className="text-emerald-400 text-xs font-semibold">
                  {donation.raised} raised
                </p>

                <div className="w-full bg-gray-700/60 h-1.5 rounded-full">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-[75%]" />
                </div>

                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Goal: {donation.goal}</span>
                  <span>{donation.daysLeft}</span>
                </div>

              </div>

              {/* Button */}
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                View Campaign
              </motion.button>

            </div>

          </motion.div>

        ))}

      </div>
    </motion.div>
  );
};

export default UserDonationCard;