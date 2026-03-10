import { CommonApi as api } from "./CommonApi"

export const onRegister=async(data:object)=>{
    return api("POST","/register",data,{ "Content-Type": "multipart/form-data" })
}

export const onCheckUsernameAlreadyExists=async(username:string)=>{
    return api("POST",`/checkusername/${username}`);
}