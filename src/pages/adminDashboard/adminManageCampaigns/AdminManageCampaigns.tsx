
import AdminManageCampaignHeader from './components/AdminManageCampaignHeader'
import AdminManageCampaignCategories from './components/AdminManageCampaignCategories'
import AdminManageCampaignCards from './components/AdminManageCampaignCards'
import { useState } from 'react'

const AdminManageCampaigns = () => {
  const [status,setStatus]=useState<string>("")
  const [category,setCategory]=useState<string>("")
  const [search,setSearch]=useState<string>("")
  return (
    <div className='space-y-8 mt-10'>
      <AdminManageCampaignHeader setSearch={setSearch} status={status} setStatus={setStatus}/>
      <div className="grid grid-cols-12 gap-8">
        <AdminManageCampaignCategories setCategory={setCategory}/>
        <AdminManageCampaignCards status={status} category={category} search={search}/>
      </div>
    </div>
  )
}

export default AdminManageCampaigns
