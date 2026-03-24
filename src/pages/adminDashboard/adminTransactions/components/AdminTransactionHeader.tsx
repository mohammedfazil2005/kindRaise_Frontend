
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ArrowLeftRight } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getCampaginsTitleWithoutPending } from "../../../../services/apis/CampaignApi";
import { TransactionsHeaderSkeleton } from "../../../../skeltons/AdminDashboardSkeltons";

type AdminTransactionHeaderPropsType={
    setSearch:Dispatch<SetStateAction<string>>
    setStatus:Dispatch<SetStateAction<string>>
    setCampaignId:Dispatch<SetStateAction<string>>
    status:string
    campaignId:string
    setPage:Dispatch<SetStateAction<number>>
}

const AdminTransactionHeader = ({setSearch,setStatus,setCampaignId,status,campaignId,setPage}:AdminTransactionHeaderPropsType) => {

    const [query,setQuery]=useState("")

    useEffect(()=>{
        let timer=setTimeout(()=>{
            setSearch(query)
        },800)
        return ()=>clearTimeout(timer)
    },[query])

    const {data,isLoading}=useQuery({
        queryKey:["AdminTransactionHeaderDetails"],
        queryFn:getCampaginsTitleWithoutPending,
        staleTime:1000*60*10
    })


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
                        setStatus(e.target.value)
                        setPage(0)
                    }}
                    value={status}
                        className="pl-9 pr-6 py-3 rounded-xl border border-gray-200
            dark:border-gray-700
            bg-white dark:bg-gray-900
            text-gray-700 dark:text-gray-200
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value={""}>All Status</option>
                        <option value={"SUCCESS"}>Successful</option>
                        <option value={"PENDING"}>Pending</option>
                        <option value={"FAILED"}>Failed</option>
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

export default AdminTransactionHeader;