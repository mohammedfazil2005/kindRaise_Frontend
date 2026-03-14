import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchUserDonations } from "../../../../services/apis/Donation";
import { useContext, useEffect } from "react";
import type { UserDonationType } from "../../../../interfaces/interfaces";
import { DonationCardSkeleton } from "../../../../skeltons/DonationSkeltons";
import { CampaignContext } from "../../../../contexts/CampainContext";

const donationss = [
  {
    id: 1,
    image:
      "https://img.freepik.com/free-photo/explaining-project-points_1098-15436.jpg?semt=ais_rp_50_assets&w=740&q=80",
    title: "Help Rural Schools",
    description: "Providing educational resources for rural children.",
    amount: "₹2,000",
    goal: 60000,
    raised: 45230,
    daysLeft: "12 Days Left",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=500",
    title: "Medical Aid for Children",
    description: "Helping children receive critical medical treatment.",
    amount: "₹5,000",
    goal: 80000,
    raised: 50400,
    daysLeft: "8 Days Left",
  },
];

const UserDonationCard = () => {

  const {paymentAdded}=useContext(CampaignContext)!


   const {data:donations,isLoading}=useQuery({
    queryKey:['donation',paymentAdded],
    queryFn:fetchUserDonations
   })

   

   useEffect(()=>{
    console.log(donations)
   },[donations])


  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {isLoading?<DonationCardSkeleton/>:donations.map((donation:UserDonationType, index:number) => {

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
          >

            {/* Campaign Image */}
            <img
              src={import.meta.env.VITE_KINDRAISE_API_URL+`/campaign/image/campaign/${donation.campaign_id}`}
              alt={donation.title}
              className="w-full h-[180px] object-cover"
            />

            {/* Card Content */}
            <div className="p-4 space-y-2">

              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {donation.title}
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {donation.description}
              </p>

              {/* Donation */}
              <p className="text-xs font-medium text-indigo-500">
                You donated: ₹{donation.amount.toLocaleString("en-IN")}
              </p>

              {/* Raised */}
              <p className="text-xs text-gray-600 dark:text-gray-400">
                ₹{donation.totalAmount.toLocaleString("en-IN")} raised of ₹
                {donation.goalAmount.toLocaleString("en-IN")}
              </p>

              {/* Progress */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full">
                <div
                  style={{ width: `${(donation.amount / donation.goalAmount) * 100}%` }}
                  className="bg-emerald-500 h-1.5 rounded-full"
                />
              </div>

              <div className="flex items-center justify-between mt-2">

                <span className="text-[11px] text-gray-400">
                  {/* {donation.daysLeft} */}
                </span>

                {/* View Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600"
                >
                  View Campaign
                </motion.button>

              </div>

            </div>

          </motion.div>
        );
      })}

    </div>
  );
};

export default UserDonationCard;