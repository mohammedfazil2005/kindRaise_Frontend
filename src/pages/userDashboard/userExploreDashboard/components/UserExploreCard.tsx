import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion'
import {  Share2 } from 'lucide-react';
import  { useContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchActiveCampaigns } from '../../../../services/apis/CampaignApi';
import { CampaignCardSkeleton } from '../../../../skeltons/CampaignSkeltons';
import type { CampaignInterface } from '../../../../interfaces/interfaces';
import moment from 'moment';
import { CampaignContext } from '../../../../contexts/CampainContext';
import { toaster } from '../../../../services/Toaster';

type UserExploreCardPropsType={
  page:number
  setPage:Dispatch<SetStateAction<number>>
}


const UserExploreCard = ({page,setPage}:UserExploreCardPropsType) => {
    //  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});
      const [shareVisible, setShareVisible] = useState<Record<string, boolean>>({});
      const navigate=useNavigate()

      const {searchCampaign,category,paymentAdded}=useContext(CampaignContext)!

      const {data:campaigns,isLoading:isCampaignLoading}=useQuery({
        queryKey:["activeCampaigns",category,searchCampaign,paymentAdded,page],
        queryFn:()=>fetchActiveCampaigns(searchCampaign,category,'ACTIVE',page,9),
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
        if(!campaigns)return;        
      },[campaigns])

      useEffect(()=>{
        console.log(campaigns)
      },[campaigns])


  return (
     <div className="col-span-12 md:col-span-9">

         {isCampaignLoading?Array(6).fill(0).map((_, i) => <CampaignCardSkeleton key={i} />): <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
  {campaigns && campaigns?.content?.length > 0 ? (
    campaigns.content.map((property: CampaignInterface, index: number) => (
      
      <motion.div
        key={index}
        className="relative w-full h-[420px] overflow-hidden rounded-3xl bg-black flex flex-col"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Section */}
        <div className="relative h-[240px] w-full overflow-hidden">
          <motion.img
            src={`${import.meta.env.VITE_KINDRAISE_API_URL}/campaign/image/campaign/${property.id}`}
            alt={property.title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Share Button */}
          <div className="absolute right-2 top-2 flex gap-2">
            <div
              className="relative"
              onMouseEnter={() =>
                setShareVisible((prev) => ({ ...prev, [property.id]: true }))
              }
              onMouseLeave={() =>
                setShareVisible((prev) => ({ ...prev, [property.id]: false }))
              }
            >
              <button className="backdrop-blur-md rounded-full bg-white/20 p-1.5 text-white">
                <Share2 size={16} />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: shareVisible[property.id] ? 1 : 0,
                  scale: shareVisible[property.id] ? 1 : 0.9,
                }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 top-7 ${
                  shareVisible[property.id]
                    ? "pointer-events-auto"
                    : "pointer-events-none"
                }`}
              >
                <div className="w-[90px] backdrop-blur-md space-y-1 rounded-lg bg-black/80 p-1 text-xs text-white">
                  <button
                    onClick={() => handleCopy(property.id)}
                    className="block w-full rounded-md px-2 py-1 hover:bg-white/20"
                  >
                    Copy Link
                  </button>

                  <button
                    onClick={() =>
                      handleShare(property.id, property.title)
                    }
                    className="block w-full rounded-md px-2 py-1 hover:bg-white/20"
                  >
                    Share
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gradient-to-b from-black/80 to-black px-3 py-3 flex flex-col flex-1">
          
          {/* Title */}
          <h2 className="text-sm font-semibold text-white line-clamp-1">
            {property.title}
          </h2>

          {/* Description */}
          <p className="text-xs text-gray-300 line-clamp-2">
            {property?.description}
          </p>

          {/* Progress Section */}
          <div className="mt-2 space-y-2">
            <p className="text-emerald-400 text-xs font-semibold">
              ₹{property.amount?.toLocaleString("en-IN") || 0} raised
            </p>

            <div className="w-full bg-gray-700/60 h-1.5 rounded-full">
              <div
                className="bg-emerald-500 h-1.5 rounded-full"
                style={{
                  width: `${Math.min(
                    (property.amount / property.goalAmount) * 100,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-gray-400 pb-2">
              <span>
                Goal: ₹{property.goalAmount.toLocaleString("en-IN")}
              </span>
              <span>
                {moment(property.deadline).diff(moment(), "days")} Days Left
              </span>
            </div>
          </div>

          {/* Button (Always Bottom Aligned) */}
          <motion.button
            onClick={() =>
              navigate(
                `/user/explore/campaigns/viewcampaign/${property.id}`
              )
            }
            className="mt-auto w-full rounded-xl py-2 text-sm font-semibold text-white shadow-md bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900 bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500"
            whileTap={{ scale: 0.95 }}
          >
            View Campaign
          </motion.button>
        </div>
      </motion.div>
    ))
  ) : (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
      <p className="text-lg font-semibold">No Campaigns Found</p>
      <p className="text-sm">
        Try adjusting your search or category filter
      </p>
    </div>
  )}
</div>
             {campaigns?.totalPages>1&&(
        
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
            {Array.from({ length: campaigns?.totalPages || 0 }).map((_, i) => (
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
                    disabled={page + 1 >= campaigns?.totalPages}
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
          </motion.div>}

        </div>
  )
}

export default UserExploreCard
