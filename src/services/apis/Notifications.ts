import { CommonApi } from "../CommonApi"

export const fetchUserNotifications=async(page:number)=>{
    return CommonApi("GET",`/notifications/user?page=${page}`)
}

export const markNotificationAsRead=async(id:string)=>{
    return CommonApi("PUT",`/notifications/read/notification/${id}`);
}

export const markAllUserNotificationAsRead=async()=>{
    return CommonApi("PUT",'/notifications/read/all/notification')
}
export const markAllAdminNotificationAsRead=async()=>{
    return CommonApi("PUT",'/notifications/read/all/notification/admin')
}

export const fetchAdminNotifications=async(page:number)=>{
    return CommonApi("GET",`/notifications/admin?page=${page}`)
}