import { CommonApi } from "../CommonApi"

export const fetchActiveCampaigns=async()=>{
    return CommonApi("GET","/campaign/active/campaigns");
}