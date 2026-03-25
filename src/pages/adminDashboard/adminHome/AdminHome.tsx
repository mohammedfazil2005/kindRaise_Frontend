
import AdminStatsCards from './components/AdminStatsCards'
import AdminRecentCampaigns from './components/AdminRecentCampaigns'
import AdminRecentDonations from './components/AdminRecentDonations'
import AdminRecentUsers from './components/AdminRecentUsers'
import AdminDailyDonationChart from './components/AdminDailyDonationChart'

const AdminHome = () => {
  return (
    <div className="space-y-8 mt-10">
      <AdminStatsCards />
      <div className="grid lg:grid-cols-2 gap-8">
        <AdminRecentCampaigns />
        <AdminRecentDonations />
        <AdminRecentUsers />
        <AdminDailyDonationChart/>
      </div>
    </div>
  )
}

export default AdminHome
