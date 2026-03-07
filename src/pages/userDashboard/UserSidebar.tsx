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
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/user/dashboard" },
  { label: "Explore Campaigns", icon: Megaphone, path: "/user/all/campaigns" },
  { label: "My Donations", icon: HeartHandshake, path: "/user/donations" },
  { label: "My Campaigns", icon: FolderHeart, path: "/user/my/campaigns" },
  { label: "Notifications", icon: Bell, path: "/user/notifications" },
  { label: "Profile Settings", icon: User, path: "/user/profile" }
];

export default function UserSidebar() {

  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

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
      {/* Mobile Toggle */}
      {!isDesktop && (
        <button
          className="fixed top-4 left-4 z-[60] bg-black p-2 rounded-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      )}

      {/* Overlay */}
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

      {/* Sidebar */}
      <motion.aside
        animate={isDesktop || open ? "open" : "closed"}
        variants={sidebarAnimation}
        transition={{ duration: 0.25 }}
        className="
        fixed
        top-0 left-0
        w-64
        h-screen
        bg-gradient-to-b from-green-950 via-black to-black
        border-r border-slate-800
        p-6
        z-50
        flex flex-col
        "
      >

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img src="/logo.png" className="h-8" />
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 flex-1">
          {menuItems.map((item, i) => {
            const Icon = item.icon;

            return (
              <NavLink key={i} to={item.path}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`
                    flex items-center gap-3
                    px-4 py-3 rounded-lg text-sm
                    transition
                    ${
                      isActive
                        ? "bg-green-600 text-white"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }
                    `}
                  >
                    <Icon size={18} />
                    {item.label}
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="text-xs text-slate-500 mt-6">
          KindRaise User Panel
        </div>

      </motion.aside>
    </>
  );
}