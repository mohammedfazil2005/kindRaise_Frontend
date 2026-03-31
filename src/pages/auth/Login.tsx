import { motion } from "framer-motion"
import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { toaster } from "../../services/Toaster"
import { onLogin } from "../../services/apis/AuthApi"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css/bundle";
import "swiper/css/pagination";
import { AuroraBackground } from "../../components/ui/aurora"

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
   <AuroraBackground showRadialGradient={true} animationSpeed={15} className="pointer-events-none">
<div className="min-h-screen flex items-center justify-center pointer-events-auto">

  <div className="w-full max-w-5xl max-h-[600px] grid md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-xl isolate">

    {/* LEFT IMAGE */}
        <div className="hidden md:block relative h-full">

      <Swiper
     modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2000 }}
        loop={true}
        pagination={{
      clickable: true
    }}
        className="h-[550px]"
      >

        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src="https://images.unsplash.com/photo-1494386346843-e12284507169"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-10">
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-3">
                  Empower <span className="text-emerald-500">Change</span>
                </h2>
                <p className="text-sm opacity-90">
                  Support causes that matter and make a real difference.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src="https://images.unsplash.com/photo-1673042872287-a77ef03317a4?q=80&w=808&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-10">
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-3">
                  Make an <span className="text-emerald-500">Impact</span>
                </h2>
                <p className="text-sm opacity-90">
                  Every contribution helps build a better future.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 */}
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src="https://plus.unsplash.com/premium_photo-1661775322183-bf9d38cff431?q=80&w=707&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-10">
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-3">
                  Join the <span className="text-emerald-500">Movement</span>
                </h2>
                <p className="text-sm opacity-90">
                  Together we can create meaningful change.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>

    {/* RIGHT SIDE */}
    <div className=" p-4 flex items-center">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full "
      >

        <img src="/logo.png" alt="logo" className="h-8 mb-2" />

        <h2 className="text-2xl font-bold text-gray-900">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-sm mt-1 mb-6">
          Sign in to continue to your dashboard
        </p>

        <p className="text-gray-600 text-sm mb-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-emerald-600 font-semibold">
            Create one
          </Link>
        </p>

        <form className="space-y-4">

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your username"
            className="w-full px-4 py-2.5 rounded-lg bg-gray-200/60 focus:bg-white border focus:border-emerald-500 outline-none"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            className="w-full px-4 py-2.5 rounded-lg bg-gray-200/60 focus:bg-white border focus:border-emerald-500 outline-none"
          />

          

          <motion.button
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            onClick={onSignInClick}
            className="w-full bg-emerald-500 hover:bg-emerald-700 text-white py-3 rounded-lg"
          >
            {loading ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              "Sign In"
            )}
          </motion.button>

        </form>
      </motion.div>

    </div>
  </div>
</div>
</AuroraBackground>
  )
}

export default Login
