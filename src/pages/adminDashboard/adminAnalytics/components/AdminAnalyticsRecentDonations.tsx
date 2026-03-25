import { useQuery } from "@tanstack/react-query";
import { adminDashboardAnalyticsRecentDonations } from "../../../../services/apis/AdminDashboardApi";
import { DonationTableSkeleton } from "../../../../skeltons/CampaignSkeltons";
import type { UserDonationType } from "../../../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";


;

const AdminAnalyticsRecentDonations = () => {
      const {data,isLoading}=useQuery({
        queryKey:["AdminAnalyticsRecentDonations"],
        queryFn:adminDashboardAnalyticsRecentDonations
    })
    const navigate=useNavigate();
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mt-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Recent Donations
            </h2>

            <div className="space-y-3">
                {isLoading?<DonationTableSkeleton rows={3}/>:data.map((donation:UserDonationType, index:number) => (
                    <div
                        key={index}
                        className="flex justify-between text-sm border-b pb-2 border-gray-200 dark:border-gray-700"
                    >
                        <span onClick={()=>navigate(`/admin/users/viewuserprofile/${donation.user_id}`)} className="text-gray-600 dark:text-gray-300 dark:hover:text-emerald-500 cursor-pointer hover:underline">
                            {donation?.fullName}
                        </span>

                        <span onClick={()=>navigate(`/admin/campaigns/viewcampaign/${donation.campaign_id}`)}  className="text-gray-500 hover:underline dark:hover:text-emerald-500 cursor-pointer">{donation?.title}</span>

                        <span className="text-emerald-500 font-semibold">
                            ₹{donation.amount.toLocaleString("en-IN")}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminAnalyticsRecentDonations;