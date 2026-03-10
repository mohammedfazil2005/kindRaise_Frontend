
import { motion } from "framer-motion";

const donations = [
    {
        id: 1,
        donor: "Rahul Sharma",
        avatar: "https://i.pravatar.cc/40?img=3",
        campaign: "Flood Relief Kerala",
        amount: "₹2,000",
        date: "10 Mar 2026",
        status: "Success",
    },
    {
        id: 2,
        donor: "Aisha Khan",
        avatar: "https://i.pravatar.cc/40?img=5",
        campaign: "Medical Aid Fund",
        amount: "₹5,500",
        date: "09 Mar 2026",
        status: "Success",
    },
    {
        id: 3,
        donor: "John Mathew",
        avatar: "https://i.pravatar.cc/40?img=7",
        campaign: "Education Support",
        amount: "₹1,200",
        date: "08 Mar 2026",
        status: "Pending",
    },
];

const AdminCampaignDonationContent = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <span>Donor</span>
                <span>Campaign</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Status</span>
            </div>

            {/* Table Rows */}
            {donations.map((donation, index) => (
                <motion.div
                    key={donation.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-5 gap-4 px-6 py-4 items-center text-sm border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >

                    {/* Donor with Avatar */}
                    <div className="flex items-center gap-3">
                        <img
                            src={donation.avatar}
                            alt={donation.donor}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                            {donation.donor}
                        </span>
                    </div>

                    {/* Campaign */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {donation.campaign}
                    </span>

                    {/* Amount */}
                    <span className="text-emerald-500 font-semibold">
                        {donation.amount}
                    </span>

                    {/* Date */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {donation.date}
                    </span>

                    {/* Status */}
                    <span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${donation.status === "Success"
                                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                                    : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                                }`}
                        >
                            {donation.status}
                        </span>
                    </span>

                </motion.div>
            ))}
        </motion.div>
    );
};

export default AdminCampaignDonationContent;