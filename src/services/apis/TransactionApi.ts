import { CommonApi } from "../CommonApi"

export const fetchUserTransactions=async(userId:string,currentPage:number,size:number)=>{
    return await CommonApi("GET",`/transaction/user/${userId}?page=${currentPage}&size=${size}`);
}

export const fetchAllTransactionsInOneCall=async(userId:string)=>{
    return await CommonApi("GET",`/transaction/user/all/${userId}`)
}