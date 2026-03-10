import React from "react";

const campaigns = [
  { name: "Flood Relief Kerala", amount: "₹80,000" },
  { name: "Medical Aid Fund", amount: "₹55,000" },
  { name: "Education Support", amount: "₹42,000" },
];

const AdminAnalyticsTopCampaigns = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mt-8">
      {/* <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"> */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Top Campaigns
      </h2>

      <div className="space-y-3">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className="flex justify-between text-sm border-b pb-2 border-gray-200 dark:border-gray-700"
          >
            <span className="text-gray-600 dark:text-gray-300">
              {campaign.name}
            </span>

            <span className="text-emerald-500 font-semibold">
              {campaign.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnalyticsTopCampaigns;