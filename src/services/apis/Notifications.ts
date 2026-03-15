import { CommonApi } from "../CommonApi"

export const fetchUserNotifications=async(page:number)=>{
    return CommonApi("GET",`/notifications/user?page=${page}`)
}