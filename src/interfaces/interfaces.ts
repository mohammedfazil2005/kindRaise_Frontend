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

export interface CategoryInterface{
    id:string;
    title:string;
    icon:string;
    createdAt:string;    

}


export interface CampaignContextType {
  searchCampaign: string
  category:string
  setSearchCampaign:React.Dispatch<React.SetStateAction<string>>
  setCategory:React.Dispatch<React.SetStateAction<string>>
  setPaymentAdded:React.Dispatch<React.SetStateAction<string>>
  paymentAdded:string
  setCampaignCreated:React.Dispatch<React.SetStateAction<string>>
  campaignCreated:string
  profileUpdated:string
  setProfileUpdated:React.Dispatch<React.SetStateAction<string>>
}

export interface UserDonationType{
    title:string
    description:string
    amount:number
    totalAmount:number
    goalAmount:number
    campaign_id:string
}

export interface UserDonationDashboardStats{
    totalAmountDonated:number
    totalDonations:number
    totalCampaignsDonated:number
}

export interface DonationContextType{
    updated:string,
    setUpdated:React.Dispatch<React.SetStateAction<string>>
}

export interface NotificationInterface{
    id:string
    title:string
    message:string
    readStatus:boolean
    date:string,
    user_id:string
}