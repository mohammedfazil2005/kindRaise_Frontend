
import { motion } from "framer-motion"
import { ArrowRight, Verified } from "lucide-react"
import HomeFirst from "./components/HomeFirst"
import HomeTwo from "./components/HomeTwo"
import StatsSection from "./components/StatsCounterSection"
import { useNavigate } from "react-router-dom"

import HomeKindRaiseDetails from "./components/HomeKindRaiseDetails"
import HomeBannerBottom from "./components/HomeBannerBottom"
import HomeMain from "./components/HomeMain"


const Home = () => {
  const navigate=useNavigate()
  return (
    <div className="bg-[#f4f7f6] ">
          <HomeMain/>
    <StatsSection/>
        <HomeKindRaiseDetails/>
          <HomeFirst />
          <HomeTwo />
          <HomeBannerBottom/>

    </div>
  )
}

export default Home