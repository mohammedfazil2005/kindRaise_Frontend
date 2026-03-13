import { createContext, useEffect, useState } from "react";
import type { CampaignContextType } from "../interfaces/interfaces";

export const CampaignContext=createContext<CampaignContextType|null>(null);

export const CampaignContextProvider=({children}:any)=>{

    const [searchCampaign,setSearchCampaign]=useState<string>("")
    const [category,setCategory]=useState<string>("")
    const [paymentAdded,setPaymentAdded]=useState<string>("")

   


    return(
        <CampaignContext.Provider value={{searchCampaign,setSearchCampaign,category,setCategory,paymentAdded,setPaymentAdded}}>
            {children}
        </CampaignContext.Provider>
    )
}