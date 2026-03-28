
import { motion } from "framer-motion";
import { Download, Search } from "lucide-react";
import React, { useEffect, useState, type SetStateAction } from "react";
import { fetchAllDonationsInOneCall } from "../../../../services/apis/Donation";
import { toaster } from "../../../../services/Toaster";
import { ClipLoader } from "react-spinners";
import * as XLSX from "xlsx";
import type { UserDonationType } from "../../../../interfaces/interfaces";

type AdminCampaignDonationHeaderPropsType={
    setSearch:React.Dispatch<SetStateAction<string>>;
    setPage:React.Dispatch<SetStateAction<number>>
}

const AdminCampaignDonationHeader = ({setSearch,setPage}:AdminCampaignDonationHeaderPropsType) => {

    const [query,seyQuery]=useState("");
    const [loader,setLoader]=useState(false);

    useEffect(()=>{
        let timer=setTimeout(()=>{
            setSearch(query)
            setPage(0)
        },800)
        return () => clearTimeout(timer); 
    },[query])

    const onExportClick=async()=>{
        setLoader(true)
        try {
            const apiResponse=await fetchAllDonationsInOneCall()
            if(!apiResponse||apiResponse.length==0){
                toaster("There is no donations found to export.")
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

    const excelSave=(apiResponse:Array<UserDonationType>)=>{

         const formattedData = apiResponse.map((item:UserDonationType) => ({
            "Donor Name": item.fullName,
            "Campaign Title": item.title,
            "Amount (₹)": item.amount,
            "Transaction ID": item.transactionId,
            "Donation Date": new Date(item.donationDate).toLocaleString(),
            "User ID": item.user_id,
            "Campaign ID": item.campaign_id,
            }));

            // 📄 Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
             // 📦 Create workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");
           
             // 💾 Download file
            XLSX.writeFile(workbook, "Donations.xlsx");
    }


    return (
        <div className="space-y-6">

            {/* Title */}
            <div className="flex items-center justify-between">
                 <div>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Campaign Donations
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Track and monitor donations across all fundraising campaigns
                </p>
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