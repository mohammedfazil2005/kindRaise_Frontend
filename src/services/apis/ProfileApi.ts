import { CommonApi } from "../CommonApi"

export const fetchLoggedUserProfile=async()=>{
   return await CommonApi("GET",'/user/profile');
}

export const fetchProfileById=async(id:string)=>{
   return await CommonApi("GET",`/user/profile/${id}`);
}

