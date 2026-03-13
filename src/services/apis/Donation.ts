import { CommonApi } from "../CommonApi"

export const fetchUserDonations=async()=>{
    return await CommonApi("GET","/donation/user");
}