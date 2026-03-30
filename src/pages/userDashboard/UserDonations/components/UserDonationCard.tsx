import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchUserDonations } from "../../../../services/apis/Donation";
import { useContext, useEffect, useState } from "react";
import type { UserDonationType } from "../../../../interfaces/interfaces";
import { DonationCardSkeleton } from "../../../../skeltons/DonationSkeltons";
import { CampaignContext } from "../../../../contexts/CampainContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ArrowRight } from "lucide-react";



const UserDonationCard = () => {


  const {paymentAdded}=useContext(CampaignContext)!

  const navigate=useNavigate()

  const [page,setPage]=useState(0)


   const {data:donations,isLoading}=useQuery({
    queryKey:['donation',paymentAdded],
    queryFn:()=>fetchUserDonations(page),
    staleTime:1000*60*10
   })

   

   useEffect(()=>{
    console.log(donations)
   },[donations])


  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {isLoading?(<DonationCardSkeleton/>):donations?.content?.length==0?(

          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">

            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              No Donations Yet
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              You haven't supported any campaigns yet. Start making an impact today.
            </p>

            <button
              onClick={() => navigate("/user/explore/campaigns")}
              className="mt-5 px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition"
            >
              Donate Now
            </button>

          </div>
      ):donations?.content?.map((donation:UserDonationType, index:number) => {

        return (
       <motion.div
       key={index}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
 
  transition={{ delay: index * 0.08 }}
  className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
>

  {/* Background Image */}
  <img
    src={
      import.meta.env.VITE_KINDRAISE_API_URL +
      `/campaign/image/campaign/${donation.campaign_id}`
    }
    alt={donation.title}
    className="w-full h-[240px] object-cover group-hover:scale-110 transition duration-500"
  />

  {/* Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/90 to-transparent" />

  {/* Top Section */}
  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">

    {/* Deadline */}
    {donation.deadline && (
      <span className="bg-white/70 backdrop-blur-md text-black text-[11px] px-3 py-1 rounded-full">
        {moment(donation.deadline).diff(moment(), "days")} days left
      </span>
    )}

    {/* Donation Badge */}
    <span className="bg-emerald-500 text-white text-[11px] px-3 py-1 rounded-full shadow">
      ₹{donation?.amount?.toLocaleString('en-IN')}
    </span>
  </div>

  {/* Bottom Content */}
  <div className="absolute bottom-0 p-4 w-full text-white space-y-2">

    {/* Title */}
    <h3 className="text-sm font-semibold line-clamp-1">
      {donation.title}
    </h3>

    {/* Description */}
    <p className="text-xs text-gray-200 line-clamp-2">
      {donation.description}
    </p>

    {/* Progress */}
    <div className="mt-2">
      <div className="flex justify-between text-[11px] text-gray-300 mb-1">
        <span>Raised ₹{donation.totalAmount}</span>
        <span>Goal ₹{donation.goalAmount}</span>
      </div>

      <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
        <div
          style={{
            width: `${Math.min(
              (donation.totalAmount / donation.goalAmount) * 100,
              100
            )}%`,
          }}
          className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
        />
      </div>
    </div>

    {/* Action */}
        <motion.button
          onClick={() =>
            navigate(`/user/donations/viewcampaign/${donation.campaign_id}`)
          }
          whileTap={{ scale: 0.9 }}
          className="w-full flex items-center justify-center mt-3 py-2 rounded-lg dark:bg-white  text-xs font-semibold dark:hover:bg-gray-200 transition
          bg-emerald-600 hover:bg-emerald-500 text-white dark:text-black"
        >
          View Campaign <ArrowRight size={18}/>
        </motion.button>

      </div>
        </motion.div>
            );
          })}
           {donations?.totalPages>1&&(
        
             <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center items-center gap-2 mt-6 mb-4 flex-wrap"
            >
  {/* Prev */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
            Prev
        </motion.button>

  {/* Page Numbers */}
        <div className="flex items-center gap-2">
            {Array.from({ length: donations?.totalPages || 0 }).map((_, i) => (
            <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPage(i)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold border transition-all
                ${
                page === i
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/30"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
                {i + 1}
            </motion.button>
            ))}
        </div>

  {/* Next */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={page + 1 >= donations?.totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
                    bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    Next
                </motion.button>
            </motion.div>
      )}
    </div>
  );
};

export default UserDonationCard;