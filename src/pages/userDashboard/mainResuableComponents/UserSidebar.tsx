import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Megaphone,
  HeartHandshake,
  FolderHeart,
  Bell,
  User,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/user" },
  { label: "Explore Campaigns", icon: Megaphone, path: "/user/explore/campaigns" },
  { label: "My Donations", icon: HeartHandshake, path: "/user/donations" },
  { label: "My Campaigns", icon: FolderHeart, path: "/user/my/campaigns" },
  { label: "Notifications", icon: Bell, path: "/user/notifications" },
  { label: "Profile Settings", icon: User, path: "/user/profile" }
];

export default function UserSidebar() {

  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  const sidebarAnimation = {
    open: { x: 0 },
    closed: { x: "-100%" }
  };

  return (
    <>
      {!isDesktop && (
        <button
          className="fixed top-4 left-4 z-[60] bg-gray-800 p-2 rounded-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      )}

      <AnimatePresence>
        {open && !isDesktop && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>

      <motion.aside  animate={isDesktop || open ? "open" : "closed"}  variants={sidebarAnimation}  transition={{ duration: 0.25 }}  className="  fixed top-0 left-0 w-64 h-screen  bg-gray-100  dark:bg-gray-900  border-r border-gray-200 dark:border-gray-700  p-6 z-50 flex flex-col  transition-colors duration-300  " >

        <div className="flex items-center gap-2 mb-8">
          <img src="/logo.png" className="h-8" />
        </div>

       
        <nav className="flex flex-col gap-2 flex-1">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink key={i} to={item.path} end={item.path === "/user"}>
                {({ isActive }) => (
                  <motion.div  whileHover={{ x: 4 }}  className={`  flex items-center gap-3  px-4 py-3 rounded-lg text-sm  transition  ${isActive      ? "bg-green-600 text-white"      : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"    }  `}
                  >
                    <Icon size={18} />
                    {item.label}
                  </motion.div>
                )}
              </NavLink>
            );

          })}
        </nav>

        
        <button
          onClick={toggleTheme}
          className="  flex items-center gap-3 px-4 py-3 rounded-lg text-sm  text-gray-600 dark:text-gray-300  hover:bg-gray-200 dark:hover:bg-gray-800  transition mb-3  ">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Footer */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          KindRaise User Panel
        </div>

      </motion.aside>
    </>
  );
}