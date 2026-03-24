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
  creatorName:string;
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

export interface AdminDashboardContextType {
    user:string
  setUser:React.Dispatch<React.SetStateAction<string>>
}

export interface UserDonationType{
    id:string
    title:string
    description:string
    amount:number
    totalAmount:number
    goalAmount:number
    campaign_id:string
    fullName:string
    user_id:string
    donationDate:string
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

export interface UserInterface{
    id:string
    fullName:string
    username:string
    role:string
    phone:string
    createdAt:string
    status:string
}




// Header
export type AdminCampaignHeaderProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setStatus: React.Dispatch<React.SetStateAction<string>>
  status:string
}

// Categories
export type AdminCampaignCategoryProps = {
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

// Cards
export type AdminCampaignCardsProps = {
  search: string
  category: string
  status: string
}



export interface TransactionInterface{
    id: string
    amount:number
    transactionStatus:string 
    PaymentReference: string
    transactionDate: string
    campaign_id:string
    campaign_name:string 
    user_id: string
    user_name: string
    method:string
}

export interface RazorPayInterface{
    id:string,
    name:string,
    apiKey:string,
    secretKey:string,
    mode:string,
    active:boolean
}