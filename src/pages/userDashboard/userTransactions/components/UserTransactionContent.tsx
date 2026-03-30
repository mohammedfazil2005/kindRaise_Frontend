
import { useQuery } from "@tanstack/react-query";
import {AnimatePresence, motion } from "framer-motion";
import { fetchAllTransactionsByUserId } from "../../../../services/apis/TransactionApi";
import {  useContext, useState, type Dispatch, type SetStateAction } from "react";
import { DonationTableSkeleton } from "../../../../skeltons/CampaignSkeltons";
import type { TransactionInterface } from "../../../../interfaces/interfaces";
import moment from "moment";
import { Inbox } from "lucide-react";
import { CampaignContext } from "../../../../contexts/CampainContext";


type AdminTransactionContentPropsType={
    search:string,
    type:string,
    campaignId:string
    page:number
    setPage:Dispatch<SetStateAction<number>>
}

const UserTransactionContent = ({search,type,campaignId,page,setPage}:AdminTransactionContentPropsType) => {

    const [selectedTxn, setSelectedTxn] = useState<TransactionInterface | null>(null);
    const {paymentAdded}=useContext(CampaignContext)!

    const {data,isLoading}=useQuery({
        queryKey:["AdminTransactionContentDetails",search,type,campaignId,page,paymentAdded],
        queryFn:()=>fetchAllTransactionsByUserId(page,8,campaignId,type,search),
        staleTime:1000*60*10
    })
    return (
        <>
        {isLoading?<DonationTableSkeleton/>:
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
        >

            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <span>Donor</span>
                <span>Campaign</span>
                <span>Transaction ID</span>
                <span>Amount</span>
                <span>Method</span>
                <span>Status</span>
                <span>Date</span>
            </div>

            {/* Transactions */}
            {data?.content?.length==0?
              <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      {/* ICON */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <Inbox className="text-gray-400" size={28} />
      </div>

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        No Transactions Found
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mt-2 max-w-sm">
        There are no transactions matching your search or filter criteria.
      </p>
    </motion.div>
            :data?.content?.map((txn:TransactionInterface, index:number) => (
                <motion.div
                onClick={() => setSelectedTxn(txn)}
                    key={txn.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-7 gap-4 px-6 py-4 items-center text-sm border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >

                    {/* Donor */}
                    <div className="flex items-center gap-3">
                        <img
                            src={`${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${txn.user_id}`}
                            alt={txn.user_name}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                            {txn.user_name}
                        </span>
                    </div>

                    {/* Campaign */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {txn.campaign_name.slice(0,20)}...
                    </span>

                    {/* Transaction ID */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {txn.PaymentReference.slice(0,17)}
                    </span>

                    {/* Amount */}
                    <span className="text-emerald-500 font-semibold">
                        ₹{txn.amount.toLocaleString("en-IN")}
                    </span>

                    {/* Method */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {txn.method}
                    </span>

                    {/* Status */}
                    <span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${txn.transactionStatus === "SUCCESS"
                                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                                    : txn.transactionStatus === "PENDING"
                                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                                        : "bg-red-100 text-red-600 dark:bg-red-900/30"
                                }`}
                        >
                            {txn.transactionStatus}
                        </span>
                    </span>

                    {/* Date */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {moment(txn.transactionDate).format("MMMM- DD/Y")}
                    </span>

                </motion.div>
            ))}

             {data?.totalPages>1&&(
        
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
      )}

          <AnimatePresence>
    {selectedTxn && (
        <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >

        <motion.div
            key="modal"
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative"
        >

            {/* 🔴 Close Button */}
            <button
            onClick={() => setSelectedTxn(null)}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center 
            rounded-full bg-gray-100 dark:bg-gray-800 
            text-gray-500 dark:text-gray-300 
            hover:text-red-500 hover:bg-red-100 
            dark:hover:bg-red-900/30 transition"
            >
            ✕
            </button>

            {/* 🟢 Header */}
            <div className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-700 text-white p-6">
            <h2 className="text-lg font-semibold">Transaction Details</h2>
            <p className="text-xs opacity-90">
                Detailed overview of this donation
            </p>
            </div>

            {/* 👤 User Info */}
            <div className="p-6 border-b dark:border-gray-700 flex items-center gap-4">

            <img
                src={`${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${selectedTxn.user_id}`}
                className="w-14 h-14 rounded-full object-cover border"
            />

            <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                {selectedTxn.user_name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                Donor
                </p>
            </div>

            </div>

            {/* 📊 Details */}
            <div className="p-6 space-y-4 text-sm">

            <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-300">Campaign</span>
                <span className="font-medium text-gray-800 dark:text-white">
                {selectedTxn.campaign_name}
                </span>
            </div>

            <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-300">Amount</span>
                <span className="text-emerald-600 font-semibold text-base">
                ₹{selectedTxn.amount.toLocaleString("en-IN")}
                </span>
            </div>

            <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-300">Transaction ID</span>
                <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-2 py-1 rounded">
                {selectedTxn.PaymentReference}
                </span>
            </div>

            <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-300">Method</span>
                <span className="font-medium uppercase text-gray-800 dark:text-white">
                {selectedTxn.method}
                </span>
            </div>

            <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-300">Date</span>
                <span className="text-gray-800 dark:text-white">
                {moment(selectedTxn.transactionDate).format("MMM DD, YYYY • hh:mm A")}
                </span>
            </div>

            {/* Status */}
            <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500 dark:text-gray-300">Status</span>

                <span
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide
                ${
                    selectedTxn.transactionStatus === "SUCCESS"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : selectedTxn.transactionStatus === "PENDING"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
                >
                {selectedTxn.transactionStatus}
                </span>
            </div>

            </div>

            {/* 🔘 Footer */}
            <div className="flex justify-end p-4 border-t dark:border-gray-700">
            <button
                onClick={() => setSelectedTxn(null)}
                className="px-5 py-2 rounded-full text-sm font-medium 
                text-gray-700 dark:text-white 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition"
            >
                Close
            </button>
            </div>

        </motion.div>
        </motion.div>
    )}
    </AnimatePresence>
        </motion.div>
        
}

        </>
    );
};

export default UserTransactionContent;