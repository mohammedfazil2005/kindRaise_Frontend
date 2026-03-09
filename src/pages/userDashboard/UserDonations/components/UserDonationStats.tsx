import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, TrendingUp, FolderHeart } from "lucide-react";

const stats = [
  {
    title: "Total Donated",
    value: "₹24,300",
    icon: HeartHandshake,
    color: "bg-emerald-500",
  },
  {
    title: "Campaigns Supported",
    value: "8",
    icon: FolderHeart,
    color: "bg-blue-500",
  },
  {
    title: "Impact Score",
    value: "92%",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
];

 
 const UserDonationStats = () => {
   return (
      <div className="grid gap-6 md:grid-cols-3">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
                <motion.div key={index} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className=" relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition ">


                 <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-br from-emerald-500/10 to-transparent" />

                         <div className="relative flex items-center justify-between">
                            <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
            </p>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {item.value}
            </h2>

         
            <p className="text-xs text-emerald-500 mt-1">
                +12% from last month
            </p>

            </div>

          
            <div className={` ${item.color} p-4 rounded-xl text-white shadow-md flex items-center justify-center `} >
            <Icon size={22} />
            </div>

        </div>

        </motion.div>
        );
      })}

    </div>
   )
 }
 
 export default UserDonationStats
 