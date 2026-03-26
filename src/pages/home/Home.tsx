
import { motion } from "framer-motion"
import { ArrowRight, Verified } from "lucide-react"
import HomeFirst from "./components/HomeFirst"
import HomeTwo from "./components/HomeTwo"
import StatsSection from "./components/StatsCounterSection"


const Home = () => {
  return (
    <div className="bg-[#f4f7f6] h-full">

      {/* HERO SECTION */}
      <div className="mx-auto px-6 lg:px-12 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full text-xs font-semibold">
            <Verified /> TRUSTED BY 10K+ CHARITIES
          </div>

          <h1 className="text-6xl font-extrabold leading-tight text-gray-900">
            Raise Funds.
            <br />
            <span className="text-emerald-500">Change Lives.</span>
          </h1>

          <p className="text-gray-600 max-w-lg text-md">
            Empowering individuals and organizations to create meaningful impact through a modern, transparent donation platform.
            Join thousands of changemakers today.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-emerald-200 transition"
            >
              Start a Campaign <ArrowRight size={18} />
            </motion.button>

            <button className="px-6 py-3 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition">
              Explore Campaigns
            </button>
          </div>

          {/* Reviews */}
          {/* <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-3">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/women/68.jpg" className="w-8 h-8 rounded-full border-2 border-white" />
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">4.9/5</span> from over 2,000+ donor reviews
            </p>
          </div> */}

        </div>

        {/* RIGHT CAMPAIGN CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >

          {/* <img src="/Gemini_Generated_Image_hwj7g4hwj7g4hwj7.png" alt="" /> */}
          <img src="/home.png" className="" alt=""  />

        </motion.div>
      </div>

<StatsSection/>
      <HomeFirst />
      <HomeTwo />
      {/* <HomeThird/> */}

    </div>
  )
}

export default Home