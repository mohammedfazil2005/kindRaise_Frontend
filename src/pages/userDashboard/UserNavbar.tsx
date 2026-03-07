import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellRing, LogOut } from "lucide-react";

export default function UserNavbar() {

  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-64 right-0 h-20 flex items-center justify-between px-6 border-b border-gray-400 bg-black z-40">

      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold  text-white">
          Dashboard
        </h1>
        <p className="text-slate-400 text-sm">
          Welcome back to KindRaise
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-slate-900 transition">
          <BellRing className="text-slate-400" size={18}/>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"/>
        </button>

        {/* Profile */}
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >

          <div className="flex items-center gap-3 cursor-pointer">

            <div className="w-9 h-9 bg-slate-700 rounded-full overflow-hidden">
              <img src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_rp_50_assets&w=740&q=80" className="w-full h-full object-cover"/>
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="text-sm text-white">User</span>
              <span className="text-xs text-white">KindRaise Member</span>
            </div>

          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute right-0 mt-3 w-40 bg-black border border-slate-800 rounded-lg shadow-lg"
              >

                <button className="flex items-center gap-2 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-900">
                  <LogOut size={16}/>
                  Logout
                </button>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}