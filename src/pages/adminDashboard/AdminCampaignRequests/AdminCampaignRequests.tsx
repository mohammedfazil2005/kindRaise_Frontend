
import AdminCampaignRequestHeader from './components/AdminCampaignRequestHeader'
import AdminCampaignRequestContent from './components/AdminCampaignRequestContent'
import { useState } from 'react'

const AdminCampaignRequests = () => {
  const [search,setSearch]=useState<string>("");
  return (
    <div className='space-y-8 mt-10'>
      <AdminCampaignRequestHeader setSearch={setSearch}/>
      <AdminCampaignRequestContent search={search}/>
    </div>
  )
}

export default AdminCampaignRequests
