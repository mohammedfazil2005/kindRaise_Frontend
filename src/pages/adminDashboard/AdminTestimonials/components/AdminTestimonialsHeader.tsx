import { motion } from "framer-motion";
import { MessageSquareQuote, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminTestimonialsHeader = () => {
    const navigate=useNavigate()
  return (
    <div className="flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-3">

        {/* Icon */}
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-white">
          <MessageSquareQuote size={18} />
        </div>

        {/* Title + Description */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Testimonials Management
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review, approve, and manage user testimonials shared on the platform
          </p>
        </div>

      </div>

      {/* Right (Optional actions later) */}
      <div className="flex items-center gap-3">
      <motion.button
                    onClick={()=>navigate('/admin/testimonials/create')}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full 
                    text-white shadow-md 
                    bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-700
                    bg-[length:200%_100%] bg-left hover:bg-right
                    transition-all duration-500"
        >
           <>
              Create
            <Plus size={16} />
        
           </>
        </motion.button>
       
      </div>

    </div>
  );
};

export default AdminTestimonialsHeader;
