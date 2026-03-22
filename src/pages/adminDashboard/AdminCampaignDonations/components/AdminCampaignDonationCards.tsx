
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HandHeart, IndianRupee, TrendingUp, Users } from "lucide-react";
import { fetchAdminDonationDashboardStats } from "../../../../services/apis/Donation";
import { useEffect } from "react";
import { DonationStatsCardSkeleton } from "../../../../skeltons/DonationSkeltons";



const AdminCampaignDonationCards = () => {

    const {data,isLoading}=useQuery({
        queryKey:["adminCampaignDonaionDashboard"],
        queryFn:fetchAdminDonationDashboardStats
    })

    useEffect(()=>{
        console.log(data)
    },[data])


    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {isLoading?Array.from({length:4}).map((_,_1)=>(
                <DonationStatsCardSkeleton/>
            )):
            <>
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Total Donations
                                </p>

                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">
                                    {data?.totalDonations?.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <div
                                className={`w-11 h-11 flex items-center justify-center rounded-xl text-white bg-emerald-500`}
                            >
                                <HandHeart size={20} />
                            </div>

                        </div>
                    </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Total Amount Raised
                                </p>

                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">
                                   {data?.totalAmountRaised?.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <div
                                className={`w-11 h-11 flex items-center justify-center rounded-xl text-white bg-blue-500`}
                            >
                                <IndianRupee size={20} />
                            </div>

                        </div>
                    </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Today's Donations
                                </p>

                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">
                                    {data?.todayDonations?.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <div
                                className={`w-11 h-11 flex items-center justify-center rounded-xl text-white bg-purple-500`}
                            >
                                <TrendingUp size={20} />
                            </div>

                        </div>
                    </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Active Donors
                                </p>

                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">
                                     {data?.totalDonors?.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <div
                                className={`w-11 h-11 flex items-center justify-center rounded-xl text-white bg-orange-500`}
                            >
                                <Users size={20} />
                            </div>

                        </div>
                    </motion.div>
            </>

        }

        </div>
    );
};

export default AdminCampaignDonationCards;