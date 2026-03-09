
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/components/Home'
import LayoutWithNavbar from './utils/LayoutWithNavbar'
import Explore from './pages/explore/Explore'
import UserDashboard from './pages/userDashboard/UserDashboard'
import UserMainDashboard from './pages/userDashboard/userDashboard/UserMainDashboard'
import UserExploreMain from './pages/userDashboard/userExploreDashboard/UserExploreMain'
import UserDonationMain from './pages/userDashboard/UserDonations/UserDonationMain'
import UserCampaignMain from './pages/userDashboard/userCampaign/UserCampaignMain'
import CreateCampaign from './pages/userDashboard/userCampaign/CreateCampaign'
import UserNotification from './pages/userDashboard/userNotification/UserNotification'
import UserProfile from './pages/userDashboard/userProfile/UserProfile'
import UserViewCampaign from './pages/userDashboard/userViewCampaign/UserViewCampaign'

function App() {


  return (
    <>
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='/user' element={<UserDashboard />}>
          <Route index element={<UserMainDashboard />} />
          <Route path='explore/campaigns' element={<UserExploreMain />} />
          <Route path='donations' element={<UserDonationMain />} />
          <Route path='my/campaigns' element={<UserCampaignMain />} />
          <Route path='create/campaign' element={<CreateCampaign />} />
          <Route path='notifications' element={<UserNotification />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path="viewcampaign/:id" element={<UserViewCampaign />} />
        </Route>

      </Routes>


    </>
  )
}

export default App
