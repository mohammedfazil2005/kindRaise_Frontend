import type { AxiosHeaders } from "axios"

export interface CommonApiInterface{
    method:string
    endpoint:string
    data?:Object
    header?:AxiosHeaders
}