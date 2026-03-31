import { useContext, useState } from "react";

import { motion,AnimatePresence } from "framer-motion";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { changeStatusOfTestimonial, fetchAllTestimonials } from '../../../../services/apis/TestimonialApi'
import { TestimonialSkeletonCard } from '../../../../skeltons/AdminViewProfileSkeltons'
import type { TestimonialInterface } from "../../../../interfaces/interfaces";
import { toaster } from "../../../../services/Toaster";
import { ClipLoader } from "react-spinners";
import { AdminDashboardContext } from "../../../../contexts/AdminDashboardContext";



const AdminTestimonialContent = () => {
    const [selectedTestimonial,setSelectedTestimonial]=useState<any>(null)
    const [showModal,setShowModal]=useState(false)
    const [loader,setLoader]=useState({userId:"",status:false})
    const [page,setPage]=useState(0)
        const {testimonialUpdate,setTestimonialUpdate}=useContext(AdminDashboardContext)!
    const {data,isLoading,refetch}=useQuery({
        queryKey:["AdminTestimonialContent",testimonialUpdate,page],
        queryFn:()=>fetchAllTestimonials(page)
    })



    const onChangeStatus=async(id:string,status:boolean)=>{
        setLoader(prev => ({ ...prev, userId: id, status: true }))
        try {
            const response=await changeStatusOfTestimonial(id,status);
            toaster(response.message)
            setTestimonialUpdate("updated")
        } catch (error) {
            toaster("Something went wrong. please contact the kindRaise Admin.")
            console.log(error)
        }finally{
            refetch()
         setLoader(prev => ({ ...prev, userId: "", status: false }))
        }
    }




  return (
    <>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <TestimonialSkeletonCard key={i} />
                ))
                : data?.content?.map((item: TestimonialInterface, index: number) => (
                    <motion.div
            key={item.id}
            onClick={() => {
                setSelectedTestimonial(item);
                setShowModal(true);
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl cursor-pointer"
            >
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 opacity-70 group-hover:opacity-100 transition" />

            {/* Card */}
            <div className="
                relative rounded-2xl p-4 h-full
                bg-white/80 dark:bg-gray-900/70
                backdrop-blur-xl
                border border-gray-200 dark:border-gray-700
                shadow-sm group-hover:shadow-xl
                transition-all duration-300 flex flex-col justify-between
            ">

        {/* TOP SECTION */}
        <div>

      {/* Avatar + Info */}
      <div className="flex items-center gap-3">

        <div className="relative shrink-0">
          <img
            src={
              item?.user_id
                ? `${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${item.user_id}`
                : `${import.meta.env.VITE_KINDRAISE_API_URL}/testimonial/image/${item.id}`
            }
            className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-500/30"
            alt=""
          />

          {/* status dot */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900" />
        </div>

        {/* Name + Role */}
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
            {item.name}
          </h4>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.role || "Supporter"} · {item.company || "KindRaise"}
          </p>

          {/* ⭐ Rating */}
          <div className="flex gap-[2px] mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < item.rating
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-gray-200 dark:bg-gray-700" />

      {/* MESSAGE */}
      <div className="relative">
        <span className="absolute -top-2 left-0 text-4xl text-gray-200 dark:text-gray-700 font-serif">
          “
        </span>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-4 line-clamp-4">
          {item.message.length > 140
            ? item.message.slice(0, 140) + "..."
            : item.message}
        </p>
      </div>
    </div>

    {/* BOTTOM SECTION */}
    <div className="flex justify-between items-center mt-4">

      {/* Status */}
      <span
        className={`text-[10px] px-2 py-1 rounded-full font-medium ${
          item.status
            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
            : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
        }`}
      >
        {item.status ? "Active" : "Disabled"}
      </span>

      {/* Button */}
                <motion.button
            onClick={(e) => {
                e.stopPropagation();
                onChangeStatus(item.id, !item.status);
            }}
            disabled={loader.status}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`
                px-3 py-1.5 text-xs font-medium rounded-full
                backdrop-blur-md border transition-all duration-300
                flex items-center gap-1.5
                ${
                item.status
                    ? "bg-red-500/10 text-red-500 border-red-200 dark:border-red-800 hover:bg-red-500/20"
                    : "bg-emerald-500/10 text-emerald-500 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-500/20"
                }
            `}
            >
            {loader.userId === item.id && loader.status ? (
                <ClipLoader size={12} color="currentColor" />
            ) : (
                <>
                <span className="text-[10px]">
                {item.status ? "Disable Testimonial" : "Activate Testimonial"}
                </span>
                </>
            )}
            </motion.button>
    </div>
  </div>
</motion.div>
      ))}
     
        
       <AnimatePresence>
        {showModal && selectedTestimonial && (
            <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent blur-2xl opacity-40" />

                {/* Card */}
                <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl dark:border  dark:border-gray-700 shadow-2xl rounded-2xl">

                {/* Header */}
                <div className="flex flex-col items-center text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6">
                    <img src="/logo.png" alt="KindRaise Logo" className="h-12 mb-2 drop-shadow-md" />

                    <h3 className="text-lg font-semibold tracking-wide">
                    Testimonial Details
                    </h3>

                    <p className="text-xs opacity-90">
                    What users say about KindRaise
                    </p>
                </div>

        
              <div className="p-5">
  
        <div className="
          relative p-1 rounded-2xl
          b
        ">

          {/* TOP */}
          <div className="flex items-center gap-3">

            {/* Avatar */}
            <div className="relative">
              <img
                src={
                  selectedTestimonial?.user_id
                    ? `${import.meta.env.VITE_KINDRAISE_API_URL}/user/profile/image/${selectedTestimonial.user_id}`
                    : `${import.meta.env.VITE_KINDRAISE_API_URL}/testimonial/image/${selectedTestimonial.id}`
                }
                className="h-14 w-14 rounded-full object-cover ring-2 ring-emerald-500/30"
                alt=""
              />

              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                {selectedTestimonial.name}
              </h4>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedTestimonial.role || "Supporter"} ·{" "}
                {selectedTestimonial.company || "KindRaise"}
              </p>

              {/* ⭐ Rating */}
              <div className="flex gap-[2px] mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < selectedTestimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gray-200 dark:bg-gray-700" />

          {/* MESSAGE */}
          <div className="relative">
            <span className="absolute -top-3 left-0 text-5xl text-gray-200 dark:text-gray-700 font-serif">
              “
            </span>

            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed pl-6">
              {selectedTestimonial.message}
            </p>
          </div>

          {/* Bottom Row */}
          <div className="mt-5 flex justify-between items-center">

            {/* Date */}
            <span className="text-xs text-gray-400">
              {moment(selectedTestimonial.date).format("DD MMM YYYY, hh:mm A")}
            </span>

            {/* Status */}
            <span
              className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                selectedTestimonial.status
                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                  : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
              }`}
            >
              {selectedTestimonial.status ? "Active" : "Disabled"}
            </span>
          </div>

        </div>
      </div>

                {/* Footer */}
                <div className="flex justify-end items-center p-4 border-t dark:border-gray-700">

                    {/* Close */}
                   <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="
                        px-4 py-2 text-sm font-medium rounded-xl
                        border border-gray-300 dark:border-gray-600
                        text-gray-700 dark:text-gray-200
                        bg-white/70 dark:bg-gray-800/70
                        backdrop-blur-md
                        shadow-sm hover:shadow-md
                        hover:bg-gray-100 dark:hover:bg-gray-700
                        transition-all duration-300 ease-in-out
                    "
                    >
                    Close
                    </motion.button>
                </div>
                </div>
            </motion.div>
            </motion.div>
            )}
    </AnimatePresence>
</div>

 {data?.totalPages>1&&(
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={page === 0}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-3 py-2 rounded-lg border text-sm text-black dark:text-white
                    disabled:opacity-40
                    hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Prev
                  </motion.button>

                {/* Page Numbers */}
                {Array.from({ length: data?.totalPages || 0 }).map((_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: page === i ? 1.2 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setPage(i)}
                    className={`px-3 py-2 rounded-lg text-sm border transition text-black dark:text-white
                    ${
                      page === i
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {i + 1}
                  </motion.button>
                ))}

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                disabled={page + 1 >= data?.totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-2 rounded-lg border text-sm
                disabled:opacity-40 text-white
                hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Next
              </motion.button>

              </motion.div>
      )}
      
    </>
  );
};

export default AdminTestimonialContent;