import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion'
import { Heart, Share2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchActiveCampaigns } from '../../../../services/apis/CampaignApi';
import { CampaignCardSkeleton } from '../../../../skeltons/CampaignSkeltons';
import type { CampaignInterface } from '../../../../interfaces/interfaces';
import moment from 'moment';

const luxuryProperties = [
  {
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=600&fit=crop',
    title: 'Santorini Villa',
    description:
      'Luxury villa overlooking the Aegean Sea, offering breathtaking sunset views and a private infinity pool for ultimate relaxation.',
    rating: 4.8,
    duration: '3 Night Stay',
  },
  {
    image:
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=600&fit=crop',
    title: 'Alpine Retreat',
    description:
      'Exclusive mountain villa with panoramic views of the Swiss Alps, featuring a private spa and world-class amenities.',
    rating: 4.9,
    duration: '5 Night Stay',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=600&fit=crop',
    title: 'Tropical Paradise',
    description:
      'Beachfront resort with crystal-clear waters, pristine white sand beaches, and world-class water sports facilities.',
    rating: 4.7,
    duration: '7 Night Stay',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=600&fit=crop',
    title: 'Tropical Paradise',
    description:
      'Beachfront resort with crystal-clear waters, pristine white sand beaches, and world-class water sports facilities.',
    rating: 4.7,
    duration: '7 Night Stay',
  },
];

const UserExploreCard = () => {
      const [isLiked, setIsLiked] = useState(false);
      const [showShare, setShowShare] = useState(false);
      const navigate=useNavigate()

      const {data:campaigns,isLoading:isCampaignLoading,refetch:campaignRefetch}=useQuery({
        queryKey:["activeCampaigns"],
        queryFn:fetchActiveCampaigns
      })

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
            <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

              {campaigns.map((property:CampaignInterface, index:number) => (

                <motion.div
                  key={index}
                  className="relative w-full overflow-hidden rounded-3xl bg-black"
                >

                

                  <div className="relative h-[240px] w-full overflow-hidden">

                    <motion.img
                      src={import.meta.env.VITE_KINDRAISE_API_URL+`/campaign/image/campaign/${property.id}`}
                      alt={property.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Top Buttons */}

                    <div className="absolute right-2 top-2 flex gap-2">

                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="backdrop-blur-md rounded-full bg-white/20 p-1.5 text-white"
                      >
                        <Heart size={16} fill={isLiked ? "white" : "none"} />
                      </button>

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
                      {property.title}
                    </h2>

                    <p className="text-xs text-gray-300">
                      {property?.description?.slice(0,120)}.....
                    </p>

                    {/* Progress */}

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

                    {/* Button */}

                   <motion.button  onClick={()=>navigate('/user/viewcampaign/1')}  initial={{ opacity: 0, y: 15 }}  whileInView={{ opacity: 1, y: 0 }}  transition={{ duration: 0.4 }}  className="mt-3 w-full rounded-xl py-2 text-sm font-semibold text-white shadow-md  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900  bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500">
                       View Campaign
                  </motion.button>

                  </div>

                </motion.div>

              ))}

            </div>
          </motion.div>}

        </div>
  )
}

export default UserExploreCard
