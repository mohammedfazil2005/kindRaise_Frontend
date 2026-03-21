import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { adminDashboardRecentCampaigns } from "../../../../services/apis/AdminDashboardApi";
import { AdminDashboardActivityRowSkeleton } from "../../../../skeltons/AdminDashboardSkeltons";
import type { CampaignInterface } from "../../../../interfaces/interfaces";


const AdminRecentCampaigns = () => {

  const {data,isLoading}=useQuery({
    queryKey:['adminDashboardRecentCampaigns'],
    queryFn:adminDashboardRecentCampaigns,
     staleTime:1000*60*10
  })


  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">

          <h3 className="font-semibold text-gray-800 dark:text-white mb-5">
            Recent Campaigns
          </h3>

          <div className="space-y-4">

            {isLoading?Array.from({length:3}).map((_,_1)=>(
              <AdminDashboardActivityRowSkeleton/>
            )):data?.map((item:CampaignInterface, index:number) => (

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

                {/* Campaign Info */}
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500">
                    Goal: ₹{item.goalAmount.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">

                  {/* Status */}
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium
                    ${
                      item.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-600 font-light dark:bg-emerald-900/30":
                        item.status=="REJECTED"?"bg-red-100 text-red-600 font-light dark:bg-yellow-900/30"
                        : "bg-yellow-100 text-yellow-600 font-light dark:bg-yellow-900/30"
                    }`}
                  >
                    {item.status}
                  </span>

                  {/* View Button */}
                  <motion.button
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
                  </motion.button>

                </div>

              </motion.div>

            ))}

          </div>

     </div>
  )
}

export default AdminRecentCampaigns
