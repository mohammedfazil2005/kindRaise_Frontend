import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom';
import { fetchProfileById } from '../../../../services/apis/ProfileApi';

import { AdminViewProfileHeaderSkeleton } from '../../../../skeltons/AdminViewProfileSkeltons';
import moment from 'moment';
import { changeStatusOfUserAccount } from '../../../../services/apis/UserApi';
import { toaster } from '../../../../services/Toaster';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const AdminViewProfileHeader = () => {

    const [loader,setLoader]=useState(false);
    const [open,setOpen]=useState(false)
    
    const id=useParams()['id']

    const {data,isLoading,refetch}=useQuery({
        queryKey:["AdminViewProfileHeaderDetails",id],
        queryFn:()=>fetchProfileById(id!),
        enabled:!!id ,
         staleTime:1000*60*10
    })

    const onChangeStatus=async()=>{
        let status;
        if(data?.profile?.status=="ACTIVE"){
            status="DISABLED"
        }else{
            status="ACTIVE"
        }
        setLoader(true)
        try {
            const responce=await changeStatusOfUserAccount(id!,status);
            toaster(responce.message);
            refetch()
        } catch (error) {
            console.log(error);
        }finally{
            setLoader(false);
        }
    }




  return (
    <>
    {isLoading?<AdminViewProfileHeaderSkeleton/>:
    <div>
        <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
    >

    {/* BACKGROUND LAYER */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-transparent dark:from-gray-800 dark:via-gray-900 opacity-80" />

    {/* TOP STRIP */}
    <div className="h-24 bg-gradient-to-r from-emerald-00/20 via-blue-400/20 to-purple-400/20" />

    {/* CONTENT */}
    <div className="relative px-6 pb-6">

        {/* AVATAR + NAME */}
        <div className="flex items-end gap-5 -mt-12">

        {/* Avatar */}
        <div className="relative">
            <img
            onClick={()=>{
              setOpen(true)
            }}
            src={`${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${data?.profile?.id}`}
            alt={data?.profile?.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-md"
            />

            {/* Status Dot */}
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full" />
        </div>

        {/* Name Section */}
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {data?.profile?.fullName}
            </h2>

            <p className="text-sm text-gray-500">@{data?.profile?.username}</p>
        </div>

        </div>

        {/* DETAILS GRID */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">

        <div>
            <p className="text-gray-400 text-xs">Phone</p>
            <p className="text-gray-700 dark:text-gray-200 font-medium">
            +91 {data?.profile?.phone}
            </p>
        </div>

       

        <div>
            <p className="text-gray-400 text-xs">Role</p>
            <p className="text-gray-700 dark:text-gray-200 font-medium">
            {data?.profile?.role=="USER"?"Community Member":"Administrator"}
            </p>
        </div>

        <div>
            <p className="text-gray-400 text-xs">Joined</p>
            <p className="text-gray-700 dark:text-gray-200 font-medium">
            {moment(data?.profile?.createdAt).format("MMMM Do YYYY")}
            </p>
        </div>

        </div>

        {/* STATUS BADGE */}
             <div
      onClick={!loader ? onChangeStatus : undefined}
      className={`mt-5 inline-block ${
        loader
          ? "cursor-not-allowed opacity-60 pointer-events-none"
          : "cursor-pointer"
      }`}
    >
      <span
        className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full 
        transition-all duration-300
        ${
           data?.profile?.status === "ACTIVE"
            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
            : "bg-red-100 text-red-600 dark:bg-red-900/30"
        }
        ${!loader && "hover:scale-105"}
        `}
      >
        {loader ? (
          <>
            <ClipLoader
              size={14}
              color={status === "ACTIVE" ? "#10b981" : "#ef4444"}
              speedMultiplier={0.8}
            />
            <span className="animate-pulse">Updating...</span>
          </>
        ) : (
          <>
            <span
              className={`w-2 h-2 rounded-full ${
                data?.profile?.status === "ACTIVE"
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            ></span>
            { data?.profile?.status}
          </>
        )}
      </span>
    </div>

    </div>
            </motion.div>
    </div>
}
<Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[
            {
              src:
               
                   data?.profile?.id
                  ? `${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${ data?.profile?.id}`
                  : "/addprofilephoto.png",
            },
          ]}
          styles={{
      container: { backgroundColor: "rgba(0,0,0,0.85)" },
      
    }}
    render={{
      buttonPrev: () => null,   // ❌ remove left arrow
      buttonNext: () => null,   // ❌ remove right arrow
    }}
      />
    </>
  )
}

export default AdminViewProfileHeader
