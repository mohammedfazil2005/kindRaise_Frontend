import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { toaster } from "../../services/Toaster"
import { onLogin } from "../../services/apis/AuthApi"

const Login = () => {

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const navigate = useNavigate()


  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSignInClick = async (e: any) => {
    e.preventDefault();
    if (!checkFormFields()) {
      toaster("Please fill out all required fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await onLogin(formData);
      if (response.status == false) {
        toaster(response.message)
        return;
      }
      localStorage.clear();
      console.log(response);
      toaster(response.message)
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("role", response.role[0].authority);
      localStorage.setItem("name", response.name);
      if (response.role[0].authority == "ROLE_USER") {
        navigate("/user");
      } else if (response.role[0].authority == "ROLE_ADMIN") {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      toaster("Something went wrong. Please contact the admin of KindRaise.");
    } finally {
      setFormData({ ...formData, username: "", password: "" });
      setLoading(false);
    }

  }

  const checkFormFields = () => {
    if (formData.username && formData.password) return true;
    return false;
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-6">

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[620px] bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >

        {/* LOGO */}
        <img src="/logo.png" alt="logo" className="h-12 w-auto mb-4" />

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-sm mt-1 mb-6">
          Sign in to continue to your dashboard
        </p>

        {/* REGISTER LINK */}
        <p className="text-gray-600 text-sm mb-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-semibold hover:text-emerald-700 transition"
          >
            Create one
          </Link>
        </p>

        {/* FORM */}
        <form className="space-y-4">

          {/* USERNAME */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full px-4 pt-5 pb-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />

            <label className="absolute left-4 text-gray-500 text-xs transition-all  peer-placeholder-shown:top-4  peer-placeholder-shown:text-sm peer-not-placeholder-shown:top-2  peer-not-placeholder-shown:text-xs  peer-focus:top-2  peer-focus:text-xs  peer-focus:text-emerald-600">
              Username
            </label>
          </motion.div>

          {/* PASSWORD */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full px-4 pt-5 pb-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />

            <label className="absolute left-4 text-gray-500 text-xs transition-all  peer-placeholder-shown:top-4  peer-placeholder-shown:text-sm peer-not-placeholder-shown:top-2  peer-not-placeholder-shown:text-xs  peer-focus:top-2  peer-focus:text-xs  peer-focus:text-emerald-600">
              Password
            </label>
          </motion.div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end text-sm">
            <Link
              to="/forgot-password"
              className="text-emerald-600 hover:text-emerald-700"
            >
              Forgot Password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <div className="w-full flex flex-col gap-3 mt-2">

            <motion.button
              disabled={loading}
              whileHover={!loading ? { scale: 1.03 } : {}}
              whileTap={{ scale: 0.97 }}
              onClick={onSignInClick}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-full flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <ClipLoader size={20} color="#ffffff" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>

          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-gray-400 text-sm"></span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          {/* <button
            type="button"
            className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="h-5"
            />
            Continue with Google
          </button> */}

        </form>
      </motion.div>

    </div>
  )
}

export default Login
