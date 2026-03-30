import { CommonApi } from "../CommonApi"

export const fetchActiveTestimonials=()=>{
    return CommonApi("GET","/testimonial/all/active")
}