import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const donations = [
  { user: "Rahul", amount: "₹500", campaign: "Help Rural Schools" },
  { user: "Aisha", amount: "₹2000", campaign: "Medical Aid" },
  { user: "John", amount: "₹750", campaign: "Save Street Animals" },
];

export default function AdminRecentDonations() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Recent Donations
        </h3>

        <button className="text-sm text-emerald-500 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">

        {donations.map((item, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 6 }}
            className="
            flex justify-between items-center
            border-b border-gray-200 dark:border-gray-700
            pb-4 last:border-none
            "
          >

            {/* Left side */}
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-semibold">
                {item.user.charAt(0)}
              </div>

              {/* User Info */}
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {item.user}
                </p>

                <p className="text-xs text-gray-500">
                  {item.campaign}
                </p>
              </div>

            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">

              {/* Amount */}
              <span className="text-emerald-600 font-semibold text-sm">
                {item.amount}
              </span>

              {/* View button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="
                flex items-center gap-1
                text-xs px-3 py-1.5
                bg-emerald-500 text-white
                rounded-lg
                hover:bg-emerald-600
                transition
                "
              >
                <Eye size={14} />
                View
              </motion.button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}