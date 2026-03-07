import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  GraduationCap,
  HeartPulse,
  Leaf,
  PawPrint,
  Ambulance,
  Baby,
  Users,
  SlidersHorizontal,
  X
} from "lucide-react";

const categories = [
  { name: "All Campaigns", icon: Megaphone },
  { name: "Education", icon: GraduationCap },
  { name: "Medical", icon: HeartPulse },
  { name: "Environment", icon: Leaf },
  { name: "Animals", icon: PawPrint },
  { name: "Disaster Relief", icon: Ambulance },
  { name: "Children", icon: Baby },
  { name: "Community", icon: Users }
];

const ExploreCatgories = () => {

  const [active, setActive] = useState("All Campaigns");
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
     <button
  onClick={() => setOpen(true)}
  className="md:hidden mb-4 flex w-[200px] items-center gap-2 bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg shadow"
>
  <SlidersHorizontal size={18} />
  Filter Categories
</button>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block col-span-12 md:col-span-3 md:sticky md:top-24 h-fit"
      >
        <div className="bg-white shadow-sm p-6 rounded-2xl">

          <h3 className="font-extrabold text-gray-700 mb-5 text-lg">
            Categories
          </h3>

          <div className="space-y-2">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <motion.button
                  key={category.name}
                  onClick={() => setActive(category.name)}
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.96 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${
                    active === category.name
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </motion.button>
              );

            })}

          </div>

        </div>
      </motion.div>

      {/* ================= MOBILE OFFCANVAS ================= */}

      <AnimatePresence>

        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white z-50 p-6 shadow-xl md:hidden"
            >

              {/* Header */}
              <div className="flex items-center justify-between mb-5">

                <h3 className="font-bold text-lg">
                  Categories
                </h3>

                <button onClick={() => setOpen(false)}>
                  <X size={20} />
                </button>

              </div>

              {/* Categories */}
              <div className="space-y-2">

                {categories.map((category) => {

                  const Icon = category.icon;

                  return (
                    <button
                      key={category.name}
                      onClick={() => {
                        setActive(category.name);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                      ${
                        active === category.name
                          ? "bg-emerald-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={18} />
                      {category.name}
                    </button>
                  );

                })}

              </div>

            </motion.div>
          </>
        )}

      </AnimatePresence>
    </>
  );
};

export default ExploreCatgories;