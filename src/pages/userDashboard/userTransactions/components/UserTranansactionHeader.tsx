
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ArrowLeftRight, Download } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getCampaginsTitleByOwnerId } from "../../../../services/apis/CampaignApi";
import { TransactionsHeaderSkeleton } from "../../../../skeltons/AdminDashboardSkeltons";
import * as XLSX from "xlsx";
import { toaster } from "../../../../services/Toaster";
import { fetchAllTransactionsInOneCallAdmin } from "../../../../services/apis/TransactionApi";
import type { TransactionInterface } from "../../../../interfaces/interfaces";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
type AdminTransactionHeaderPropsType={
    setSearch:Dispatch<SetStateAction<string>>
    setType:Dispatch<SetStateAction<string>>
    setCampaignId:Dispatch<SetStateAction<string>>
    type:string
    campaignId:string
    setPage:Dispatch<SetStateAction<number>>
}

const UserTransactionHeader = ({setSearch,setType,setCampaignId,type,campaignId,setPage}:AdminTransactionHeaderPropsType) => {

    const [query,setQuery]=useState("")
    const [loader,setLoader]=useState(false)

    useEffect(()=>{
        let timer=setTimeout(()=>{
            setSearch(query)
        },800)
        return ()=>clearTimeout(timer)
    },[query])

    const {data,isLoading}=useQuery({
        queryKey:["AdminTransactionHeaderDetails"],
        queryFn:getCampaginsTitleByOwnerId,
        staleTime:1000*60*10
    })


     const onExportClick=async()=>{
                setLoader(true)
                try {
                    const apiResponse=await fetchAllTransactionsInOneCallAdmin()
                    if(!apiResponse||apiResponse.length==0){
                        toaster("There is no Transaction found to export.")
                        return
                    }
                    excelSave(apiResponse)
        
                } catch (error) {
                    toaster("Something went wrong please contact the kindraise admin.")
                    console.log(error)
                }finally{
                    setLoader(false)
                }
            }
        
          const excelSave = (apiResponse: Array<TransactionInterface>) => {
    
            const formattedData = apiResponse.map((item: TransactionInterface) => ({
            "Transaction ID": item.id,
            "User Name": item.user_name,
            "User ID": item.user_id,
            "Campaign Name": item.campaign_name,
            "Campaign ID": item.campaign_id,
            "Amount (₹)": item.amount,
            "Payment Method": item.method,
            "Reference ID": item.PaymentReference,
            "Status": item.transactionStatus.toUpperCase(),
            "Transaction Date": new Date(item.transactionDate).toLocaleString(),
            }));
    
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
    
     
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    
            // 💾 Download file
            XLSX.writeFile(workbook, "Transaction.xlsx");
        };


    return (
        <>
        {isLoading?<TransactionsHeaderSkeleton/>:
        <div className="space-y-6">

            {/* Top Section */}
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-white">
                        <ArrowLeftRight size={18} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            Transactions
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Track all platform payment transactions and donation activity
                        </p>
                    </div>

                </div>
                 <motion.button
                onClick={onExportClick}
                disabled={loader}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full 
                text-white shadow-md 
                bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-700
                bg-[length:200%_100%] bg-left hover:bg-right
                transition-all duration-500"
                    >
               {loader?<ClipLoader size={16} color="white"/>:<>
                <Download size={16} />
                Export 
               </>}
            </motion.button>

            </div>

            

            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4">

                {/* Search */}
                <div className="relative flex-1">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                    onChange={(e)=>setQuery(e.target.value)}
                        type="text"
                        placeholder="Search by donor, campaign..."
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200
            dark:border-gray-700
            bg-white dark:bg-gray-900
            text-gray-700 dark:text-gray-200
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />

                </div>

                {/* Status Filter */}
                <div className="relative">

                    <Filter
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                    onChange={(e)=>{
                        setType(e.target.value)
                        setPage(0)
                    }}
                    value={type}
                        className="pl-9 pr-6 py-3 rounded-xl border border-gray-200
            dark:border-gray-700
            bg-white dark:bg-gray-900
            text-gray-700 dark:text-gray-200
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value={""}>All Transactions</option>
                        <option value={"INCOME"}>Donations Received</option>
                        <option value={"OUTCOME"}>Funds Disbursed</option>
                    </select>

                </div>

                {/* Campaign Filter */}
                <select
                onChange={(e)=>{
                    setCampaignId(e.target.value)
                    setPage(0)
                }}
                value={campaignId}
                    className="px-4 py-3 rounded-xl border border-gray-200
                    dark:border-gray-700
                    bg-white dark:bg-gray-900
                    text-gray-700 dark:text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    <option value={""}>All Campaigns</option>
                   {data?.map((each:any)=>(
                    <>
                     <option value={each.id}>{each.title}</option>
               
                    </>
                   ))}
                </select>

            </div>

        </div>
}
        </>
    );
};

export default UserTransactionHeader;