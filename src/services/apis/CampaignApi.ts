import { CommonApi } from "../CommonApi"

export const fetchActiveCampaigns=async(search="",category="",status="",page:number,size:number)=>{
    const params=new URLSearchParams();
    if(search){
        params.append("search",search)
       
    }

    if(category){
        params.append("category",category)
       
    }

    if(status){
        params.append("status",status)
       
    }
    if(page){
        params.append("page",page.toString())
       
    }
    if(size){
        params.append("size",size.toString())
       
    }


     const url =  `/campaign/active/campaigns?${params.toString()}`
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

export const fetchUserCampaigns=async(currentPage:number,size:number,userid?:string)=>{
    
    return await CommonApi("GET",`/campaign/user/campaigns?userId=${userid}&currentPage=${currentPage}&sizePerPage=${size}`);
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
export const getTotalNumberOfCampaignsOfUser=async(id:string)=>{
    return await CommonApi("GET",`/campaign/user/totalcampaigns/${id}`);
}