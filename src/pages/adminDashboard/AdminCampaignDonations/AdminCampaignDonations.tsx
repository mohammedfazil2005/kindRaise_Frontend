import React from 'react'
import AdminCampaignDonationHeader from './components/AdminCampaignDonationHeader'
import AdminCampaignDonationContent from './components/AdminCampaignDonationContent'
import AdminCampaignDonationCards from './components/AdminCampaignDonationCards'

const AdminCampaignDonations = () => {
  return (
    <div className='space-y-8 mt-10'>
      <AdminCampaignDonationHeader/>
      <AdminCampaignDonationCards/>
      <AdminCampaignDonationContent/>
    </div>
  )
}

export default AdminCampaignDonations
