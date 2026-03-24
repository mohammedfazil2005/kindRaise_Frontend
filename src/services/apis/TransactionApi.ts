import { CommonApi } from "../CommonApi"

export const fetchUserTransactions=async(userId:string,currentPage:number,size:number)=>{
    return await CommonApi("GET",`/transaction/user/${userId}?page=${currentPage}&size=${size}`);
}

export const fetchAllTransactionsInOneCall=async(userId:string)=>{
    return await CommonApi("GET",`/transaction/user/all/${userId}`)
}

export const fetchAllTransactionsAdmin=async(currentPage:number,size:number,campaignId="",status="",search="")=>{
    
    return await CommonApi("GET",`/transaction/all?campaignId=${campaignId}&status=${status}&page=${currentPage}&size=${size}&search=${search}`)
}