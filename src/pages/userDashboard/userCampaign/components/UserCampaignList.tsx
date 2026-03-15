import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Info, } from "lucide-react";
import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CampaignContext } from "../../../../contexts/CampainContext";
import { fetchUserCampaigns } from "../../../../services/apis/CampaignApi";
import type { CampaignInterface } from "../../../../interfaces/interfaces";
import { CampaignCardSkeleton } from "../../../../skeltons/CampaignSkeltons";





const UserCampaignList = () => {
     
      const [showShare, setShowShare] = useState<string | null>(null);
     
      const navigate=useNavigate()
      
      const {campaignCreated}=useContext(CampaignContext)!

      const {data:campaigns,isLoading}=useQuery({
        queryKey:['usercampaigns',campaignCreated],
        queryFn:fetchUserCampaigns
      })

  return (
    <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

      {isLoading?Array(4).fill(0).map((_, i) => <CampaignCardSkeleton key={i} />)
      :
      campaigns?.map((campaign:CampaignInterface, index:number) => (
         <motion.div key={index} whileHover={{ y: -5 }} className="relative w-full overflow-hidden rounded-3xl bg-black">
            <div className="relative h-[220px] w-full overflow-hidden">

              <motion.img  src={import.meta.env.VITE_KINDRAISE_API_URL+`/campaign/image/campaign/${campaign.id}`} alt={campaign.title} className="h-full w-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}
              />
            
            {/* Status Color Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute right-3 top-3" onMouseEnter={() => setShowShare(campaign.id)}
                onMouseLeave={() => setShowShare(null)}>
       
              <button className="backdrop-blur-md rounded-full bg-white/20 p-2 text-black">
                  <Info size={16} />
              </button>

              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{
              opacity: showShare === campaign.id ? 1 : 0,
              scale: showShare === campaign.id ? 1 : 0.9,
            }} transition={{ duration: 0.2 }} className={`absolute right-0 ${
              showShare === campaign.id ? "pointer-events-auto" : "pointer-events-none"
            }`}>
            <div className="backdrop-blur-md rounded-lg bg-black/70 p-1 text-xs text-white shadow-lg">
              <button onClick={()=>navigate(`/user/editcampaign/${showShare}`)} className="block w-full rounded-md px-3 py-1 hover:bg-white/20">
                  Edit
              </button>
            </div>
        </motion.div>
        </div>
            </div>
                   <div
          className={`absolute inset-0 opacity-40 pointer-events-none
            ${campaign.status === "ACTIVE" && "bg-emerald-500/30"}
            ${campaign.status === "PENDING" && "bg-yellow-500/60"}
            ${campaign.status === "REJECTED" && "bg-red-500/60"}
          `}
        ></div>
            <div className="bg-gradient-to-b from-black/80 to-black px-4 py-4 space-y-2">
           
              <h2 className="text-base font-semibold text-white">
                {campaign.title}
              </h2>

              <p className="text-xs text-gray-300">
                {campaign?.description?.slice(0,80)}...
              </p>

              <div className="mt-2 space-y-1">
                
                {campaign.status=="ACTIVE"&&(
                  <>
                  <p className="text-emerald-400 text-xs font-semibold">
                  ₹{campaign.amount.toLocaleString("en-IN")} raised
                </p>

                <div className="w-full bg-gray-700/60 h-1.5 rounded-full">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(campaign.amount / campaign.goalAmount) * 100}%` }} />
                </div>
                  </>
                )}
                
             <div className="flex justify-between text-[10px] text-gray-400">
            <span>
              {campaign?.status === "ACTIVE"
                ? "Campaign Approved and Live"
                : campaign?.status === "PENDING"
                ? "Waiting for Admin Approval"
                : campaign?.status === "REJECTED"
                ? "Campaign Rejected by Admin"
                : ""}
            </span>
            </div>


                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Goal: ₹{campaign.goalAmount.toLocaleString("en-IN")}</span>
               
                </div>

              </div>

              
              <motion.button
              onClick={()=>navigate(`/user/viewcampaign/${campaign.id}`)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer mt-3 w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                View Campaign
              </motion.button>

            </div>

          </motion.div>
      ))}

    </div>
  );
};

export default UserCampaignList;