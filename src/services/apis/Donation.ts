import { CommonApi } from "../CommonApi"

export const fetchUserDonations=async()=>{
    return await CommonApi("GET","/donation/user");
}

export const fetchUserDonationDashboardStats=async()=>{
    return await CommonApi("GET",'/donation/dashboard/user/stats')
}

export const findAllDonationsAdmin=async(page:number,search:string)=>{
    return await CommonApi("GET",`/donation/all?page=${page}&search=${search}`)
}

export const fetchAdminDonationDashboardStats=async()=>{
    return await CommonApi("GET","/donation/admin/dashboard/donation/stats")
}

export const fetchAllDonationsInOneCall=async()=>{
    return await CommonApi("GET","/donation/admin/all/once")
}

