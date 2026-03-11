import type { LoginInterface } from "../../interfaces/interfaces";
import { CommonApi as api } from "../CommonApi";

export const onRegister=async(data:FormData)=>{
    return api("POST","/register",data);
}

export const onCheckUsernameAlreadyExists=async(username:string)=>{
    return api("POST",`/checkusername/${username}`);
}

export const onLogin=async(data:LoginInterface)=>{
    return api("POST",'/login',data);
}