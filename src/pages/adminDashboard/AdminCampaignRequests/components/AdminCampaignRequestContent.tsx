
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { fetchActiveCampaigns, updateCampaignStatus } from "../../../../services/apis/CampaignApi";
import { useQuery } from "@tanstack/react-query";
import { AdminCampaignRequestCardSkeleton } from "../../../../skeltons/AdminDashboardSkeltons";
import type { CampaignInterface } from "../../../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toaster } from "../../../../services/Toaster";
import { CampaignContext } from "../../../../contexts/CampainContext";
import { ClipLoader } from "react-spinners";


type searchAdminCampaignRequestType={
  search:string
}

const AdminCampaignRequestContent = ({search}:searchAdminCampaignRequestType) => {

   const [approveLoader,setApproveLoader]=useState(false);
   const [rejectLoader,setRejectLoader]=useState(false);

   const {setCampaignCreated}=useContext(CampaignContext)!

  const navigate=useNavigate();

    const {data:campaigns,isLoading:isCampaignLoading,refetch}=useQuery({
        queryKey:["ManageCampaingRequestSearch",search],
        queryFn:()=>fetchActiveCampaigns(search,"","PENDING"),
        staleTime:1000*60*10
    })

    

    useEffect(()=>{
      console.log(search)
    },[search])


  const onChangeStatusOfCampaign=async(id:string,status:string)=>{
         if(status=="ACTIVE"){
            setApproveLoader(true)
        }
        if(status=="REJECTED"){
            setRejectLoader(true)
        }
       
        try {
            const apiResponse=await updateCampaignStatus(status,id!);
            toaster(apiResponse.message);
            setCampaignCreated("updatedStatus")
            refetch()
            
        } catch (error) {
            toaster("Somthing went wrong. please contact KindRaise Admin");
            console.log(error)
        }finally{
            setApproveLoader(false)
            setRejectLoader(false)
           
        }
  }

  return (
    <div className="mt-8 space-y-5">

      {isCampaignLoading?Array.from({length:4}).map((_,_1)=>(
        <AdminCampaignRequestCardSkeleton/>
      )):campaigns.length==0?
            <div className="text-center py-16">

          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            No Requests Found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            There are no campaign requests at the moment.
          </p>

        </div>
      :
      campaigns.map((item:CampaignInterface, index:number) => (

        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -2 }}
          className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-2xl
          p-5
          shadow-sm hover:shadow-lg
          transition
          flex gap-5 items-center
          "
        >

          {/* Campaign Image */}
          <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">

            <img
              src={import.meta.env.VITE_KINDRAISE_API_URL+`/campaign/image/campaign/${item.id}`}
              alt={item.title}
              className="w-full h-full object-cover"
            />

          </div>

          {/* Campaign Info */}
          <div className="flex-1">

            <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500">
              Creator: {item.creatorName}
            </p>

            <div className="flex gap-6 text-xs text-gray-400 mt-1">
              <span>Category: {item.category_title}</span>
              <span>Goal: {item?.goalAmount?.toLocaleString("en-IN")}</span>
            </div>

          </div>

          {/* Actions */}
          <div className="flex gap-2">

            <motion.button
            onClick={() => navigate(`/admin/viewcampaign/${item.id}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Eye size={14} />
              View
            </motion.button>

            <motion.button
            onClick={()=>onChangeStatusOfCampaign(item.id,"ACTIVE")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
            {approveLoader?<ClipLoader size={14}/>:<>
              <CheckCircle size={14} />
              Approve
            </>}
            </motion.button>

            <motion.button
             onClick={()=>onChangeStatusOfCampaign(item.id,"REJECTED")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              {rejectLoader?<ClipLoader size={14}/>:<>
               <XCircle size={14} />
              Reject
              </>
              }
             
            </motion.button>

          </div>

        </motion.div>

      ))}

    </div>
  );
};

export default AdminCampaignRequestContent;