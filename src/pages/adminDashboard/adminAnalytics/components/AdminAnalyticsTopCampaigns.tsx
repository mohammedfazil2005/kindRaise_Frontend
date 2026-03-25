import { useQuery } from "@tanstack/react-query";
import { adminDashboardAnalyticsTopRaisedCampaigns } from "../../../../services/apis/AdminDashboardApi";
import { DonationTableSkeleton } from "../../../../skeltons/CampaignSkeltons";
import type { CampaignInterface } from "../../../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";



const AdminAnalyticsTopCampaigns = () => {
        const {data,isLoading}=useQuery({
        queryKey:["AdminAnalyticsTopCampaigns"],
        queryFn:adminDashboardAnalyticsTopRaisedCampaigns
    })

    const navigate=useNavigate()


    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mt-8">
            {/* <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"> */}
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Top Campaigns
            </h2>

            <div className="space-y-3">
                {isLoading?<DonationTableSkeleton rows={3}/>:data.map((campaign:CampaignInterface, index:number) => (
                    <div
                        key={index}
                        className="flex justify-between text-sm border-b pb-2 border-gray-200 dark:border-gray-700"
                    >
                        <span onClick={()=>navigate(`/admin/campaigns/viewcampaign/${campaign.id}`)} className="text-gray-600 cursor-pointer dark:text-gray-300 hover:underline dark:hover:text-emerald-500">
                            {campaign.title}
                        </span>

                       <div className="flex items-center justify-between gap-2">

                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                        ₹{campaign.amount.toLocaleString("en-IN")}
                    </span>

                    <span className="text-gray-400 text-xs">
                        of ₹{campaign.goalAmount.toLocaleString("en-IN")}
                    </span>

                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminAnalyticsTopCampaigns;