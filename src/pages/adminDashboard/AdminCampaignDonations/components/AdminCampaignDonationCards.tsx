
import { motion } from "framer-motion";
import { HandHeart, IndianRupee, TrendingUp, Users } from "lucide-react";

const stats = [
    {
        title: "Total Donations",
        value: "245",
        icon: HandHeart,
        color: "bg-emerald-500",
    },
    {
        title: "Total Amount Raised",
        value: "₹1,20,000",
        icon: IndianRupee,
        color: "bg-blue-500",
    },
    {
        title: "Today's Donations",
        value: "₹8,500",
        icon: TrendingUp,
        color: "bg-purple-500",
    },
    {
        title: "Active Donors",
        value: "78",
        icon: Users,
        color: "bg-orange-500",
    },
];

const AdminCampaignDonationCards = () => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {stats.map((card, index) => {
                const Icon = card.icon;

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {card.title}
                                </p>

                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">
                                    {card.value}
                                </h2>
                            </div>

                            <div
                                className={`w-11 h-11 flex items-center justify-center rounded-xl text-white ${card.color}`}
                            >
                                <Icon size={20} />
                            </div>

                        </div>
                    </motion.div>
                );
            })}

        </div>
    );
};

export default AdminCampaignDonationCards;