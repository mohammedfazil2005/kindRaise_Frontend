import React from "react";
import { motion } from "framer-motion";
import { Megaphone, IndianRupee, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Campaigns",
    value: "4",
    icon: Megaphone,
    color: "bg-blue-500",
  },
  {
    title: "Total Raised",
    value: "₹1,24,300",
    icon: IndianRupee,
    color: "bg-emerald-500",
  },
  {
    title: "Success Rate",
    value: "75%",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
];

const UserCampaignStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border shadow-sm dark:border-gray-700"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">{item.title}</p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {item.value}
                </h2>
              </div>

              <div className={`${item.color} p-4 rounded-xl text-white`}>
                <Icon size={22} />
              </div>

            </div>

          </motion.div>
        );
      })}

    </div>
  );
};

export default UserCampaignStats;