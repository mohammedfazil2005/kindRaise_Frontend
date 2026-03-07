import React from "react";
import { motion } from "framer-motion";
import { Heart, Share2,HeartHandshake, TrendingUp, Users, Bell } from "lucide-react";
const stats = [
  {
    title: "Total Donation",
    value: "₹82,125",
    change: "+3.21% than last month",
    icon: HeartHandshake,
    color: "bg-yellow-400"
  },
  {
    title: "Donation Today",
    value: "₹3,326",
    change: "+2.32% than yesterday",
    icon: TrendingUp,
    color: "bg-emerald-500"
  },
  {
    title: "Total Donors",
    value: "10,242",
    change: "-1.82% than last month",
    icon: Users,
    color: "bg-blue-500"
  }
];

const luxuryProperties = [
  {
    title: "Help Children Education",
    description: "Support poor children education",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800",
  },

];

const notifications = [
  {
    message: "Your campaign 'Help Children Education' reached 70%",
    time: "2 hours ago"
  },
  {
    message: "New donor supported your campaign",
    time: "5 hours ago"
  },
  {
    message: "Your campaign was approved",
    time: "Yesterday"
  }
];

const donations = [
  {
    donor: "Rahul",
    campaign: "Cancer Treatment Support",
    amount: "₹500",
    time: "Today"
  },
  {
    donor: "Anjali",
    campaign: "Flood Relief Campaign",
    amount: "₹1200",
    time: "Yesterday"
  },
  {
    donor: "Akash",
    campaign: "Children Education",
    amount: "₹700",
    time: "2 days ago"
  }
];
const fundraising = [
  {
    title: "Help Them Smile Again",
    raised: "₹52,050",
    goal: "₹70,000",
    percent: 82,
  },
  {
    title: "Help Them Study Again",
    raised: "₹30,100",
    goal: "₹50,000",
    percent: 73,
  },
];

export default function UserMainDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6">

        {stats.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="bg-white p-5 rounded-xl border shadow-sm"
            >
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    {item.value}
                  </h2>

                  <p className="text-xs text-green-600 mt-2">
                    {item.change} than last month
                  </p>
                </div>

                <div className="bg-green-100 p-2 rounded-lg">
                  <Icon size={18} className="text-green-600" />
                </div>

              </div>
            </motion.div>
          );
        })}

      </div>


      {/* GRID SECTION */}
      {/* <div className="grid lg:grid-cols-3 gap-8">

       
        <div className=" bg-white rounded-xl p-6 border shadow-sm">

          <h2 className="font-semibold mb-6">Recent Campaigns</h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid gap-7 md:grid-cols-1">

              {luxuryProperties.map((property, index) => (

                <motion.div
                  key={index}
                  className="relative w-full overflow-hidden rounded-3xl bg-black"
                >

                  <div className="relative h-[220px] w-full overflow-hidden">

                    <motion.img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.05 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                   
                  </div>

                  <div className="bg-gradient-to-b from-black/80 to-black px-3 py-3 space-y-1">

                    <h2 className="text-sm font-semibold text-white">
                      {property.title}
                    </h2>

                    <p className="text-xs text-gray-300">
                      {property.description}
                    </p>

                    <div className="mt-2 space-y-1">

                      <p className="text-emerald-400 text-xs font-semibold">
                        ₹45,230 raised
                      </p>

                      <div className="w-full bg-gray-700/60 h-1.5 rounded-full">
                        <div className="bg-emerald-500 h-1.5 rounded-full w-[75%]" />
                      </div>

                      <div className="flex justify-between text-[10px] text-gray-400">
                        <span>Goal: ₹60,000</span>
                        <span>12 Days Left</span>
                      </div>

                    </div>

                    <button className="mt-3 w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white hover:bg-emerald-600">
                      View Campaign
                    </button>

                  </div>

                </motion.div>

              ))}

            </div>
          </motion.div>

        </div>

      
      

       <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl p-6 border shadow-sm"
  >
    <div className="flex items-center gap-2 mb-5">
      <HeartHandshake className="text-emerald-500" size={18} />
      <h2 className="font-semibold">Recent Donations</h2>
    </div>

    <div className="space-y-4">
      {donations.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02 }}
          className="flex justify-between items-center border-b pb-3 last:border-none"
        >

          <div>
            <p className="text-sm font-medium">
              {item.donor}
            </p>

            <p className="text-xs text-gray-500">
              {item.campaign}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-emerald-600">
              {item.amount}
            </p>

            <p className="text-xs text-gray-400">
              {item.time}
            </p>
          </div>

        </motion.div>
      ))}
    </div>
  </motion.div> 

      </div> */}

    </div>
  );
}