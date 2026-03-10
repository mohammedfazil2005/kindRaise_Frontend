
import { Search, Filter } from "lucide-react";

const AdminCampaignDonationHeader = () => {
    return (
        <div className="space-y-6">

            {/* Title */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Campaign Donations
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Track and monitor donations across all fundraising campaigns
                </p>
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
                        placeholder="Search donations by donor name or campaign..."
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200
            dark:border-gray-700
            bg-white dark:bg-gray-900
            text-gray-700 dark:text-gray-200
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                </div>

                {/* Campaign Filter */}
                <div className="relative">
                    <Filter
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                        className="pl-9 pr-6 py-3 rounded-xl border border-gray-200
            dark:border-gray-700
            bg-white dark:bg-gray-900
            text-gray-700 dark:text-gray-200
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option>All Campaigns</option>
                        <option>Flood Relief</option>
                        <option>Medical Aid</option>
                        <option>Education Support</option>
                    </select>
                </div>

            </div>

        </div>
    );
};

export default AdminCampaignDonationHeader;