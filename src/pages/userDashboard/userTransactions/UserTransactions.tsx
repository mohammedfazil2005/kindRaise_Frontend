
import { useState } from 'react'
import UserTransactionHeader from './components/UserTranansactionHeader';
import UserTransactionContent from './components/UserTransactionContent';


const UserTransactions = () => {
  const [search,setSearch]=useState("");
  const [type,setType]=useState("");
  const [campaignId,setCampaignId]=useState("");
  const [page,setPage]=useState(0)
  return (
     <div className='space-y-8 mt-10'>
      <UserTransactionHeader type={type} setPage={setPage} setSearch={setSearch} setType={setType} setCampaignId={setCampaignId}  campaignId={campaignId}/>
      <UserTransactionContent page={page} setPage={setPage} search={search} type={type} campaignId={campaignId}/>
    </div>
  )
}

export default UserTransactions
