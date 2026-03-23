import { motion } from 'framer-motion';
import { ArrowRight, Folder } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserCampaigns, getTotalNumberOfCampaignsOfUser } from '../../../../services/apis/CampaignApi';
import { useQuery } from '@tanstack/react-query';
import { DonationTableSkeleton } from '../../../../skeltons/CampaignSkeltons';
import type { CampaignInterface } from '../../../../interfaces/interfaces';





const AdminViewProfileCampaigns = () => {

    const id=useParams()['id']

    const [page,setPage]=useState(0);

     const {data,isLoading}=useQuery({
        queryKey:['AdminViewProfileCampaignsDetails',id,page],
        queryFn:()=>fetchUserCampaigns(page,5,id),
        staleTime:1000*60*10,
        enabled:!!id
      })
     const {data:totalCampaigns}=useQuery({
        queryKey:['admingetTotalNumberOfCampaignsOfUser',id,page],
        queryFn:()=>getTotalNumberOfCampaignsOfUser(id!),
        staleTime:1000*60*10,
        enabled:!!id
      })



  return (
    <>
    {isLoading?<DonationTableSkeleton rows={4}/>:
    <div>
       <div className="flex items-center justify-between mb-2 mt-4">

        {/* Left */}
        <div className="flex items-center gap-3">

            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Folder size={18} />
            </div>

            <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                User Campaigns
            </h2>
            <p className="text-sm text-gray-500">
                Campaigns created or supported by this user
            </p>
            </div>

        </div>

        {/* Right */}
        <span className="text-sm text-gray-500">
            {totalCampaigns||0} campaigns
        </span>

        </div>
       <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
        >

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                 <span>Title</span>
                <span>Status</span>
                <span>Goal Amount</span>
                <span>Raised</span>
                <span></span>
            </div>

            {/* Campaigns List */}
          {data?.content?.length === 0 ? (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                No Campaigns Found
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                This user hasn’t create any campaigns yet.
                </p>
            </div>
            ) : (
            data?.content?.map((campaign: CampaignInterface, index: number) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-5 gap-4 px-6 py-4 items-center text-sm border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                <span className="text-gray-500 dark:text-gray-400">
                    {campaign.title}
                </span>

                <span className="text-gray-500 dark:text-gray-400">
                    {campaign.status}
                </span>

                <span className="text-gray-500 dark:text-gray-400">
                   ₹ {campaign?.goalAmount?.toLocaleString("en-IN")}
                </span>

                <span className="text-gray-500 dark:text-gray-400">
                  ₹  {campaign?.amount.toLocaleString("en-IN")}
                </span>

                <span className="text-emerald-600 hover:text-emerald-700 text-sm font-medium cursor-pointer transition flex items-center gap-1">
                    View Campaign <ArrowRight />
                </span>
                </motion.div>
            ))
            )}

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
            {Array.from({ length: data?.totalPages || 0 }).map((_, i) => (
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
                    disabled={page + 1 >= data?.totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
                    bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    Next
                </motion.button>
            </motion.div>

           
        </motion.div>
    </div>
}
    </>
  )
}

export default AdminViewProfileCampaigns
