import { CommonApi } from "../CommonApi"

export const fetchProfile=async()=>{
   return await CommonApi("GET",'/user/profile');
}

export const fetchProfilePicture=async(id:string)=>{
    return await CommonApi("GET",`/user/profile/${id}`)
}