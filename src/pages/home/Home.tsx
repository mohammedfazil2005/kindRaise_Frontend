
import HomeFirst from "./components/HomeFirst"
import HomeTwo from "./components/HomeTwo"
import StatsSection from "./components/StatsCounterSection"


import HomeKindRaiseDetails from "./components/HomeKindRaiseDetails"
import HomeBannerBottom from "./components/HomeBannerBottom"
import HomeMain from "./components/HomeMain"


const Home = () => {

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