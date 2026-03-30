import { motion } from "framer-motion";

import { adminDashboardRecentDonations } from "../../../../services/apis/AdminDashboardApi";
import { AdminDashboardActivityRowSkeleton } from "../../../../skeltons/AdminDashboardSkeltons";
import { useQuery } from "@tanstack/react-query";
import type { UserDonationType } from "../../../../interfaces/interfaces";

export default function AdminRecentDonations() {

  const {data,isLoading}=useQuery({
    queryKey:['adminDashboardRecentDonations'],
    queryFn:adminDashboardRecentDonations,
     staleTime:1000*60*10
  })




  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Recent Donations
        </h3>

        <button className="text-sm text-emerald-500 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">

        {isLoading?Array.from({length:3}).map((_,_1)=>(
                      <AdminDashboardActivityRowSkeleton/>
      )) :data?.content?.map((item:UserDonationType, index:number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 6 }}
            className="
            flex justify-between items-center
            border-b border-gray-200 dark:border-gray-700
            pb-4 last:border-none
            "
          >

            {/* Left side */}
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className=" b flex items-center justify-center text-white text-sm font-semibold">
                <img className="w-6 h-6 rounded-full" src={import.meta.env.VITE_KINDRAISE_API_URL+`/user/profile/image/${item.user_id}`} alt="" />
              </div>

              {/* User Info */}
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {item.fullName}
                </p>

                <p className="text-xs text-gray-500">
                  {item.title}
                </p>
              </div>

            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">

              {/* Amount */}
              <span className="text-emerald-600 font-semibold text-sm">
               ₹ {item?.amount?.toLocaleString("en-IN")}
              </span>

              {/* View button */}
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="
                flex items-center gap-1
                text-xs px-3 py-1.5
                bg-emerald-500 text-white
                rounded-lg
                hover:bg-emerald-600
                transition
                "
              >
                <Eye size={14} />
                View
              </motion.button> */}

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}