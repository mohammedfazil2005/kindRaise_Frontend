import { useQuery } from '@tanstack/react-query';


import {  useContext, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleCampaign, updateCampaignStatus } from '../../../services/apis/CampaignApi';
import moment from 'moment';
import { CheckCircle, Hourglass, Pencil, Users, XCircle, Check } from 'lucide-react';
import {CampaignDetailsSkeleton} from '../../../skeltons/CampaignSkeltons';
import { fetchProfileById } from '../../../services/apis/ProfileApi';

import { motion } from 'framer-motion';
import { toaster } from '../../../services/Toaster';
import { ClipLoader } from 'react-spinners';
import { CampaignContext } from '../../../contexts/CampainContext';



const AdminViewCampaign = () => {
    
    const [approveLoader,setApproveLoader]=useState(false);
    const [rejectLoader,setRejectLoader]=useState(false);
    const [completeLoader,setCompleteLoader]=useState(false);

    const {setCampaignCreated}=useContext(CampaignContext)!
    

    const adminStatusMessages :any= {
    PENDING: "Review this campaign submission and either approve or reject it.",
    ACTIVE: "This campaign is live. You can monitor or mark it as completed.",
    COMPLETED: "This campaign has been successfully completed and closed.",
    REJECTED: "This campaign has been rejected and is no longer visible to users."
    };
     
    const id=useParams()['id']!

    const navigate=useNavigate();
    

    const {data:campaign,isLoading,refetch}=useQuery({
        queryKey:['campaign',id],
        queryFn:()=>fetchSingleCampaign(id),
        enabled:!!id
     })

     

     const {data:profileData,isLoading:isProfileLoading}=useQuery({
      queryKey:['profile'],
      queryFn:()=>fetchProfileById(campaign?.user_id),
      enabled:!!campaign
     })

    

     const getProfileDescription = () => {
        const donations = profileData?.totalDonations || 0;
        const campaigns = profileData?.totalCampaignsActive || 0;
        const amount = profileData?.totalAmountDonated || 0;

        if (profileData?.role === "ADMIN") {
            return `Managing ${campaigns} active campaigns and ensuring platform quality.`;
        }

        // USER logic
        if (donations === 0) {
            return "New member of the community. Start supporting campaigns today!";
        }

        if (donations < 5) {
            return `Contributed ₹${amount.toLocaleString("en-IN")} across ${donations} donations.`;
        }

        if (donations >= 5 && donations < 20) {
           return `Actively supporting with ₹${amount.toLocaleString("en-IN")} across ${donations} donations.`;
        }

        return `Top contributor! Donated ₹${amount.toLocaleString("en-IN")} in ${donations} contributions and supporting ${campaigns} campaigns.`;
    };

    const onChangeStatusOfCampaign=async(status:string)=>{
            if(status=="ACTIVE"){
                setApproveLoader(true)
            }
            if(status=="REJECTED"){
                setRejectLoader(true)
            }
            if(status=="COMPLETED"){
                setCompleteLoader(true)
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
                setCompleteLoader(false)
            }
    }

    

     useEffect(()=>{
      console.log(profileData)
     },[profileData])

     useEffect(()=>{
      console.log(campaign)
     },[campaign])


  return (
    <>
    {isLoading||isProfileLoading?<CampaignDetailsSkeleton/>:
       <section className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">

    
        <div className="lg:col-span-2 space-y-10">

      {/* Hero Image */}
     
        <div className="relative rounded-3xl overflow-hidden group">

        <img
            src={
  profileData?.profile?.id
    ? `${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${profileData.profile.id}`
    : "/unknownphoto.avif"
}
            alt="campaign"
            className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        {/* Category */}
        <span className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800 text-xs font-semibold px-4 py-1 rounded-full text-emerald-600">
            {campaign?.category_title}
        </span>

        {/* ================= EDIT ICON ================= */}
        <button
            onClick={()=>navigate(`/admin/campaigns/createcampaign?id=${id}`)}
            className="absolute top-6 right-6 p-2 rounded-full 
            bg-white/90 dark:bg-gray-800 text-gray-800 dark:text-white 
            shadow-md hover:scale-110 hover:bg-white transition-all duration-300"
        >
            <Pencil size={18} />
        </button>

        </div>

      {/* Title */}
      <div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
        {campaign?.title}
        </h1>

        <div className="flex items-center gap-4 mt-6">

          <img
            src={import.meta.env.VITE_KINDRAISE_API_URL+`/user/profile/image/${profileData.profile.id}`}
            alt="org"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {profileData?.profile?.fullName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            {profileData?.profile?.role === "USER" ? "Community Member" : "Platform Administrator"}
            </p>
          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border dark:border-gray-700">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{campaign?.amount.toLocaleString("en-IN")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Raised of ₹{campaign?.goalAmount?.toLocaleString("en-In")} goal
            </p>
          </div>

          <div className="text-emerald-600 font-semibold text-lg">
            {((campaign?.amount / campaign?.goalAmount) * 100).toFixed(1)}% Funded
          </div>

        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mt-6 overflow-hidden">
          <div className="bg-emerald-500 h-3 rounded-full" style={{ width: `${(campaign.amount / campaign.goalAmount) * 100}%` }}></div>
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
  
        <span className="flex items-center gap-2">
          <Users size={18} className="text-blue-500" />
          {campaign?.totalDonors} {campaign?.totalDonors==1?"Donor":"Donors"}
        </span>

        <span className="flex items-center gap-2">
          <Hourglass size={18} className="text-orange-500" />
          {moment(campaign.deadline).diff(moment(), "days")} Days Left
        </span>

        </div>

      </div>

      {/* About Campaign */}
      <div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          About this campaign
        </h2>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {campaign?.description}
        </p>

        
      </div>

    </div>

    {/* RIGHT SIDEBAR */}
    <div className="space-y-8 sticky top-24 h-fit">

       <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">

        {profileData?.profile?.role!="ADMIN"&&(
            <>
               {/* Profile Header */}
            <div className="flex items-center gap-4">

                <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
                      src={
          profileData?.profile?.id
            ? `${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${profileData.profile.id}`
            : "/unknownphoto.avif"
        }
                alt="profile"
                />

                <div>
                <h4 className="font-semibold text-lg leading-tight">
                    {profileData?.profile?.fullName}
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{profileData?.profile?.fullName}
                </p>
                </div>

            </div>

            {/* Role Badge */}
            <div className="mt-3">
                <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                    profileData?.profile?.role === "ADMIN"
                    ? "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                    : "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                }`}
                >
                {profileData?.profile?.role === "USER"
                    ? "Community Member"
                    : "Administrator"}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
               {getProfileDescription()}
            </p>

            {/* Stats */}
            <div className="flex justify-between mt-2 text-center">

                <div>
                <p className="text-lg font-semibold">{profileData?.totalDonations.toLocaleString("en-IN")}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Donations</p>
                </div>

                <div>
                <p className="text-lg font-semibold">{profileData?.totalCampaignsActive?.toLocaleString("en-IN")}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Campaigns</p>
                </div>

                <div>
                <p className="text-lg font-semibold">₹{profileData?.totalAmountDonated?.toLocaleString("en-IN")}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Contributed</p>
                </div>

            </div>

            {/* Button */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={() =>navigate(`/admin/campaigns/viewuserprofile/${profileData?.profile?.id}`)}
                className="mt-6 w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
                View Profile
            </motion.button>
            </>
        )}

        {profileData.profile.role=="ADMIN"&&(
             <div className="flex items-center gap-4">

    <motion.img
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
      src={`${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${profileData?.profile?.id}`}
      alt="profile"
    />

    <div>
      <h4 className="font-semibold text-lg leading-tight">
        {profileData?.profile?.fullName || "User"}
      </h4>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        @{profileData?.profile?.username || "username"}
      </p>
    </div>

  </div>
        )}
        </div>
           <motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-200/60 dark:border-gray-700/60 space-y-4"
>

  {/* Header */}
  <div className="flex items-center justify-between">
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
      Campaign Actions
    </h4>

    {/* Status Badge */}
    <span className={`text-xs px-3 py-1 rounded-full font-medium
      ${
        campaign.status === "PENDING"
          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
          : campaign.status === "ACTIVE"
          ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
          : campaign.status === "COMPLETED"
          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
          : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
      }`}
    >
      {campaign.status}
    </span>
  </div>

  {/* Description */}
  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
    {adminStatusMessages[campaign.status] || "No status information available."}
  </p>

  {/* Divider */}
  <div className="border-t border-gray-200 dark:border-gray-700"></div>

  {/* ================= ACTION BUTTONS ================= */}

  {campaign.status === "PENDING" && (
    <div className="flex gap-3">

      <motion.button
        onClick={() => onChangeStatusOfCampaign("ACTIVE")}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 font-semibold text-white shadow-md
        bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-700"
      >
        {approveLoader?<ClipLoader size={18}/>:
        <>
        <Check size={16} />
        Approve
        </>
        }
      </motion.button>

      <motion.button
        onClick={() => onChangeStatusOfCampaign("REJECTED")}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 font-semibold text-white shadow-md
        bg-gradient-to-r from-red-500 via-red-400 to-red-700"
      >
        {rejectLoader?<ClipLoader size={18}/>:<>
        <XCircle size={16} />
        Reject
        </>}
      </motion.button>

    </div>
  )}

  {campaign.status === "ACTIVE" && (
    <motion.button
      onClick={() => onChangeStatusOfCampaign("COMPLETED")}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow-md
      bg-gradient-to-r from-blue-500 via-blue-400 to-blue-700"
    >
      {completeLoader?<ClipLoader size={18}/>:<>
      <CheckCircle size={18} />
      Mark as Completed
      </>}
    </motion.button>
  )}

  {/* ================= STATUS FEEDBACK ================= */}

  {campaign.status === "COMPLETED" && (
    <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 flex items-start gap-3">
      <CheckCircle className="text-emerald-500 w-5 h-5 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          Campaign Completed
        </p>
        <p className="text-xs text-emerald-500 dark:text-emerald-300">
          This campaign has been successfully closed.
        </p>
      </div>
    </div>
  )}

  {campaign.status === "REJECTED" && (
    <div className="p-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-500/10 flex items-start gap-3">
      <XCircle className="text-red-500 w-5 h-5 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-red-600 dark:text-red-400">
          Campaign Rejected
        </p>
        <p className="text-xs text-red-500 dark:text-red-300">
          This campaign was not approved and is no longer active.
        </p>
      </div>
    </div>
  )}

</motion.div>

        </div>

    </div>
    </section>
    }
    </>
  )
}

export default AdminViewCampaign
