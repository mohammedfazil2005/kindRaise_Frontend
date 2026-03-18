import { motion } from 'framer-motion'
import {  Share2 } from 'lucide-react';
import  { useEffect, useState } from 'react'
import { fetchActiveCampaigns } from '../../../services/apis/CampaignApi';
import type { CampaignInterface } from '../../../interfaces/interfaces';
import { useQuery } from '@tanstack/react-query';
import { CampaignCardSkeletonForExplorePage } from '../../../skeltons/CampaignSkeltons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { toaster } from '../../../services/Toaster';



type CategoryProp={
  category:string
  search:string
}

const ExploreCard = ({category,search}:CategoryProp) => {
     
      const [shareVisible, setShareVisible] = useState<Record<string, boolean>>({});

      const navigate=useNavigate()


   const {data:campaigns,isLoading:isCampaignLoading}=useQuery({
      queryKey:["activeCampaigns",category,search],
      queryFn:()=>fetchActiveCampaigns(search,category,'ACTIVE'),
      staleTime:1000*60*10
    })

  const handleCopy = (id: string) => {
    const link = `${window.location.origin}/user/viewcampaign/${id}`;
    navigator.clipboard.writeText(link)
    .then(() => {
      toaster("Link copied to clipboard ");
    })
    .catch(() => {
      toaster("Failed to copy ");
    });
};

    const handleShare = async (id: string, title: string) => {
      const link = `${window.location.origin}/user/viewcampaign/${id}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            text: "Check out this campaign",
            url: link,
          });
        } catch (err) {
          console.log("Share cancelled");
        }
      } else {
        // fallback (copy)
        navigator.clipboard.writeText(link);
        alert("Link copied (sharing not supported)");
      }
    };

    useEffect(()=>{
      console.log(category)
    },[category])



  return (
     <div className="col-span-12 md:col-span-9">
      {isCampaignLoading?Array(6).fill(0).map((_, i) => <CampaignCardSkeletonForExplorePage key={i} />):campaigns?.length==0?(
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">

                <p className="text-lg font-semibold text-emerald-500">
                  No Campaigns Found
                </p>

                <p className="text-sm text-emerald-500">
                  Try adjusting your search or category filter
                </p>

              </div>
      ):
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >

            <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

              {campaigns.map((property:CampaignInterface, index:number) => (

                  <motion.div
                        key={index}  className="relative w-full overflow-hidden rounded-3xl bg-black">
                        <div className="relative h-[240px] w-full overflow-hidden">
                
                          <motion.img  src={import.meta.env.VITE_KINDRAISE_API_URL+`/campaign/image/campaign/${property.id}`}  alt={property.title}  className="h-full w-full object-cover"  whileHover={{ scale: 1.05 }}  transition={{ duration: 0.4 }}
                          />
      
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                <div className="absolute right-2 top-2 flex gap-2">
                                <div className="relative" onMouseEnter={() =>   setShareVisible((prev) => ({ ...prev, [property.id]: true })) } onMouseLeave={() =>   setShareVisible((prev) => ({ ...prev, [property.id]: false })) }
                                >
                
                              <button className="backdrop-blur-md rounded-full bg-white/20 p-1.5 text-white">
                                <Share2 size={16} />
                              </button>
                
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{   opacity: shareVisible[property.id] ? 1 : 0,   scale: shareVisible[property.id] ? 1 : 0.9 }} transition={{ duration: 0.2 }} className={`absolute right-0 top-7 ${   shareVisible[property.id]     ? "pointer-events-auto"     : "pointer-events-none" }`}
                            >
                
                                <div className=" w-[80px] backdrop-blur-md space-y-1 rounded-lg bg-black/80 p-1 text-xs text-white">
                
                                  <button onClick={()=>handleCopy(property.id)} className="block w-full rounded-md px-2 py-1 hover:bg-white/20">
                                    Copy Link
                                  </button>
                
                                  <button onClick={()=>handleShare(property.id,property.title)} className="block w-full rounded-md px-2 py-1 hover:bg-white/20">
                                    Share
                                  </button>
                
                                </div>
                            </motion.div>
                                    </div>
                                  </div>
                            </div>
                
                        <div className="bg-gradient-to-b from-black/80 to-black px-3 py-3 space-y-1">
                
                          <h2 className="text-base font-semibold text-white">
                            {property.title}
                          </h2>
                
                          <p className="text-xs text-gray-300">
                            {property?.description?.slice(0,120)}.....
                          </p>
                    <div className="mt-2 space-y-2">
                
                      <p className="text-emerald-400 text-xs font-semibold mt-2">
                        ₹{property.amount?.toLocaleString("en-IN")} raised
                      </p>
                
                    <div className="w-full bg-gray-700/60 h-1.5 rounded-full">
                      <div className={`bg-emerald-500 h-1.5 rounded-full`}  style={{ width: `${(property.amount / property.goalAmount) * 100}%` }}/>
                    </div>
                
                        <div className="flex justify-between text-[11px] text-gray-400 pb-2">
                          <span>Goal: ₹{property.goalAmount.toLocaleString("en-IN")}</span>
                          <span>{moment(property.deadline).diff(moment(),"days")} Days Left</span>
                        </div>
                
                             </div>
       
                
                     <motion.button  onClick={()=>{
                      if(localStorage.getItem("token")){
                        navigate(`/user/viewcampaign/${property.id}`)
                      }else{
                        navigate("/login")
                        toaster("Please Login to Continue.")
                      }
                     }}  initial={{ opacity: 0, y: 15 }}  whileInView={{ opacity: 1, y: 0 }}  transition={{ duration: 0.4 }}  className="mt-3 w-full rounded-xl py-2 text-sm font-semibold text-white shadow-md  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900  bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500">
                                       View Campaign
                      </motion.button>
                
                                  </div>
                
                        </motion.div>

              ))}

            </div>

          </motion.div>
}
        </div>
  )
}

export default ExploreCard
