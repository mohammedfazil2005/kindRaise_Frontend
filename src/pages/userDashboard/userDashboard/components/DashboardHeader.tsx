
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  FolderHeart,

  IndianRupee,
} from "lucide-react";
import { useEffect } from "react";
import { userDashboardStats } from "../../../../services/apis/UserDashboardApi";
import { UserDashboardStatsSkeleton } from "../../../../skeltons/CampaignSkeltons";
import moment from "moment";

const DashboardHeader = () => {
 

  const {data,isLoading}=useQuery({
    queryKey:["dashboardStats"],
    queryFn:userDashboardStats,
    staleTime:1000*60*10
  })

  useEffect(()=>{
    console.log(data)
  },[data])


  return (
    <>
    {isLoading?<UserDashboardStatsSkeleton/>:
    <div className="p-3 mt-5 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Your Donation Impact
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track your contributions and the difference you are making.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.10 * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300"  >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-transparent via-white/10 to-transparent" />
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-md`}
                >
                  <HeartHandshake size={22} />
                </div>

              </div>

              <h3 className="text-sm text-gray-500 dark:text-gray-400">
               Total Donations
              </h3>

              <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
                {data?.totalDonations.toLocaleString("en-IN")}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                  Times you contributed
              </p>
            </motion.div>

             <motion.div
     
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.13 * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300"  >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-transparent via-white/10 to-transparent" />
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md`}
                >
                  <IndianRupee size={22} />
                </div>

              </div>

              <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Last Donation
              </h3>

              <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
               {data?.latestDonation ? `₹${data?.latestDonation?.amount?.toLocaleString("en-IN")}` : "No donations yet"}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                 {data?.latestDonation ? `Donated on ${moment(data?.latestDonation?.donationDate).fromNow()}` : "No donations yet"}
              </p>
             {data?.latestDonation?.title&&(
               <p className="text-xs text-gray-500 font-medium mt-1 truncate">
              {data?.latestDonation?.title}
              </p>
             )}
            </motion.div>

             <motion.div
             
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300"  >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-transparent via-white/10 to-transparent" />
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-md`}
                >
                  <FolderHeart size={22} />
                </div>

              </div>

              <h3 className="text-sm text-gray-500 dark:text-gray-400">
               Active Campaigns
              </h3>

              <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
                {data?.activeCampaigns.toLocaleString("en-IN")}
              </p>

              <p className="text-xs text-gray-400 mt-2">
              Campaigns you created that are live
              </p>
            </motion.div>
      </div>

    </div>
    }
    </>
  )
}

export default DashboardHeader
