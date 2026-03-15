import { createContext, useState } from "react";
import type { CampaignContextType } from "../interfaces/interfaces";

export const CampaignContext=createContext<CampaignContextType|null>(null);

export const CampaignContextProvider=({children}:any)=>{

    const [searchCampaign,setSearchCampaign]=useState<string>("")
    const [category,setCategory]=useState<string>("")
    const [paymentAdded,setPaymentAdded]=useState<string>("")
    const [campaignCreated,setCampaignCreated]=useState<string>("")
   


    return(
        <CampaignContext.Provider value={{searchCampaign,setSearchCampaign,category,setCategory,paymentAdded,setPaymentAdded,campaignCreated,setCampaignCreated}}>
            {children}
        </CampaignContext.Provider>
    )
}