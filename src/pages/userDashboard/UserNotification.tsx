import React from 'react'
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

const UserNotification = () => {
    const notifications = [
  {
    id: 1,
    type: "success",
    title: "Tenant Created",
    message: "New tenant 'StoreOne' was onboarded successfully.",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "info",
    title: "Payment Received",
    message: "Subscription payment received for Pro Plan.",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "warning",
    title: "SMTP Warning",
    message: "SMTP retry detected for OTP emails.",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "info",
    title: "System Update",
    message: "New backend deployment completed.",
    time: "Yesterday",
  },
];
  return (
     <div className="p-4 lg:p-8">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">
          Notifications
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          System alerts, tenant events, and billing updates
        </p>
      </div>

      {/* Notification List */}
      <div className="space-y-3">

        {notifications.map((item) => (
          <div
            key={item.id}
            className="
              bg-slate-950
              border border-slate-800
              rounded-lg
              p-4
              flex gap-4
              hover:border-blue-600/40
              transition
            "
          >
            {/* Icon */}
            <div className="mt-1">
              {item.type === "success" && (
                <CheckCircle className="text-green-500" size={18} />
              )}
              {item.type === "warning" && (
                <AlertTriangle className="text-yellow-500" size={18} />
              )}
              {item.type === "info" && (
                <Info className="text-blue-500" size={18} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-white">
                  {item.title}
                </h3>
                <span className="text-xs text-slate-500">
                  {item.time}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {item.message}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end">
        <button className="text-sm text-blue-400 hover:text-blue-300 transition">
          Mark all as read
        </button>
      </div>

    </div>
  )
}

export default UserNotification





