import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Users, Megaphone, HeartHandshake, IndianRupee } from "lucide-react";
import { adminDashboardCardStats } from "../../../../services/apis/AdminDashboardApi";
;

import { AdminDashboardCardSkeleton } from "../../../../skeltons/AdminDashboardSkeltons";



export default function AdminStatsCards() {

  const {data,isLoading}=useQuery({
    queryKey:['statscardDashboard'],
    queryFn:adminDashboardCardStats,
     staleTime:1000*60*10
  })



  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {isLoading?Array.from({length:4}).map((_,index)=>(
        <AdminDashboardCardSkeleton key={index}/>
      )):
      <>

        <motion.div  initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 * 0.15 }} whileHover={{ y: -8, scale: 1.02 }} className=" group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 ">

              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-transparent via-white/10 to-transparent" />

              {/* Icon */}
              <div className="flex items-center justify-between mb-5">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md`}
                >
                  <Users size={22} />
                </div>

              </div>

              {/* Title */}
              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                Total Users
              </h3>

              {/* Value */}
              <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
              {data?.totalUsers.toLocaleString("en-IN")}
              </p>

              {/* Subtitle */}
              <p className="text-xs text-gray-400 mt-2">
                Active platform users
              </p>

            </motion.div>


           <motion.div  initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 * 0.15 }} whileHover={{ y: -8, scale: 1.02 }} className=" group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 ">

            {/* Hover gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-transparent via-white/10 to-transparent" />

            {/* Icon */}
            <div className="flex items-center justify-between mb-5">

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md`}
              >
                <Megaphone size={22} />
              </div>

            </div>

            {/* Title */}
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
             Total Campaigns
            </h3>

            {/* Value */}
            <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
              {data?.totalActiveCampaign.toLocaleString("en-IN")}
            </p>

            {/* Subtitle */}
            <p className="text-xs text-gray-400 mt-2">
              Live fundraising campaign
            </p>

          </motion.div>



           <motion.div  initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 * 0.15 }} whileHover={{ y: -8, scale: 1.02 }} className=" group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 ">

            {/* Hover gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-transparent via-white/10 to-transparent" />

            {/* Icon */}
            <div className="flex items-center justify-between mb-5">

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md`}
              >
                <HeartHandshake size={22} />
              </div>

            </div>

            {/* Title */}
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
            Total Donations
            </h3>

            {/* Value */}
            <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
            {data?.totalDonations.toLocaleString("en-IN")}
            </p>

            {/* Subtitle */}
            <p className="text-xs text-gray-400 mt-2">
             Contributions received
            </p>

          </motion.div>


          <motion.div  initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 * 0.15 }} whileHover={{ y: -8, scale: 1.02 }} className=" group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 ">

            {/* Hover gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-transparent via-white/10 to-transparent" />

            {/* Icon */}
            <div className="flex items-center justify-between mb-5">

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md`}
              >
                <IndianRupee size={22} />
              </div>

            </div>

            {/* Title */}
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
           Total Raised
            </h3>

            {/* Value */}
            <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
           ₹{data?.totalAmountRaised?.toLocaleString("en-IN")}
            </p>

            {/* Subtitle */}
            <p className="text-xs text-gray-400 mt-2">
             Funds raised so far
            </p>

          </motion.div>
      </>
          

       }

    </div>
  );
}