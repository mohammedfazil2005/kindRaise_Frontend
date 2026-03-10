
import { motion } from "framer-motion";
import { Users, HeartHandshake, IndianRupee, FolderHeart } from "lucide-react";

const stats = [
    { title: "Total Donations", value: "1,245", icon: HeartHandshake },
    { title: "Total Amount Raised", value: "₹3,20,000", icon: IndianRupee },
    { title: "Total Users", value: "820", icon: Users },
    { title: "Total Campaigns", value: "75", icon: FolderHeart },
];

const AdminAnalyticsStatsCards = () => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    {stat.value}
                                </h2>
                            </div>

                            <Icon className="text-emerald-500" size={26} />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default AdminAnalyticsStatsCards;