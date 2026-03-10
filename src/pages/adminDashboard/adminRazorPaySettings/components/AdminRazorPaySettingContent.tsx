
import { motion } from "framer-motion";

const AdminRazorPaySettingContent = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* LEFT SIDE - FORM */}
                <div className="space-y-5">

                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Razorpay Configuration
                    </h2>

                    {/* Key ID */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Razorpay Key ID
                        </label>

                        <input
                            type="text"
                            placeholder="Enter Razorpay Key ID"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-600 dark:text-gray-30
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Secret Key */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Razorpay Secret Key
                        </label>

                        <input
                            type="password"
                            placeholder="Enter Razorpay Secret Key"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200  text-gray-600 dark:text-gray-30
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Mode */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Payment Mode
                        </label>

                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-30"
                        >
                            <option>Test Mode</option>
                            <option>Live Mode</option>
                        </select>
                    </div>

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
                    >
                        Save Settings
                    </motion.button>

                </div>

                {/* RIGHT SIDE - IMAGE */}
                <div className="flex justify-center">

                    <motion.img
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/razorpay-icon.png"
                        alt="Razorpay"
                        className="w-56 h-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />

                </div>

            </div>

        </motion.div>
    );
};

export default AdminRazorPaySettingContent;