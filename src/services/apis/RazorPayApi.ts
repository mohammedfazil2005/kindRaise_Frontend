import type { RazorPayInterface } from "../../interfaces/interfaces";
import { CommonApi } from "../CommonApi"

export const createOrder=async(data:object)=>{
    return CommonApi("POST","/razorpay/create",data);
}

export const verifyOrder=async(data:object)=>{
    return CommonApi("POST","/razorpay/verify",data)
}

export const failedOrder=async(data:object)=>{
    return CommonApi("POST","/razorpay/payment-failed",data)
}

export const getRazorPayCreds=async()=>{
    return CommonApi("GET","/gateway/fetch/razorpay");
}

export const validateRazorPayCreds=async()=>{
    return CommonApi("GET","/razorpay/validate-credentials")
}

export const updateRazorPayCreds=async(data:RazorPayInterface)=>{
    return CommonApi("PUT",`/gateway/update/gateway/${data.id}`,data)
}