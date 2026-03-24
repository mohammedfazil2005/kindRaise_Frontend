
import { useState } from 'react'
import AdminTransactionContent from './components/AdminTransactionContent'
import AdminTransactionHeader from './components/AdminTransactionHeader'

const AdminTransactions = () => {
  const [search,setSearch]=useState("");
  const [status,setStatus]=useState("");
  const [campaignId,setCampaignId]=useState("");
  return (
     <div className='space-y-8 mt-10'>
      <AdminTransactionHeader setSearch={setSearch} setStatus={setStatus} setCampaignId={setCampaignId} status={status} campaignId={campaignId}/>
      <AdminTransactionContent search={search} status={status} campaignId={campaignId}/>
    </div>
  )
}

export default AdminTransactions
