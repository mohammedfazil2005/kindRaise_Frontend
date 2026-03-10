
import type { CommonApiInterface } from "../interfaces/interfaces";
import axios, { type AxiosRequestConfig } from "axios";
import axiosInstance from "./AxiosInterceptor";

export const CommonApi=async({method,endpoint,data,header}:CommonApiInterface)=>{
    try {
        const configuration:AxiosRequestConfig={
            method:method,
            url:endpoint,
            data:data,
            headers:header?header:{"Content-Type":"application/json"}

        }
        const AxiosConfiguration=await axiosInstance(configuration);
        const response=AxiosConfiguration.data;

        return response;

    } catch (error) {
        return error
    }
}