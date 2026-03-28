import  { useState } from "react";
import { Mail, Phone, Ticket, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTickets, markAsReadTicket } from "../../../../services/apis/TicketApi";
import { NotificationSkeleton } from "../../../../skeltons/NotificationSkelton";
import type { TicketInterface } from "../../../../interfaces/interfaces";
import { toaster } from "../../../../services/Toaster";



const AdminTicketContent = () => {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [page,setPage]=useState(0)

  const {data,isLoading,refetch}=useQuery({
    queryKey:["AdminTicketContent"],
    queryFn:()=>fetchAllTickets(page),
    staleTime:1000*60*10
  })

  const openTicket = async(ticket:TicketInterface) => {
    setSelectedTicket(ticket);
    setShowModal(true);
        
    if(ticket.readStatus){
          console.log("Already readed");
          return
    }
    try {
        await markAsReadTicket(ticket.id);
        refetch();
    } catch (error) {
        console.log(error)
         toaster("Something went wrong Please Conact the admin.")
    }

  };

  return (
    <div className="mt-10">

      {/* Ticket List */}
      <div className="space-y-4">

        {isLoading?Array.from({length:7}).map((_,_1)=>(
            <NotificationSkeleton/>
        )):data?.content.length === 0 ?

            <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-16 text-center"
        >

        <Ticket size={50} className="text-gray-300 dark:text-gray-600 mb-4" />

        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            No Support Tickets Yet
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
            When users submit support requests or report issues, 
            their tickets will appear here for you to review and manage.
        </p>

        </motion.div>
        :data?.content?.map((ticket:TicketInterface, index:number) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => openTicket(ticket)}
            className={`cursor-pointer p-5 rounded-xl border transition hover:shadow-md
              ${
                ticket.readStatus
                  ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200"
              }`}
          >

            {/* Top */}
            <div className="flex justify-between items-start">

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {ticket.firstName} {ticket.lastName}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {ticket?.message?.slice(0,100)}...
                </p>
              </div>

              {!ticket.readStatus && (
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              )}
            </div>

            {/* Bottom */}
            <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
              <span>{ticket.email}</span>
              <span>{moment(ticket.createdAt).fromNow()}</span>
            </div>

          </motion.div>
        ))}
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
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedTicket && (
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
              className="bg-white dark:bg-gray-900 w-[500px] rounded-2xl shadow-2xl overflow-hidden"
            >

              {/* Header */}
              <div className="bg-emerald-500 text-white p-6 flex flex-col items-center">
                        <img
                    src="/logo.png"
                    alt="KindRaise Logo"
                    className="h-12 mb-2"
                />
                <h3 className="text-lg font-semibold">Support Ticket</h3>
                <p className="text-xs opacity-90">
                  User submitted request details
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-2">

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <User size={16} />
                  {selectedTicket.firstName} {selectedTicket.lastName}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Mail size={16} />
                  {selectedTicket.email}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Phone size={16} />
                  {selectedTicket.phone}
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">
                    {selectedTicket.message}
                  </p>
                </div>

                <p className="text-xs text-gray-400">
                  {moment(selectedTicket.createdAt).format(
                    "DD MMM YYYY, hh:mm A"
                  )}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end p-4 border-t dark:border-gray-700">
                            <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded-lg border 
                text-gray-700 dark:text-gray-200 
                border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition"
                >
                Close
                </button>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminTicketContent;