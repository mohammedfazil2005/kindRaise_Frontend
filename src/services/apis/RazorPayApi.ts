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