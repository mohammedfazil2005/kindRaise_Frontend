
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

const AdminCreateUser = () => {
    return (
        <div className="w-full flex justify-center mt-8">

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
            >

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Create New User
                </h2>

                <form className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter full name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Role */}
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                                Role
                            </label>

                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                            >
                                <option>Donor</option>
                                <option>Admin</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                                Account Status
                            </label>

                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                            >
                                <option>Active</option>
                                <option>Blocked</option>
                            </select>
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Profile Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"

                            className="mt-2 hidden"
                            id="campaign_image_id"
                        />
                        <motion.button type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById("campaign_image_id")?.click()} className=" flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-emerald-600 transition ">
                            <Upload size={16} />
                            Upload Image
                        </motion.button>
                    </div>

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
                    >
                        Create User
                    </motion.button>

                </form>

            </motion.div>

        </div>
    );
};

export default AdminCreateUser;