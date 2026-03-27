
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/Home'
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
import AdminDashboard from './pages/adminDashboard/AdminDashboard'
import AdminHome from './pages/adminDashboard/adminHome/AdminHome'
import AdminManageCampaigns from './pages/adminDashboard/adminManageCampaigns/AdminManageCampaigns'
import AdminCampaignRequests from './pages/adminDashboard/AdminCampaignRequests/AdminCampaignRequests'
import AdminCampaignDonations from './pages/adminDashboard/AdminCampaignDonations/AdminCampaignDonations'
import AdminRazorPaySettings from './pages/adminDashboard/adminRazorPaySettings/AdminRazorPaySettings'
import AdminUsers from './pages/adminDashboard/adminUsers/AdminUsers'
import AdminAnalytics from './pages/adminDashboard/adminAnalytics/AdminAnalytics'
import AdminCreateUser from './pages/adminDashboard/adminCreateUser/AdminCreateUser'
import AdminNotifications from './pages/adminDashboard/adminNotifications/AdminNotifications'
import AdminProfile from './pages/adminDashboard/adminProfile/AdminProfile'
import AdminTransactions from './pages/adminDashboard/adminTransactions/AdminTransactions'
import { Toaster } from 'sonner'
import UserEditCampaign from './pages/userDashboard/userEditCampaign/UserEditCampaign'
import UserOldPassword from './pages/userDashboard/userProfile/UserOldPassword'
import ProtectedRoutes from './utils/ProtectedRoutes'
import AdminViewCampaign from './pages/adminDashboard/AdminViewCampaignPage/AdminViewCampaign'
import AdminCreateCampaign from './pages/adminDashboard/adminCreateCampaign/AdminCreateCampaign'
import AdminViewUserProfile from './pages/adminDashboard/AdminViewUserProfile/AdminViewUserProfile'
import AdminChangePassword from './pages/adminDashboard/adminProfile/AdminChangePassword'
import NotFound from './components/NotFound'
import Chatbot from './components/chatbot/Chatbot'
import ContactUs from './pages/contactus/ContactUs'


function App() {

  const location = useLocation();


  const isAdminRoute = location.pathname.startsWith("/admin");


  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route element={<ProtectedRoutes allowedRoles={["ROLE_USER"]} />}>
          <Route path='/user' element={<UserDashboard />}>
            <Route index element={<UserMainDashboard />} />
            <Route path='explore/campaigns' element={<UserExploreMain />} >
              <Route path="viewcampaign/:id" element={<UserViewCampaign />} />
            </Route>
            <Route path='donations' element={<UserDonationMain />} >
              <Route path="viewcampaign/:id" element={<UserViewCampaign />} />
            </Route>
            <Route path='my/campaigns' element={<UserCampaignMain />} >
              <Route path='create' element={<CreateCampaign />} />
              <Route path="viewcampaign/:id" element={<UserViewCampaign />} />
              <Route path="editcampaign/:id" element={<UserEditCampaign />} />
            </Route>
            <Route path='notifications' element={<UserNotification />} />
            <Route path='profile' element={<UserProfile />}>
              <Route path="change-password/:id" element={<UserOldPassword />} />
            </Route>

          </Route>
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path='/admin' element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path='campaigns' element={<AdminManageCampaigns />}>
              <Route path='createcampaign' element={<AdminCreateCampaign />} />
              <Route path='viewcampaign/:id' element={<AdminViewCampaign />} />
              <Route path='viewuserprofile/:id' element={<AdminViewUserProfile />} />
            </Route>
            <Route path='campaign/requests' element={<AdminCampaignRequests />} />
            <Route path='donations' element={<AdminCampaignDonations />} />
            <Route path='razorpay' element={<AdminRazorPaySettings />} />
            <Route path='users' element={<AdminUsers />}>
              <Route path='viewuserprofile/:id' element={<AdminViewUserProfile />} />
            </Route>
            <Route path='analytics' element={<AdminAnalytics />} />
            <Route path='create/users' element={<AdminCreateUser />} />
            <Route path='notifications' element={<AdminNotifications />} />
            <Route path='profile' element={<AdminProfile />}>
              <Route path="change-password/:id" element={<AdminChangePassword />} />
            </Route>
            <Route path='transactions' element={<AdminTransactions />} />

            <Route path='viewcampaign/:id' element={<AdminViewCampaign />} />


          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Chatbot />}
    </>
  )
}

export default App
