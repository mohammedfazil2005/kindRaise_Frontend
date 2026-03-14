
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HeartHandshake, TrendingUp, FolderHeart } from "lucide-react";
import { fetchUserDonationDashboardStats } from "../../../../services/apis/Donation";
import { DonationStatsCardSkeleton } from "../../../../skeltons/DonationSkeltons";
import { useContext, useEffect } from "react";
import { CampaignContext } from "../../../../contexts/CampainContext";



const UserDonationStats = () => {

   const {paymentAdded}=useContext(CampaignContext)!
  
    const {data,isLoading}=useQuery({
      queryKey:['statscard',paymentAdded],
      queryFn:fetchUserDonationDashboardStats
    })

    useEffect(()=>{
      console.log(data)
    },[data])


  return (
    <div className="grid gap-6 md:grid-cols-3">

      {isLoading?<DonationStatsCardSkeleton/>:(
        <>
         <motion.div  whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className=" relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition ">


            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-br from-emerald-500/10 to-transparent" />

            <div className="relative flex items-center justify-between">
              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Donated
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                 ₹{data?.totalAmountDonated.toLocaleString("en-IN")}
                </h2>


                {/* <p className="text-xs text-emerald-500 mt-1">
                  +12% from last month
                </p> */}

              </div>


              <div className={`bg-emerald-500 p-4 rounded-xl text-white shadow-md flex items-center justify-center `} >
                <HeartHandshake size={22} />
              </div>

            </div>

          </motion.div>


           <motion.div  whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className=" relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition ">


            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-br from-emerald-500/10 to-transparent" />

            <div className="relative flex items-center justify-between">
              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Campaigns Supported
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                 {data?.totalCampaignsDonated?.toLocaleString("en-IN")}
                </h2>


                {/* <p className="text-xs text-emerald-500 mt-1">
                  +12% from last month
                </p> */}

              </div>


              <div className={`bg-blue-500 p-4 rounded-xl text-white shadow-md flex items-center justify-center `} >
                <FolderHeart size={22} />
              </div>

            </div>

          </motion.div>
          
          <motion.div  whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className=" relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition ">


            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-br from-emerald-500/10 to-transparent" />

            <div className="relative flex items-center justify-between">
              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Impact Score
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                { Math.min( data?.totalAmountDonated / 1000 + data?.totalCampaignsDonated * 5 + data?.totalDonations * 2, 100)} %
                </h2>


                {/* <p className="text-xs text-emerald-500 mt-1">
                  +12% from last month
                </p> */}

              </div>


              <div className={`bg-purple-500 p-4 rounded-xl text-white shadow-md flex items-center justify-center `} >
                <TrendingUp size={22} />
              </div>

            </div>

          </motion.div>

          </>



      )}

       
         
      

    </div>
  )
}

export default UserDonationStats
