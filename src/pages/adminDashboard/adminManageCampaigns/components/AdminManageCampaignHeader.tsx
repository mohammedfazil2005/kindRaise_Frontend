
import { Search, Filter, Plus } from "lucide-react";
import type { AdminCampaignHeaderProps } from "../../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminManageCampaignHeader = ({setSearch,setStatus}:AdminCampaignHeaderProps) => {

  const [searchValue,setSearchValue]=useState("");
  const navigate=useNavigate();
  

  useEffect(() => {
  const timer = setTimeout(() => {
    setSearch(searchValue);
  }, 800);

  return () => clearTimeout(timer);
  }, [searchValue]);

  
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Campaign Management
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            View, search and manage all fundraising campaigns
          </p>
        </div>

          <motion.button
          onClick={()=>navigate(`/admin/createcampaign`)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-emerald-500 flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-emerald-600 transition"
          >
        <Plus size={18} />
        Create Campaign
        </motion.button>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-4 flex-col md:flex-row">

        {/* Search Bar */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
          onChange={(e)=>setSearchValue(e.target.value)}
            type="text"
            placeholder="Search campaigns by name, category, or creator..."
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
          onClick={(e:any)=>setStatus(e.target.value)}
            className="pl-9 pr-6 py-3 rounded-xl border border-gray-200 
            dark:border-gray-700 
            bg-white dark:bg-gray-900 
            text-gray-700 dark:text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value={""}>All Status</option>
            <option value={"ACTIVE"}>Active</option>
            <option value={"PENDING"}>Pending</option>
            <option value={"COMPLETED"}>Completed</option>
            <option value={"REJECTED"}>Rejected</option>
          </select>
        </div>

      </div>

    </div>
  );
};

export default AdminManageCampaignHeader;