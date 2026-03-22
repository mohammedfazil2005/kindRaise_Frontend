
import AdminCampaignDonationHeader from './components/AdminCampaignDonationHeader'
import AdminCampaignDonationContent from './components/AdminCampaignDonationContent'
import AdminCampaignDonationCards from './components/AdminCampaignDonationCards'
import { useState } from 'react'

const AdminCampaignDonations = () => {
    const [search,setSearch]=useState("")
    return (
        <div className='space-y-8 mt-10'>
            <AdminCampaignDonationHeader setSearch={setSearch} />
            <AdminCampaignDonationCards />
            <AdminCampaignDonationContent search={search}/>
        </div>
    )
}

export default AdminCampaignDonations
