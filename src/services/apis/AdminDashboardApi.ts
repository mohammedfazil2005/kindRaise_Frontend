import { CommonApi } from "../CommonApi"

export const adminDashboardCardStats=async()=>{
    return await CommonApi("GET",'/admin/dashboard/stats')
}

export const adminDashboardRecentCampaigns=async()=>{
    return await CommonApi("GET",'/admin/dashboard/recent/campaigns')
}

export const adminDashboardRecentDonations=async()=>{
    return await CommonApi("GET",'/admin/dashboard/recent/donations')
}

export const adminDashboardRecentUsers=async()=>{
    return await CommonApi("GET",'/admin/dashboard/recent/users')
}

export const adminDashboardAnalyticsStats=async()=>{
    return await CommonApi("GET",'/admin/dashboard/analytics/stats')
}
export const adminDashboardAnalyticsDonationChart=async()=>{
    return await CommonApi("GET",'admin/dashboard/analytics/donations')
}
export const adminDashboardAnalyticsTopRaisedCampaigns=async()=>{
    return await CommonApi("GET",'/admin/dashboard/analytics/top/raised/campaigns')
}
export const adminDashboardAnalyticsRecentDonations=async()=>{
    return await CommonApi("GET",'/admin/dashboard/analytics/recent/donations')
}
