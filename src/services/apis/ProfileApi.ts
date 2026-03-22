import { CommonApi } from "../CommonApi"

export const fetchLoggedUserProfile=async()=>{
   return await CommonApi("GET",'/user/profile');
}

export const fetchProfileById=async(id:string)=>{
   return await CommonApi("GET",`/user/profile/${id}`);
}

export const fetchLoggedInUserProfile=async()=>{
   return await CommonApi("GET",`/user/profile`)
}

export const updateProfile=async(id:string,data:FormData)=>{
   return await CommonApi("PUT",`/user/update/profile/${id}`,data);
}

export const checkPassword=async(id:string,password:string)=>{
   return await CommonApi("POST",`/user/check/password/${id}/${password}`)
}

export const changePassword=async(id:string,password:string)=>{
   return await CommonApi("PUT",`/user/change/password/${id}/${password}`)
}
