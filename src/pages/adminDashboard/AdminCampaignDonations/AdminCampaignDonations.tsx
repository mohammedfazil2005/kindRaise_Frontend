
import AdminCampaignDonationHeader from './components/AdminCampaignDonationHeader'
import AdminCampaignDonationContent from './components/AdminCampaignDonationContent'
import AdminCampaignDonationCards from './components/AdminCampaignDonationCards'
import { useState } from 'react'

const AdminCampaignDonations = () => {
    const [search,setSearch]=useState("")
    const [page,setPage]=useState(0)
    return (
        <div className='space-y-8 mt-10'>
            <AdminCampaignDonationHeader setSearch={setSearch} setPage={setPage}/>
            <AdminCampaignDonationCards />
            <AdminCampaignDonationContent search={search} page={page} setPage={setPage}/>
        </div>
    )
}

export default AdminCampaignDonations
