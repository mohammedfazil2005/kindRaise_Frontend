
import AdminManageCampaignHeader from './components/AdminManageCampaignHeader'
import AdminManageCampaignCategories from './components/AdminManageCampaignCategories'
import AdminManageCampaignCards from './components/AdminManageCampaignCards'

const AdminManageCampaigns = () => {
  return (
    <div className='space-y-8 mt-10'>
      <AdminManageCampaignHeader />
      <div className="grid grid-cols-12 gap-8">
        <AdminManageCampaignCategories />
        <AdminManageCampaignCards />
      </div>
    </div>
  )
}

export default AdminManageCampaigns
