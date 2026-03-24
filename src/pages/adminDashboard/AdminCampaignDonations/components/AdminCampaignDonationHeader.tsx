
import { Search } from "lucide-react";
import React, { useEffect, useState, type SetStateAction } from "react";

type AdminCampaignDonationHeaderPropsType={
    setSearch:React.Dispatch<SetStateAction<string>>;
    setPage:React.Dispatch<SetStateAction<number>>
}

const AdminCampaignDonationHeader = ({setSearch,setPage}:AdminCampaignDonationHeaderPropsType) => {

    const [query,seyQuery]=useState("");

    useEffect(()=>{
        let timer=setTimeout(()=>{
            setSearch(query)
            setPage(0)
        },800)
        return () => clearTimeout(timer); 
    },[query])


    return (
        <div className="space-y-6">

            {/* Title */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Campaign Donations
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Track and monitor donations across all fundraising campaigns
                </p>
            </div>

            {/* Search + Filters */}
            <div className="flex gap-4 flex-col md:flex-row">

                {/* Search */}
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        onChange={(e)=>seyQuery(e.target.value)}
                        type="text"
                        placeholder="Search donations by donor name or campaign..."
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200
            dark:border-gray-700
            bg-white dark:bg-gray-900
            text-gray-700 dark:text-gray-200
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                </div>

                
            

            </div>

        </div>
    );
};

export default AdminCampaignDonationHeader;