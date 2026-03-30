
import UserCampaignStats from './components/UserCampaignStats'
import UserCampaignList from './components/UserCampaignList'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

const UserCampaignMain = () => {
  const navigate = useNavigate()
    const location = useLocation();
  const isSubRoute =
      location.pathname.includes("/create") ||
      location.pathname.includes("/viewcampaign") ||
      location.pathname.includes("/editcampaign");
  return (
    <>
    {isSubRoute?<Outlet/>:
   
    <div className="space-y-8 mt-10">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            My Campaigns
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and track your fundraising campaigns
          </p>
        </div>

        <button onClick={() => navigate('/user/my/campaigns/create')} className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition">
           Create Campaign <Plus size={18}/>
        </button>

      </div>

      <UserCampaignStats />
      <UserCampaignList />

    </div>
}
</>
  )
}

export default UserCampaignMain
