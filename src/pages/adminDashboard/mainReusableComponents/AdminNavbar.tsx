import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellRing, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../../services/Toaster";

export default function AdminNavbar() {

  const [open, setOpen] = useState(false);
  const navigate=useNavigate()

  const onLogout=()=>{
      localStorage.clear();
      toaster("Logged out!");
      navigate('/');
    }

  return (
    <div
      className="
      fixed top-0 left-0 lg:left-64 right-0 h-20
      flex items-center justify-between px-8
      bg-gray-100 dark:bg-gray-900
      border-b border-gray-200 dark:border-gray-700
      shadow-sm z-40 transition-colors duration-300
      "
    >

      {/* Left Section */}
      <div className="flex flex-col ml-10 lg:ml-0">

        <h1 className="text-xl font-semibold text-gray-800 dark:text-white tracking-wide">
          Admin Dashboard
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage <span className="text-emerald-500 font-medium">KindRaise</span> platform
        </p>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notifications */}
        <button
          className="
          relative p-2 rounded-lg
          hover:bg-gray-200 dark:hover:bg-gray-800
          transition
          "
        >

          <BellRing
            className="text-gray-600 dark:text-gray-300"
            size={20}
          />

          {/* Notification Dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />

        </button>


        {/* Profile Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >

          <div
            className="
            flex items-center gap-3 cursor-pointer
            hover:bg-gray-200 dark:hover:bg-gray-800
            px-3 py-2 rounded-lg transition
            "
          >

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">

              <img
                src="/unknownphoto.avif"
                className="w-full h-full object-cover"
              />

            </div>

            {/* Name */}
            <div className="hidden sm:flex flex-col leading-tight">

              <span className="text-sm font-medium text-gray-800 dark:text-white">
               {localStorage.getItem("name")}
              </span>

              <span className="text-xs text-gray-500 dark:text-gray-400">
                System Administrator
              </span>

            </div>

          </div>


          {/* Dropdown */}
          <AnimatePresence>
            {open && (

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="
                absolute right-0 mt-3 w-48
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-xl shadow-lg overflow-hidden
                "
              >

                <button
                  className="
                  flex items-center gap-3 w-full
                  px-4 py-3 text-sm
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-700 transition
                  "
                >
                  <User size={16} />
                  Profile
                </button>

                {/* <button
                  className="
                  flex items-center gap-3 w-full
                  px-4 py-3 text-sm
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-700 transition
                  "
                >
                  <Settings size={16} />
                  Settings
                </button> */}

                <button
                onClick={onLogout}
                  className="
                  flex items-center gap-3 w-full
                  px-4 py-3 text-sm
                  text-red-500
                  hover:bg-red-50 dark:hover:bg-red-900/30
                  transition
                  "
                >
                  <LogOut size={16} />
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