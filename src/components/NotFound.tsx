
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black px-6">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        {/* 404 TEXT */}
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-emerald-500 text-emerald-500 bg-clip-text"
        >
          404
        </motion.h1>

        {/* TITLE */}
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm md:text-base">
          Oops! The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* ILLUSTRATION (FLOATING EFFECT) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mt-8"
        >
          <img
            src="/logo.png"
            alt="404 illustration"
            className="w-64 mx-auto opacity-90"
          />
        </motion.div>

        {/* BUTTONS */}
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          
          {/* Go Home */}
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition shadow-md hover:shadow-lg"
          >
            Go Home
          </button>

          {/* Go Back */}
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;