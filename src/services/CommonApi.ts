import axios, {type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import axiosInstanceConfig from "./AxiosInterceptor";


export const CommonApi=async(method:string,endpoint:string,data?:object,header?:RawAxiosRequestHeaders)=>{
    try {
        const configuration:AxiosRequestConfig={
            method:method,
            url:endpoint,
            data:data,
            headers:header?header:{"Content-Type":"application/json"}

        }
        
        const AxiosConfiguration=await axiosInstanceConfig(configuration);
        const response=AxiosConfiguration.data;

        return response;

    } catch (error) {
        if (axios.isAxiosError(error)) {
           return error.response?.data
        }

      return { message: "Something went wrong",error:error }
    }
}