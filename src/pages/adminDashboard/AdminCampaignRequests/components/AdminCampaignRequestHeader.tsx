
import { Search, Filter } from "lucide-react";

const AdminCampaignRequestHeader = () => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Campaign Requests
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review and approve fundraising campaign requests from users
          </p>
        </div>

        {/* Pending Counter */}
        <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-semibold dark:bg-yellow-900/40 dark:text-yellow-300">
          12 Pending Requests
        </div>

      </div>

      {/* Search + Filters */}
      <div className="flex gap-4 flex-col md:flex-row">

        {/* Search */}
        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search requests by campaign name, category, or creator..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 
            dark:border-gray-700 
            bg-white dark:bg-gray-900 
            text-gray-700 dark:text-gray-200 
            placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />

        </div>

        {/* Status Filter */}
        <div className="relative">

          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select className="pl-9 pr-6 py-3 rounded-xl border border-gray-200  dark:border-gray-700  bg-white dark:bg-gray-900  text-gray-700 dark:text-gray-200  focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>All Requests</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>

        </div>

      </div>

    </div>
  );
};

export default AdminCampaignRequestHeader;