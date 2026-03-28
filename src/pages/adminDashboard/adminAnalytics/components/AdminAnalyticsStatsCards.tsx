
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Users, HeartHandshake, IndianRupee, FolderHeart } from "lucide-react";
import { adminDashboardAnalyticsStats } from "../../../../services/apis/AdminDashboardApi";
import { DonationStatsCardSkeleton } from "../../../../skeltons/DonationSkeltons";


const AdminAnalyticsStatsCards = () => {
    const {data,isLoading}=useQuery({
        queryKey:["AdminAnalyticsStatsCards"],
        queryFn:adminDashboardAnalyticsStats,
         staleTime:1000*60*10
    })
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {isLoading?Array.from({length:4}).map((_,_1)=>(
                <DonationStatsCardSkeleton/>
            )):
            <>
                      <motion.div   
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total Donations</p>
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    {data.totalDonations?.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <HeartHandshake className="text-emerald-500" size={26} />
                        </div>
                    </motion.div>

                      <motion.div   
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 * 0.1 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total Amount Raised</p>
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    {data.totalAmountRaised?.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <IndianRupee className="text-emerald-500" size={26} />
                        </div>
                    </motion.div>


                    <motion.div   
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 * 0.1 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total Users</p>
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    {data.totalUsers?.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <Users className="text-emerald-500" size={26} />
                        </div>
                    </motion.div>

                     <motion.div   
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 * 0.1 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total Campaigns</p>
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    {data.totalActiveCampaigns?.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <FolderHeart className="text-emerald-500" size={26} />
                        </div>
                    </motion.div>
                  
                    
            </>     
               
          }
        </div>
    );
};

export default AdminAnalyticsStatsCards;