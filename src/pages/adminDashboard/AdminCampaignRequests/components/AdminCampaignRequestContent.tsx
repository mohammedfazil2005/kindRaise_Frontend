
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Eye } from "lucide-react";

const requests = [
  {
    id: 1,
    title: "Help Rural Schools",
    creator: "Rahul Sharma",
    category: "Education",
    goal: "₹60,000",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd59a93a2c0f?w=500",
  },
  {
    id: 2,
    title: "Medical Aid for Children",
    creator: "Aisha Khan",
    category: "Medical",
    goal: "₹80,000",
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=500",
  },
  {
    id: 3,
    title: "Save Street Animals",
    creator: "John Mathew",
    category: "Animals",
    goal: "₹40,000",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500",
  },
];

const AdminCampaignRequestContent = () => {
  return (
    <div className="mt-8 space-y-5">

      {requests.map((item, index) => (

        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-2xl
          p-5
          shadow-sm hover:shadow-lg
          transition
          flex gap-5 items-center
          "
        >

          {/* Campaign Image */}
          <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />

          </div>

          {/* Campaign Info */}
          <div className="flex-1">

            <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500">
              Creator: {item.creator}
            </p>

            <div className="flex gap-6 text-xs text-gray-400 mt-1">
              <span>Category: {item.category}</span>
              <span>Goal: {item.goal}</span>
            </div>

          </div>

          {/* Actions */}
          <div className="flex gap-2">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Eye size={14} />
              View
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              <CheckCircle size={14} />
              Approve
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <XCircle size={14} />
              Reject
            </motion.button>

          </div>

        </motion.div>

      ))}

    </div>
  );
};

export default AdminCampaignRequestContent;