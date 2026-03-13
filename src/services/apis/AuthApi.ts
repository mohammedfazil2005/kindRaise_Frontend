import type { LoginInterface } from "../../interfaces/interfaces";
import { CommonApi as api } from "../CommonApi";

export const onRegister=async(data:FormData)=>{
    return await api("POST","/register",data);
}

export const onCheckUsernameAlreadyExists=async(username:string)=>{
    return await api("POST",`/checkusername/${username}`);
}

export const onLogin=async(data:LoginInterface)=>{
    return await api("POST",'/login',data);
}