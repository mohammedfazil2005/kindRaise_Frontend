
import { motion } from "framer-motion";

const transactions = [
    {
        id: "TXN12345",
        donor: "Rahul Sharma",
        avatar: "https://i.pravatar.cc/40?img=3",
        campaign: "Flood Relief Kerala",
        amount: "₹2000",
        method: "Razorpay",
        status: "Success",
        date: "10 Mar 2026",
    },
    {
        id: "TXN12346",
        donor: "Aisha Khan",
        avatar: "https://i.pravatar.cc/40?img=5",
        campaign: "Medical Aid Fund",
        amount: "₹5500",
        method: "Razorpay",
        status: "Pending",
        date: "09 Mar 2026",
    },
    {
        id: "TXN12347",
        donor: "John Mathew",
        avatar: "https://i.pravatar.cc/40?img=7",
        campaign: "Education Support",
        amount: "₹1200",
        method: "Razorpay",
        status: "Failed",
        date: "08 Mar 2026",
    },
];

const AdminTransactionContent = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
        >

            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <span>Donor</span>
                <span>Campaign</span>
                <span>Transaction ID</span>
                <span>Amount</span>
                <span>Method</span>
                <span>Status</span>
                <span>Date</span>
            </div>

            {/* Transactions */}
            {transactions.map((txn, index) => (
                <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-7 gap-4 px-6 py-4 items-center text-sm border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >

                    {/* Donor */}
                    <div className="flex items-center gap-3">
                        <img
                            src={txn.avatar}
                            alt={txn.donor}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                            {txn.donor}
                        </span>
                    </div>

                    {/* Campaign */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {txn.campaign}
                    </span>

                    {/* Transaction ID */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {txn.id}
                    </span>

                    {/* Amount */}
                    <span className="text-emerald-500 font-semibold">
                        {txn.amount}
                    </span>

                    {/* Method */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {txn.method}
                    </span>

                    {/* Status */}
                    <span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${txn.status === "Success"
                                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                                    : txn.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                                        : "bg-red-100 text-red-600 dark:bg-red-900/30"
                                }`}
                        >
                            {txn.status}
                        </span>
                    </span>

                    {/* Date */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {txn.date}
                    </span>

                </motion.div>
            ))}

        </motion.div>
    );
};

export default AdminTransactionContent;