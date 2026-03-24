import { CommonApi } from "../CommonApi"

export const fetchAllUsers=async(page:number,search:string,role:string)=>{
    return await CommonApi("GET",`/user/all?page=${page}&search=${search}&role=${role}`,)
}

export const changeStatusOfUserAccount=async(userId:string,status:string)=>{
    return await CommonApi("PUT",`/user/updatestatus/${userId}/${status}`,)
}

export const createUser=async(formData:FormData)=>{
    return await CommonApi("POST",'/admin/create/user',formData);
}