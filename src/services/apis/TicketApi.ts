import { CommonApi } from "../CommonApi"

export const createTicket=async(data:object)=>{
    return await CommonApi("POST",'/ticket/create',data)
}

export const fetchAllTickets=async(currentPage:number)=>{
    return await CommonApi("GET",`/ticket/all?page=${currentPage}`)
}

export const markAsReadTicket=async(id:string)=>{
    return await CommonApi("GET",`/ticket/read/${id}`)
}