import { CommonApi } from "../CommonApi"

export const fetchActiveTestimonials=()=>{
    return CommonApi("GET","/testimonial/all/active")
}

export const fetchAllTestimonials=()=>{
    return CommonApi("GET","/testimonial/all")
}

export const changeStatusOfTestimonial=(id:string,status:boolean)=>{
    return CommonApi("PUT",`/testimonial/update/status/${id}/${status}`)
}

export const createTestimonial=(data:FormData)=>{
    return CommonApi("POST",`/testimonial/create`,data)
}