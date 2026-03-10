
import { motion } from "framer-motion";
import {
  HeartHandshake,
  CircleDollarSign,
  FolderHeart,
  HandHeart,
} from "lucide-react";

const DashboardHeader = () => {
  const stats = [
    {
      title: "Total Donations",
      value: "18",
      subtitle: "Campaigns supported",
      icon: HeartHandshake,
      color: "from-emerald-400 to-green-600"
    },
    {
      title: "Amount Donated",
      value: "₹12,450",
      subtitle: "Total contribution",
      icon: CircleDollarSign,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Active Campaigns",
      value: "6",
      subtitle: "Currently supporting",
      icon: FolderHeart,
      color: "from-purple-400 to-purple-600"
    },

  ];
  return (
    <div className="p-3 mt-5 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Your Donation Impact
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track your contributions and the difference you are making.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300"  >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-transparent via-white/10 to-transparent" />
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-md`}
                >
                  <Icon size={22} />
                </div>

              </div>

              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </h3>

              <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
                {item.value}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {item.subtitle}
              </p>
            </motion.div>

          );
        })}

      </div>

    </div>
  )
}

export default DashboardHeader
