import { CommonApi } from "../CommonApi"

export const createTicket=async(data:object)=>{
    return await CommonApi("POST",'/ticket/create',data)
}