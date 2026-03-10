
import AdminAnalyticsHeader from './components/AdminAnalyticsHeader'
import AdminAnalyticsStatsCards from './components/AdminAnalyticsStatsCards'
import AdminAnalyticsDonationChart from './components/AdminAnalyticsDonationChart'
import AdminAnalyticsTopCampaigns from './components/AdminAnalyticsTopCampaigns'
import AdminAnalyticsRecentDonations from './components/AdminAnalyticsRecentDonations'

const AdminAnalytics = () => {
    return (
        <div className='space-y-8 mt-10'>
            <AdminAnalyticsHeader />
            <AdminAnalyticsStatsCards />
            <AdminAnalyticsDonationChart />
            <div className="grid md:grid-cols-2 gap-6">
                <AdminAnalyticsTopCampaigns />
                <AdminAnalyticsRecentDonations />
            </div>
        </div>
    )
}

export default AdminAnalytics
