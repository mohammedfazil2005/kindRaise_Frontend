
import { useState } from 'react'
import AdminTransactionContent from './components/AdminTransactionContent'
import AdminTransactionHeader from './components/AdminTransactionHeader'

const AdminTransactions = () => {
  const [search,setSearch]=useState("");
  const [status,setStatus]=useState("");
  const [campaignId,setCampaignId]=useState("");
  const [page,setPage]=useState(0)
  return (
     <div className='space-y-8 mt-10'>
      <AdminTransactionHeader setPage={setPage} setSearch={setSearch} setStatus={setStatus} setCampaignId={setCampaignId} status={status} campaignId={campaignId}/>
      <AdminTransactionContent page={page} setPage={setPage} search={search} status={status} campaignId={campaignId}/>
    </div>
  )
}

export default AdminTransactions
