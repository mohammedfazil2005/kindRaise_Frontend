import { CommonApi } from "../CommonApi"

export const fetchActiveCampaigns=async(search="",category="")=>{
    const params=new URLSearchParams();
    if(search){
        params.append("search",search)
        console.log("Search from api")
    }

    if(category){
        params.append("category",category)
        console.log(category)
    }


     const url = params.toString() ? `/campaign/active/campaigns?${params.toString()}`:`/campaign/active/campaigns`;
     return CommonApi("GET",url);
}

export const fetchAllCategories=async()=>{
    return CommonApi("GET",'/category/get');
}

export const fetchSingleCampaign=async(id:string)=>{
    return CommonApi('GET',`/campaign/user/campaign/${id}`);
}