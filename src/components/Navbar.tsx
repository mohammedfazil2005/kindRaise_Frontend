import  { useContext, useState } from "react"
import { ArrowBigRight, LogOut, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { AdminDashboardContext } from "../contexts/AdminDashboardContext"
import { useQuery } from "@tanstack/react-query"
import { fetchLoggedInUserProfile } from "../services/apis/ProfileApi"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(false);
  const navigate=useNavigate()
  const token=localStorage.getItem("token")

    const {profileUpdate}=useContext(AdminDashboardContext)!


    const {data}=useQuery({
    queryKey:['profileAdmin',profileUpdate],
    queryFn:fetchLoggedInUserProfile,
     staleTime:1000*60*10,
     enabled:!!token
  })

  return (
    <>
    <div className="w-full bg-[#f3f5f4] border-b border-gray-200 sticky top-0 z-50">

      <div className=" mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="h-8"/>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link to="/explore" className="hover:text-gray-900 transition">
            Explore
          </Link>
          
        </div>

        {/* DESKTOP ACTIONS */}
        {!token&&(
          <div className="hidden md:flex items-center gap-5">
          <p
           onClick={()=>{navigate('/login')}}
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition cursor-pointer"
          >
            Login
          </p>

          <motion.button
             onClick={()=>{navigate('/register')}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2 rounded-full shadow-md transition"
          >
            Get Started
          </motion.button>
        </div>
        )}


      {token&&(
         <div className="relative hidden md:block" onMouseEnter={() => setOpen(true)}  onMouseLeave={() => setOpen(false)}   >
         

           
          {/* Profile Trigger */}
         <div className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-xl hover:bg-gray-100 transition">

    {/* ✅ Image moved inside */}
    <img
      src={
        data?.id
          ? `${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${data.id}`
          : "/unknownphoto.avif"
      }
      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = "/unknownphoto.avif";
      }}
      className="w-10 h-10 rounded-full object-cover border"
    />

    {/* Text */}
    <div className="flex flex-col leading-tight">
      <span className="text-sm font-semibold text-gray-800">
        {data?.fullName}
      </span>

      <span className="text-xs text-gray-500">
        {data?.role === "ROLE_USER"
          ? "KindRaise Member"
          : "System Administrator"}
      </span>
    </div>

  </div>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
            >

              {/* Dashboard */}
              <button
                onClick={() =>{ 
                  if(data?.role=="USER"){
                     navigate('/user')
                  }else{
                    navigate('/admin')
                  }
                 }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <ArrowBigRight size={16} className="text-emerald-500" />
                Dashboard
              </button>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Logout */}
              <button
                onClick={()=>{
                  localStorage.clear()
                  navigate('/login')
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>

            </motion.div>
          )}
        </AnimatePresence>

          </div>
      )}

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-5 text-sm font-medium text-gray-700">

              <a href="#" onClick={() => setIsOpen(false)}>
                Home
              </a>
              <a href="#" onClick={() => setIsOpen(false)}>
                Explore
              </a>
              <a href="#" onClick={() => setIsOpen(false)}>
                How It Works
              </a>

              {!token&&(
                <div className="border-t border-gray-200 pt-4 flex flex-col gap-4">
               <motion.button
               onClick={()=>{navigate('/login')}}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-500 text-white py-2 "
                >
                  Login
                </motion.button>

                <motion.button
                onClick={()=>{navigate('/register')}}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-500 text-white py-2 "
                >
                  Get Started
                </motion.button>
              </div>
              )}

             {token&&(
               <div className="border-t border-gray-200 pt-4 flex flex-col gap-4">
               <motion.button
               onClick={()=>{navigate('/user')}}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-500 text-white py-2 "
                >
                  KindRaise Dashboard
                </motion.button>

                <motion.button
                onClick={()=>{
                  localStorage.clear()
                  navigate('/login')
                }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-500 text-white py-2 "
                >
                 Logout
                </motion.button>
              </div>
             )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>

     </>
  )
}

export default Navbar