import  { useContext, useEffect, useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminNotifications, markAllAdminNotificationAsRead, markNotificationAsRead } from "../../../services/apis/Notifications";
import type { NotificationInterface } from "../../../interfaces/interfaces";
import { NotificationSkeleton } from "../../../skeltons/NotificationSkelton";
import moment from "moment";
import { toaster } from "../../../services/Toaster";
import { ClipLoader } from "react-spinners";
import { AdminDashboardContext } from "../../../contexts/AdminDashboardContext";



const AdminNotifications = () => {



  const [page,setPage]=useState(0)
  const [selectedNotification, setSelectedNotification] = useState<NotificationInterface|null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loader,setLoader]=useState(false)

  const {setNotificationUpdated}=useContext(AdminDashboardContext)!

   const {data:notifications,isLoading,refetch}=useQuery({
    queryKey:['notifications',page],
    queryFn:()=>fetchAdminNotifications(page),
    staleTime:1000*60*10
  })

  useEffect(()=>{
    console.log(notifications)
  },[notifications])

  const markAllRead = async() => {
    setLoader(true)
    try {
      await markAllAdminNotificationAsRead()
      setNotificationUpdated('updated')
      refetch()
    } catch (error) {
      
    }finally{
      setLoader(false)
    }
  };

  const openNotification = async(notification:NotificationInterface) => {
    setSelectedNotification(notification);
    setShowModal(true)
    if(notification.readStatus){
      console.log("Already readed");
      return
    }

    try {
      await markNotificationAsRead(notification.id);
       setNotificationUpdated('updated')
      refetch();
    } catch (error) {
      console.log(error)
      toaster("Something went wrong Please Conact the admin.")
    }


  };

 



  return (
    <div className="mt-10 mx-auto">

      {isLoading?Array(5)
        .fill(0)
        .map((_, i) => <NotificationSkeleton key={i} />):
        notifications?.content.length === 0 ?

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >

          <Bell size={50} className="text-gray-300 mb-4" />

          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            No Notifications Yet
          </h3>

          <p className="text-sm text-gray-500 mt-2 max-w-sm">
            When someone donates to your campaign or updates happen,
            you'll see notifications here.
          </p>

        </motion.div>:
          <>
          {/* Header */}
                <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-between items-start mb-6"
            >

              {/* Left Section */}
              <div className="flex items-start gap-3">

                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Bell className="text-emerald-500" size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Notifications
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                Stay updated with the latest activity and important updates.
                </p>
                </div>

              </div>

              {/* Action Button */}
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={markAllRead} disabled={loader} className="flex items-center justify-center gap-2 text-sm bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-emerald-600 transition disabled:opacity-70">
              {loader ? (
                <ClipLoader size={16} color="#ffffff" />
              ) : (
                "Mark All Read"
              )}
              </motion.button>

            </motion.div>

          {/* Notification List */}
          <div className="space-y-3">

            {notifications?.content.map((notification:NotificationInterface, index:number) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => openNotification(notification)}
                className={`cursor-pointer p-4 rounded-xl border transition
                ${
                  notification.readStatus
                    ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200"
                }`}
              >

                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {notification.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {notification.message}
                    </p>
                  </div>

                  {!notification.readStatus && (
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                  )}

                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {moment(notification.date).fromNow()}
                </p>

              </motion.div>
            ))}

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
                {Array.from({ length: notifications?.totalPages || 0 }).map((_, i) => (
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
                disabled={page + 1 >= notifications?.totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-2 rounded-lg border text-sm
                disabled:opacity-40 text-white
                hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Next
              </motion.button>

              </motion.div>

          </div>

              <AnimatePresence>
        {showModal && selectedNotification && (

        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >

        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ duration: 0.35 }}
          className="bg-white dark:bg-gray-900 w-[500px] rounded-2xl shadow-2xl overflow-hidden"
        >

        {/* Header with Logo */}
        <div className="flex flex-col items-center bg-emerald-500 text-white p-6">

          <img
            src="/logo.png"
            alt="KindRaise Logo"
            className="h-12 mb-2"
          />

          <h3 className="text-lg font-semibold">
            Notification
          </h3>

          <p className="text-xs opacity-90">
            Stay updated with your campaign activity
          </p>

        </div>


        {/* Notification Content */}
        <div className="p-6">

          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            {selectedNotification.title}
          </h4>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {selectedNotification.message}
          </p>

          {/* Date */}
          <div className="flex justify-between items-center">

            <span className="text-xs text-gray-400">
              {moment(selectedNotification.date).format("DD MMM YYYY, hh:mm A")}
            </span>

         
          </div>

        </div>


        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t dark:border-gray-700">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-sm rounded-lg border text-gray-600 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Close
          </motion.button>

        </div>

        </motion.div>

        </motion.div>

        )}
        </AnimatePresence>
          </>
      }

    </div>
  );
};

export default AdminNotifications;