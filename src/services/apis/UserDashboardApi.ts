import { CommonApi } from "../CommonApi"

export const userDashboardStats=async()=>{
    return await CommonApi("GET","/user/dashboard/stats")
}

export const userDashboardChart=async(id?:string)=>{
    let params=new URLSearchParams()
    if(id){
        params.append("id",id);
    }
    return await CommonApi("GET",`/user/dashboard/chart?${params.toString()}`)
}

export const totalMessagesUnRead=async()=>{
    return await CommonApi("GET",'/notifications/count/unread')
}