
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/components/Home'
import LayoutWithNavbar from './utils/LayoutWithNavbar'
import Explore from './pages/explore/Explore'
import ViewCampaignDetails from './pages/viewcampaigndetails/ViewCampaignDetails'

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

      </Routes>


    </>
  )
}

export default App
