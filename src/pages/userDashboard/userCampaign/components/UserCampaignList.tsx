import { motion } from "framer-motion";
import { Delete, Edit, Heart, Info, Share2, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const campaigns = [
  {
    title: "Help Rural Schools",
    image:
      "https://img.freepik.com/free-photo/explaining-project-points_1098-15436.jpg?semt=ais_rp_50_assets&w=740&q=80",
    raised: "₹45,230",
    goal: "₹60,000",
    status: "Active",
    description: "Providing educational resources for rural children."
  },
  {
    title: "Medical Aid for Children",
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=500",
    raised: "₹50,400",
    goal: "₹80,000",
    status: "Active",
     description: "Helping children receive critical medical treatment.",
  },
];

const UserCampaignList = () => {
     
      const [showShare, setShowShare] = useState(false);
     
      const navigate=useNavigate()

  return (
    <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

      {campaigns.map((campaign, index) => (
         <motion.div key={index} whileHover={{ y: -5 }} className="relative w-full overflow-hidden rounded-3xl bg-black">


            {/* Image */}
            <div className="relative h-[220px] w-full overflow-hidden">

              <motion.img src={campaign.image} alt={campaign.title} className="h-full w-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute right-3 top-3" onMouseEnter={() => setShowShare(true)} onMouseLeave={() => setShowShare(false)}>
        {/* Info Button */}
        <button className="backdrop-blur-md rounded-full bg-white/20 p-2 text-black">
            <Info size={16} />
        </button>

            {/* Dropdown */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: showShare ? 1 : 0, scale: showShare ? 1 : 0.9, }} transition={{ duration: 0.2 }} className={`absolute right-0  ${ showShare ? "pointer-events-auto" : "pointer-events-none" }`}
        >
            <div className="backdrop-blur-md rounded-lg bg-black/70 p-1 text-xs text-white shadow-lg">

            <button className="block w-full rounded-md px-3 py-1 hover:bg-white/20">
                Edit
            </button>

            <button className="block w-full rounded-md px-3 py-1 hover:bg-white/20">
                Share
            </button>

            </div>
        </motion.div>
        </div>
            </div>

              

            <div className="bg-gradient-to-b from-black/80 to-black px-4 py-4 space-y-2">

              <h2 className="text-base font-semibold text-white">
                {campaign.title}
              </h2>

              <p className="text-xs text-gray-300">
                {campaign?.description}
              </p>

              <div className="mt-2 space-y-1">

                <p className="text-emerald-400 text-xs font-semibold">
                  {campaign.raised} raised
                </p>

                <div className="w-full bg-gray-700/60 h-1.5 rounded-full">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-[75%]" />
                </div>

                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Goal: {campaign.goal}</span>
               
                </div>

              </div>

              
              <motion.button
              onClick={()=>navigate("/viewcampaign/1")}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                View Campaign
              </motion.button>

            </div>

          </motion.div>
      ))}

    </div>
  );
};

export default UserCampaignList;