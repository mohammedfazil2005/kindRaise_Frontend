import { CommonApi } from "../CommonApi"

export const fetchActiveCampaigns=async(search="",category="",status="")=>{
    const params=new URLSearchParams();
    if(search){
        params.append("search",search)
        console.log("Search from api")
    }

    if(category){
        params.append("category",category)
        console.log(category)
    }

    if(status){
        params.append("status",status)
        console.log(status) 
    }


     const url = params.toString() ? `/campaign/active/campaigns?${params.toString()}`:`/campaign/active/campaigns`;
     return await CommonApi("GET",url);
}

export const fetchAllCategories=async()=>{
    return  await CommonApi("GET",'/category/get');
}

export const fetchSingleCampaign=async(id:string)=>{
    return  await CommonApi('GET',`/campaign/user/campaign/${id}`);
}

export const createCampaign=async(formData:FormData)=>{
    return await CommonApi("POST",'/campaign/create',formData);
}

export const fetchUserCampaignDashboardStats=async()=>{
    return await CommonApi("GET",'/campaign/dashboard/user');
}

export const fetchUserCampaigns=async()=>{
    return await CommonApi("GET",'/campaign/user/campaigns');
}

export const updateCampaign=async(id:string,data:FormData)=>{
    return await CommonApi("PUT",`/campaign/update/campaign/${id}`,data);
}

export const updateCampaignStatus=async(status:string,campaign_id:string)=>{
    return await CommonApi("PUT",`/campaign/update/campaign/status/${campaign_id}/${status}`);
}

export const getTotalNumberOfPendingRequests=async()=>{
    return await CommonApi("GET",`/campaign/pending/count`);
}