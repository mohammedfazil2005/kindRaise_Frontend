import { motion } from 'framer-motion'
import {  Share2 } from 'lucide-react';
import  { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchActiveCampaigns } from '../../../../services/apis/CampaignApi';
import type { AdminCampaignCardsProps, CampaignInterface } from '../../../../interfaces/interfaces';
import { useQuery } from '@tanstack/react-query';
import { CampaignCardSkeletonForExplorePage } from '../../../../skeltons/CampaignSkeltons';
import moment from 'moment';
import { CampaignContext } from '../../../../contexts/CampainContext';


const AdminManageCampaignCards = ({search,status,category}:AdminCampaignCardsProps) => {
      
      const [showShare, setShowShare] = useState(false);
      const navigate=useNavigate()
      const [page,setPage]=useState(0)

      const {campaignCreated}=useContext(CampaignContext)!

      const {data:campaigns,isLoading:isCampaignLoading}=useQuery({
        queryKey:["activeCampaigns",category,search,status,campaignCreated,page],
        queryFn:()=>fetchActiveCampaigns(search,category,status,page,6),
        staleTime:1000*60*10
      })



      useEffect(()=>{
        console.log(campaigns)
      },[campaigns])


  return (
     <div className="col-span-12 md:col-span-9">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >

            <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

              {isCampaignLoading?Array(6).fill(0).map((_, i) => <CampaignCardSkeletonForExplorePage key={i} />):
              campaigns?.content?.length==0?<div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">

                <p className="text-lg font-semibold">
                  No Campaigns Found
                </p>

                <p className="text-sm">
                  Try adjusting your search or category filter
                </p>

              </div>:
              campaigns?.content?.map((campaign:CampaignInterface) => (
                <motion.div  className="relative w-full overflow-hidden rounded-3xl bg-black"  initial={{ opacity: 0, y: 20 }}  animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.4 }}>

              {/* Image */}
              <div className="relative h-[220px] w-full overflow-hidden">

                <motion.img
                  src={import.meta.env.VITE_KINDRAISE_API_URL+`/campaign/image/campaign/${campaign.id}`}
                  alt={campaign.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Status Badge */}
                <div className="absolute left-3 top-3">
                  {campaign?.status=="ACTIVE"?<span className="bg-emerald-500 text-white text-[11px] px-2 py-1 rounded-full">
                  {campaign.status}
                  </span>:campaign.status=="COMPLETED"?<span className="bg-blue-500 text-white text-[11px] px-2 py-1 rounded-full">
                    {campaign.status}
                  </span>:campaign.status=="REJECTED"?<span className="bg-red-500 text-white text-[11px] px-2 py-1 rounded-full">
                    {campaign.status}
                  </span>:<span className="bg-yellow-500 text-white text-[11px] px-2 py-1 rounded-full">
                    {campaign.status}
                  </span>}
                </div>

                {/* Top Buttons */}
                <div className="absolute right-2 top-2 flex gap-2">


                  <button
                    onMouseEnter={() => setShowShare(true)}
                    onMouseLeave={() => setShowShare(false)}
                    className="backdrop-blur-md rounded-full bg-white/20 p-1.5 text-white"
                  >
                    <Share2 size={16} />
                  </button>

                </div>

              </div>

            {/* Share Menu */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: showShare ? 1 : 0,
                  scale: showShare ? 1 : 0.9,
                }}
                transition={{ duration: 0.2 }}
                className={`absolute right-3 top-12 ${
                  showShare ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <div className="backdrop-blur-md space-y-1 rounded-lg bg-white/20 p-1 text-xs text-white">
                  <button className="block w-full rounded-md px-2 py-1 hover:bg-white/20">
                    Copy Link
                  </button>
                  <button className="block w-full rounded-md px-2 py-1 hover:bg-white/20">
                    Share
                  </button>
                </div>
              </motion.div>

            {/* Content */}
              <div className="bg-gradient-to-b from-black/80 to-black px-3 py-3 space-y-1">

                <h2 className="text-base font-semibold text-white">
                  {campaign.title.slice(0,30)}..
                </h2>

                <p className="text-xs text-gray-300">
                  {campaign.description.slice(0,84)}..
                </p>

                {/* Category */}
                <p className="text-[11px] text-gray-400">
                  Category: {campaign.category_title}
                </p>

                {/* Progress */}
                <div className="mt-2 space-y-1">

                  <p className="text-emerald-400 text-xs font-semibold">
                    ₹{campaign.amount} raised
                  </p>

                  <div className="w-full bg-gray-700/60 h-1.5 rounded-full">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full"
                      style={{ width: `${(campaign.amount / campaign.goalAmount) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>Goal: ₹{campaign.goalAmount.toLocaleString("en-IN")}</span>
                    <span>{moment(campaign.deadline).diff(moment(),"days")} Days Left</span>
                  </div>

                </div>

                {/* Button */}
                <motion.button
                  onClick={() => navigate(`/admin/viewcampaign/${campaign.id}`)}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-3 w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600"
                >
                  View Campaign
                </motion.button>

              </div>
            </motion.div>
              ))}
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
          </motion.div>

        </div>
  )
}

export default AdminManageCampaignCards
