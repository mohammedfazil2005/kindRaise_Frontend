import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { CampaignContext } from "../../../../contexts/CampainContext";

const HeaderExplore = () => {
  const [query, setQuery] = useState("");

   const {setSearchCampaign}=useContext(CampaignContext)!

   let timer: any;

   const handleSearch=(value:string)=>{
    setQuery(value)
    clearTimeout(timer);
      timer=setTimeout(() => {
      console.log("Inside timeout")
      setSearchCampaign(value)
     }, 800);

   }

  return (
    <div className="w-full mb-8 mt-10">

      {/* Header Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Explore Campaigns
        </h1>

        <p className="text-gray-500 text-sm dark:text-gray-400">
          Discover campaigns and support meaningful causes
        </p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-xl"
      >
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search campaigns, causes, or keywords..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className=" w-full pl-11 pr-10 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white transition
          "

        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={()=>{
              setQuery("")
              setSearchCampaign("")
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
          >
            <X size={18} />
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default HeaderExplore;