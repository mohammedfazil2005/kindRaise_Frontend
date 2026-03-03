import React, { useState } from "react"
import { HandHeart, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate=useNavigate()

  return (
    <>
    <div className="w-full bg-[#f3f5f4] border-b border-gray-200 sticky top-0 z-50">

      <div className=" mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="h-12"/>
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

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>

     </>
  )
}

export default Navbar