
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/components/Home'
import LayoutWithNavbar from './utils/LayoutWithNavbar'
import Explore from './pages/explore/Explore'
import ViewCampaignDetails from './pages/viewcampaigndetails/ViewCampaignDetails'
import UserDashboard from './pages/userDashboard/UserDashboard'
import UserMainDashboard from './pages/userDashboard/userDashboardComponents/UserMainDashboard'
import UserExploreMain from './pages/userDashboard/userExploreDashboard/UserExploreMain'

function App() {


  return (
    <>
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/viewcampaign/:id" element={<ViewCampaignDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='/user' element={<UserDashboard />}>
          <Route index element={<UserMainDashboard />} />
          <Route path='explore/campaigns' element={<UserExploreMain />} />
        </Route>

      </Routes>


    </>
  )
}

export default App
