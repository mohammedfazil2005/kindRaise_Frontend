import { motion } from "framer-motion";
import { User } from "lucide-react";

const users = [
  {
    name: "Rahul Sharma",
    email: "rahul@email.com",
    joined: "2 hours ago",
  },
  {
    name: "Aisha Khan",
    email: "aisha@email.com",
    joined: "5 hours ago",
  },
  {
    name: "John Mathew",
    email: "john@email.com",
    joined: "1 day ago",
  },
];

export default function AdminRecentUsers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
    >

      <h3 className="font-semibold text-gray-800 dark:text-white mb-5">
        Recent Users
      </h3>

      <div className="space-y-4">

        {users.map((user, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ x: 6 }}
            className="
            flex items-center justify-between
            p-3 rounded-lg
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
            "
          >

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.name}
                </p>

                <p className="text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

            </div>

            <span className="text-xs text-gray-400">
              {user.joined}
            </span>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}