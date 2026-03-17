
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Megaphone, IndianRupee, CheckCircle } from "lucide-react";
import { useContext } from "react";
import { CampaignContext } from "../../../../contexts/CampainContext";
import { fetchUserCampaignDashboardStats } from "../../../../services/apis/CampaignApi";
import { DashboardCampaignUserCardSkeleton } from "../../../../skeltons/CampaignSkeltons";


const UserCampaignStats = () => {

   const {campaignCreated}=useContext(CampaignContext)!


  const {data,isLoading}=useQuery({
    queryKey:['usercampaignDashboardStats',campaignCreated],
    queryFn:fetchUserCampaignDashboardStats,
    staleTime:1000*60*10
  })


  return (
    <div className="grid gap-6 md:grid-cols-3">

      {isLoading?<DashboardCampaignUserCardSkeleton/>:
      <>
         <motion.div
  whileHover={{ y: -5 }}
  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border shadow-sm dark:border-gray-700"
>
  <div className="flex items-center justify-between">

    <div>
      <p className="text-sm text-gray-500">Total Campaigns</p>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        {data?.totalCampaigns.toLocaleString("en-IN")}
      </h2>

      <p className="text-xs text-gray-400 mt-1">
        Number of campaigns you have created
      </p>
    </div>

    <div className="bg-blue-500 p-4 rounded-xl text-white">
      <Megaphone size={22} />
    </div>

  </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border shadow-sm dark:border-gray-700"
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">Total Raised</p>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                ₹{data?.totalAmount.toLocaleString("en-IN")}
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Total donations received across campaigns
              </p>
            </div>

            <div className="bg-green-500 p-4 rounded-xl text-white">
              <IndianRupee size={22} />
            </div>

          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border shadow-sm dark:border-gray-700"
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">Active Campaigns</p>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data?.activeCampaigns}
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Campaigns currently accepting donations
              </p>
            </div>

            <div className="bg-emerald-500 p-4 rounded-xl text-white">
              <CheckCircle size={22} />
            </div>

          </div>
        </motion.div>
          </>
      }
       
     

    </div>
  );
};

export default UserCampaignStats;