

const donations = [
    { user: "Rahul", amount: "₹500", campaign: "Flood Relief Kerala" },
    { user: "Aisha", amount: "₹2000", campaign: "Medical Aid Fund" },
    { user: "John", amount: "₹750", campaign: "Animal Rescue" },
];

const AdminAnalyticsRecentDonations = () => {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mt-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Recent Donations
            </h2>

            <div className="space-y-3">
                {donations.map((donation, index) => (
                    <div
                        key={index}
                        className="flex justify-between text-sm border-b pb-2 border-gray-200 dark:border-gray-700"
                    >
                        <span className="text-gray-600 dark:text-gray-300">
                            {donation.user}
                        </span>

                        <span className="text-gray-500">{donation.campaign}</span>

                        <span className="text-emerald-500 font-semibold">
                            {donation.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminAnalyticsRecentDonations;