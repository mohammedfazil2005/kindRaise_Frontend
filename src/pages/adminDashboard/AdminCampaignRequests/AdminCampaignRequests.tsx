
import AdminCampaignRequestHeader from './components/AdminCampaignRequestHeader'
import AdminCampaignRequestContent from './components/AdminCampaignRequestContent'
import { useState } from 'react'

const AdminCampaignRequests = () => {
  const [search,setSearch]=useState<string>("");
  const [page,setPage]=useState(0)
  const [changeStatus,setChangeStatus]=useState("")
  return (
    <div className='space-y-8 mt-10'>
      <AdminCampaignRequestHeader setPage={setPage} setSearch={setSearch} changeStatus={changeStatus}/>
      <AdminCampaignRequestContent search={search} page={page} setPage={setPage} setChangeStatus={setChangeStatus}/>
    </div>
  )
}

export default AdminCampaignRequests
