import { CommonApi } from "../CommonApi"

export const fetchUserDonations=async()=>{
    return await CommonApi("GET","/donation/user");
}

export const fetchUserDonationDashboardStats=async()=>{
    return await CommonApi("GET",'/donation/dashboard/user/stats')
}

export const findAllDonationsAdmin=async(page:number)=>{
    return await CommonApi("GET",`/donation/all?page=${page}`)
}