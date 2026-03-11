import type { AxiosHeaders } from "axios"

export interface CommonApiInterface{
    method:string
    endpoint:string
    data?:Object
    header?:AxiosHeaders
}

export interface ApiResponseInterface{
    message:string,
    status:boolean,
    data?:[]
}

export interface LoginInterface{
    username:string,
    password:string
}


export interface CampaignInterface {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  deadline: string; 
  category_id: string;
  category_title: string;
  status: string;
  user_id: string;
  amount:number
}