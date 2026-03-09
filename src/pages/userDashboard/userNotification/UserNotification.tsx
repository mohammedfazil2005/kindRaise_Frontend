import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const notifications = [
  {
    title: "Donation Successful",
    message: "Your donation of ₹2000 was successfully sent.",
    time: "2 hours ago",
  },
  {
    title: "Campaign Update",
    message: "Medical Aid campaign reached 70% of its goal.",
    time: "1 day ago",
  },
  {
    title: "New Donor",
    message: "Someone donated to your campaign.",
    time: "2 days ago",
  },
];

const UserNotification = () => {
  return (
    <div className="space-y-6 mt-10">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Notifications
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Stay updated with your activity
        </p>
      </div>

      {/* Notification List */}
      <div className="space-y-4">

        {notifications.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{ y: -3 }}
            className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border shadow-sm dark:border-gray-700"
          >

            <div className="bg-emerald-500 p-2 rounded-lg text-white">
              <Bell size={18} />
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-gray-800 dark:text-white">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.message}
              </p>

              <span className="text-xs text-gray-400">
                {item.time}
              </span>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
};

export default UserNotification;