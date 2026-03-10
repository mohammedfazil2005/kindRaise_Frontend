
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";

const users = [
    {
        id: 1,
        name: "Rahul Sharma",
        username: "rahul@gmail.com",
        avatar: "https://i.pravatar.cc/40?img=3",
        role: "Donor",
        status: "Active",
    },
    {
        id: 2,
        name: "Aisha Khan",
        username: "aisha@gmail.com",
        avatar: "https://i.pravatar.cc/40?img=5",
        role: "Admin",
        status: "Active",
    },
    {
        id: 3,
        name: "John Mathew",
        username: "john@gmail.com",
        avatar: "https://i.pravatar.cc/40?img=7",
        role: "Donor",
        status: "Blocked",
    },
];

const AdminUserContent = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
        >

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <span>User</span>
                <span>username</span>
                <span>Role</span>
                <span>Status</span>
                <span>Actions</span>
            </div>

            {/* Users List */}
            {users.map((user, index) => (
                <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-5 gap-4 px-6 py-4 items-center text-sm border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >

                    {/* User Info */}
                    <div className="flex items-center gap-3">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                            {user.name}
                        </span>
                    </div>

                    {/* Email */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {user.username}
                    </span>

                    {/* Role */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {user.role}
                    </span>

                    {/* Status Badge */}
                    <span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${user.status === "Active"
                                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                                    : "bg-red-100 text-red-600 dark:bg-red-900/30"
                                }`}
                        >
                            {user.status}
                        </span>
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-3">

                        <button className="text-blue-500 hover:text-blue-600">
                            <Eye size={18} />
                        </button>

                        <button className="text-red-500 hover:text-red-600">
                            <Trash2 size={18} />
                        </button>

                    </div>

                </motion.div>
            ))}
        </motion.div>
    );
};

export default AdminUserContent;