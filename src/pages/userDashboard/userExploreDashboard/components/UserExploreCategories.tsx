import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Medical",
  "Education",
  "Animals",
  "Environment",
  "Disaster Relief",
  "Community",
];

const UserExploreCategories = () => {
  const [active, setActive] = useState("All");

  return (
    <div className="col-span-12 md:col-span-3">

      <div className="sticky top-24">

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Categories
        </h2>

        <div className="flex flex-col gap-2">

          {categories.map((cat, index) => (
            <motion.button
              key={index}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-lg text-left text-sm transition
                ${
                  active === cat
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              {cat}
            </motion.button>
          ))}

        </div>

      </div>

    </div>
  );
};

export default UserExploreCategories;