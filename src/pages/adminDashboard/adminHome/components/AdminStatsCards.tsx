import { motion } from "framer-motion";
import { Users, Megaphone, HeartHandshake, IndianRupee } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,245",
    subtitle: "Active platform users",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Total Campaigns",
    value: "87",
    subtitle: "Live fundraising campaigns",
    icon: Megaphone,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Total Donations",
    value: "3,492",
    subtitle: "Contributions received",
    icon: HeartHandshake,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Total Raised",
    value: "₹8,45,200",
    subtitle: "Funds raised so far",
    icon: IndianRupee,
    color: "from-orange-500 to-orange-600",
  },
];

export default function AdminStatsCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {stats.map((item, index) => {

        const Icon = item.icon;

        return (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="
            group relative
            bg-white dark:bg-gray-900
            p-6 rounded-2xl
            border border-gray-200 dark:border-gray-700
            shadow-sm hover:shadow-xl
            overflow-hidden
            transition-all duration-300
            "
          >

            {/* Hover gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-transparent via-white/10 to-transparent" />

            {/* Icon */}
            <div className="flex items-center justify-between mb-5">

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-md`}
              >
                <Icon size={22} />
              </div>

            </div>

            {/* Title */}
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {item.title}
            </h3>

            {/* Value */}
            <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
              {item.value}
            </p>

            {/* Subtitle */}
            <p className="text-xs text-gray-400 mt-2">
              {item.subtitle}
            </p>

          </motion.div>

        );
      })}

    </div>
  );
}