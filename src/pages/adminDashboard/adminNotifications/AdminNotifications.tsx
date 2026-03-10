import  { useState } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "New Campaign Request",
    message: "Rahul submitted a campaign for approval",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "New Donation",
    message: "Aisha donated ₹2000 to Flood Relief",
    time: "10 min ago",
    read: false,
  },
  {
    id: 3,
    title: "Campaign Approved",
    message: "Medical Aid campaign has been approved",
    time: "1 hour ago",
    read: true,
  },
];

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    const updated = notifications.map((n) => ({
      ...n,
      read: true,
    }));
    setNotifications(updated);
  };

  const openNotification = (id:Number) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
  };

  return (
    <div className="mt-10 mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-2">
          <Bell className="text-emerald-500" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Notifications
          </h2>
        </div>

        <button
          onClick={markAllRead}
          className="text-sm bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
        >
          Mark All Read
        </button>

      </div>

      {/* Notification List */}
      <div className="space-y-3">

        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => openNotification(notification.id)}
            className={`cursor-pointer p-4 rounded-xl border transition
            ${
              notification.read
                ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200"
            }`}
          >

            <div className="flex justify-between items-start">

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {notification.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {notification.message}
                </p>
              </div>

              {!notification.read && (
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              )}

            </div>

            <p className="text-xs text-gray-400 mt-2">
              {notification.time}
            </p>

          </motion.div>
        ))}

      </div>

    </div>
  );
};

export default AdminNotifications;