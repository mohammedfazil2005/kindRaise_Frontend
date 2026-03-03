import { motion } from "framer-motion"
import { useState } from "react"
import { Eye, EyeOff, CheckCircle2, Shield, Verified } from "lucide-react"
import { Link } from "react-router-dom"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f6f9f8]">

      {/* LEFT SECTION */}
     <div className="w-full lg:w-1/1 bg-[#eef5f2] p-10 lg:p-16 flex flex-col justify-between">

  <div>
    <div className="inline-block bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full text-xs font-semibold tracking-wide mb-3">
      JOIN THE COMMUNITY
    </div>

    <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
      Start your journey with KindRaise
    </h1>

    <p className="text-gray-600 max-w-md mb-8">
      Create a premium account to access world-class SaaS tools and grow your impact today.
    </p>

    <div className="space-y-6 mb-10">
      <div className="flex gap-4">
        <Verified className="text-emerald-600 mt-1" size={20} />
        <div>
          <h3 className="font-semibold text-gray-900">Verified Impact</h3>
          <p className="text-sm text-gray-600">
            Join over 10,000+ non-profits raising more.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Shield className="text-emerald-600 mt-1" size={20} />
        <div>
          <h3 className="font-semibold text-gray-900">Bank-Level Security</h3>
          <p className="text-sm text-gray-600">
            Your data and donations are always safe.
          </p>
        </div>
      </div>
    </div>
    </div>

    {/* 🔥 Illustration */}
    <div className="flex justify-center overflow-hidden">
  <motion.img
    src="/registerbanner.png"
    alt="Donation"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.8,
      ease: "easeOut"
    }}
    whileHover={{
      scale: 1.03
    }}
    className="h-[270px] rounded-1xl transition-transform duration-300"
  />
</div>

  </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-10">

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[550px]"
        >

         <img src="/logo.png" alt="logo" className="h-12 w-auto mb-4" />

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>

          <p className="text-gray-600 text-sm mb-8">
            Already have an account?{" "}
            <Link to={'/login'} className="text-emerald-600 font-semibold cursor-pointer">
              Sign in
            </Link>
          </p>

          <form className="space-y-4">

            {/* Interactive Input Component */}
            {/* {["fullName", "username","phone"].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <input
                  type={field === "email" ? "email" :fiel "text"}
                  name={field}
                  
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-4 pt-4 pb-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600">
                  {field === "fullName" ? "Full Name" : "Username"}
                </label>
              </motion.div>
            ))} */}

              <motion.div
                
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay:  0.1 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder=" "
                  className="peer w-full px-4 pt-4 pb-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600">
                  Full Name
                </label>
              </motion.div>

              <motion.div
                
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay:  0.1 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder=" "
                  className="peer w-full px-4 pt-4 pb-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600">
                 Username
                </label>
              </motion.div>

              <motion.div
                
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay:  0.1 }}
                className="relative"
              >
                <input
                  type="tel"
                  placeholder=" "
                  className="peer w-full px-4 pt-4 pb-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600">
                  Phone
                </label>
              </motion.div>

            {/* Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["password", "confirmPassword"].map((field, index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="relative"
                >
                  <input
                    type={
                      field === "password"
                        ? showPassword ? "text" : "password"
                        : showConfirmPassword ? "text" : "password"
                    }
                    name={field}
                    
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full px-4 pt-5 pb-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />

                  <label className="absolute left-4 top-3 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600">
                    {field === "password" ? "Password" : "Confirm Password"}
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      field === "password"
                        ? setShowPassword(!showPassword)
                        : setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-4 text-gray-400"
                  >
                    {(field === "password" ? showPassword : showConfirmPassword)
                      ? <EyeOff size={16} />
                      : <Eye size={16} />}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 accent-emerald-600"
              />
              <span>
                I agree to the{" "}
                <span className="text-emerald-600 font-medium cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-emerald-600 font-medium cursor-pointer">
                  Privacy Policy
                </span>
              </span>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-full transition-all shadow-lg shadow-emerald-200"
            >
              Create Account →
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400 font-medium">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="border border-gray-200 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition">
               <i className="fa-brands fa-google"></i> Google
              </button> 
              <button className="border border-gray-200 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition">
               <i className="fa-brands fa-github"></i> GitHub
              </button>
            </div>

          </form>

        </motion.div>
      </div>
    </div>
  )
}