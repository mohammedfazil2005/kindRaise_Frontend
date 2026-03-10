import React from "react";
import { CreditCard } from "lucide-react";

const AdminRazorPaySettingHeader = () => {
  return (
    <div className="flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-white">
          <CreditCard size={18} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Razorpay Settings
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure and manage Razorpay payment gateway for campaign donations
          </p>
        </div>

      </div>

      {/* Right Status */}
      <div className="flex items-center gap-3">

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
          Connected
        </span>

      </div>

    </div>
  );
};

export default AdminRazorPaySettingHeader;