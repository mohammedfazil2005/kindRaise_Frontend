import { CommonApi } from "../CommonApi"

export const userDashboardStats=async()=>{
    return await CommonApi("GET","/user/dashboard/stats")
}

export const userDashboardChart=async()=>{
    return await CommonApi("GET",'/user/dashboard/chart')
}

export const totalMessagesUnRead=async()=>{
    return await CommonApi("GET",'/notifications/count/unread')
}