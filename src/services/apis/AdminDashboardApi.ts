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