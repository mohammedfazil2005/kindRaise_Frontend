
import AdminCampaignRequestHeader from './components/AdminCampaignRequestHeader'
import AdminCampaignRequestContent from './components/AdminCampaignRequestContent'
import { useState } from 'react'

const AdminCampaignRequests = () => {
  const [search,setSearch]=useState<string>("");
  const [page,setPage]=useState(0)
  return (
    <div className='space-y-8 mt-10'>
      <AdminCampaignRequestHeader setPage={setPage} setSearch={setSearch}/>
      <AdminCampaignRequestContent search={search} page={page} setPage={setPage}/>
    </div>
  )
}

export default AdminCampaignRequests
