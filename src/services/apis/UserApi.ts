import { CommonApi } from "../CommonApi"

export const fetchAllUsers=async(page:number,search:string,role:string)=>{
    return await CommonApi("GET",`/user/all?page=${page}&search=${search}&role=${role}`,)
}