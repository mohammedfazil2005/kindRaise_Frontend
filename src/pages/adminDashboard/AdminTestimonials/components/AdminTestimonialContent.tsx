import { useState } from "react";
import { Star } from "lucide-react";
import { motion,AnimatePresence } from "framer-motion";
import moment from "moment";

const testimonials = [
  {
    id: 1,
    name: "Towhidur Rahman",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    message:
      "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy.",
  },
  {
    id: 2,
    name: "Towhidur Rahman",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    message:
      "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation.",
  },
];

const AdminTestimonialContent = () => {
    const [selectedTestimonial,setSelectedTestimonial]=useState<any>(null)
    const [showModal,setShowModal]=useState(false)
  return (
    <>
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((item, index) => (
        <motion.div
        onClick={()=>{
            setSelectedTestimonial(item)
            setShowModal(true)
        }}
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12, duration: 0.4 }}
          className="
            w-full h-full p-[1px] rounded-2xl
            bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200
            dark:from-gray-700 dark:via-gray-800 dark:to-gray-700
          "
        >
          {/* Inner Card */}
          <div
            className="
              rounded-2xl p-5 h-full flex flex-col justify-between
              bg-white/80 dark:bg-gray-900/70
              backdrop-blur-xl
              border border-gray-200 dark:border-gray-700
              shadow-sm hover:shadow-md
              transition-shadow duration-300
            "
          >
            {/* Top */}
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3">
                    <img
                  src={item.avatar}
                  className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-600"
                  alt=""
                />
                     <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {item.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Supporter of KindRaise
              </p>
            </div>
                </div>
                <div className="flex items-center gap-1 ">
                  <span className="text-xs text-gray-800 dark:text-gray-200">
                    3.4/5
                  </span>
                   
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2">
                “
                {item.message.length > 250
                  ? item.message.slice(0, 250) + "..."
                  : item.message}
                ”
              </p>
            </div>
           
          </div>
        </motion.div>
      ))}
    </div>
     <AnimatePresence>
  {showModal && selectedTestimonial && (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowModal(false)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 w-[500px] rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex flex-col items-center bg-emerald-500 text-white p-6">
          <img src="/logo.png" alt="KindRaise Logo" className="h-12 mb-2" />

          <h3 className="text-lg font-semibold">Testimonial Details</h3>

          <p className="text-xs opacity-90">
            What users say about KindRaise
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* User */}
          <div className="flex items-center gap-3">
            <img
              src={selectedTestimonial.avatar}
              className="h-12 w-12 rounded-full border border-gray-300 dark:border-gray-600"
              alt=""
            />
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {selectedTestimonial.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supporter of KindRaise
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Rating
            </span>

            <div className="flex items-center gap-[2px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= selectedTestimonial.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {selectedTestimonial.rating}/5
            </span>
          </div>

          {/* Message */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              “{selectedTestimonial.message}”
            </p>
          </div>

          {/* Date */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">
              {moment(selectedTestimonial.date).format(
                "DD MMM YYYY, hh:mm A"
              )}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t dark:border-gray-700">
          <motion.button
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-sm rounded-lg border text-gray-600 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )}
    </AnimatePresence>
    </>
  );
};

export default AdminTestimonialContent;