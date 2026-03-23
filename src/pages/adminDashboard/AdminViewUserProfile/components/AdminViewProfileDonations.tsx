import { motion } from "framer-motion";
import { fetchAllTransactionsInOneCall, fetchUserTransactions } from "../../../../services/apis/TransactionApi";
import { useParams } from "react-router-dom";
import { DonationTableSkeleton } from "../../../../skeltons/CampaignSkeltons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { TransactionInterface } from "../../../../interfaces/interfaces";
import moment from "moment";
import * as XLSX from "xlsx";

const AdminViewProfileDonations = () => {
    
    const id=useParams()['id']
    
    const [page,setPage]=useState(0);
    
    const {data,isLoading}=useQuery({
        queryKey:['AdminViewProfileTransactions',id,page],
        queryFn:()=>fetchUserTransactions(id!,page,5),
        staleTime:1000*60*10,
        enabled:!!id
    })

    const onExportClick = async () => {
  try {
    const response = await fetchAllTransactionsInOneCall(id!);

    const transactions = response; 

    if (!transactions || transactions.length === 0) return;

    // 🔥 Format data for Excel
    const formattedData = transactions.map((item: any) => ({
      ID: item.id,
      Amount: item.amount,
      Status: item.transactionStatus,
      PaymentRef: item.PaymentReference,
      Date: new Date(item.transactionDate).toLocaleString(),
      Campaign: item.campaign_name,
      User: item.user_name,
    }));

    // 📄 Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // 📦 Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // 💾 Download file
    XLSX.writeFile(workbook, "transactions.xlsx");

  } catch (error) {
    console.log(error);
  }
};


  return (
    <>
    {isLoading?<DonationTableSkeleton rows={4}/>:
    <div>
       <div className="flex items-center justify-between mb-2">

        {/* Left */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    All Transactions
                    </h2>
                    <p className="text-sm text-gray-500">
                    Track all user donation activities
                    </p>
                </div>

        {/* Right (Optional Action) */}
        <button onClick={onExportClick} disabled={data?.content?.length==0} className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 
        hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            Export
        </button>

        </div>
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
        >

            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                 <span>transaction id</span>
                <span>campaign</span>
                <span>amount</span>
                <span>Date</span>
                
            </div>

            {data?.content.length==0?(
                 <div className="text-center py-16">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                No Campaigns Found
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                This user hasn’t made any transactions yet.
                </p>
            </div>
            ):(
                data.content.map((transaction:TransactionInterface,index:number)=>(
                      <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-4 gap-4 px-6 py-4 items-center text-sm border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >

                

                   
                    <span className="text-gray-500 dark:text-gray-400">
                        {transaction.campaign_name}
                    </span>

               
                    <span className="text-gray-500 dark:text-gray-400">
                        {transaction.PaymentReference}
                    </span>

                    <span className="text-gray-500 dark:text-gray-400">
                       ₹ {transaction.amount?.toLocaleString("en-IN")}
                    </span>

                    <span className="text-gray-500 dark:text-gray-400">
                        {moment(transaction.transactionDate).fromNow()}
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

export default AdminViewProfileDonations
