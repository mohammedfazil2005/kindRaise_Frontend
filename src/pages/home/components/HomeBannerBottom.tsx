
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomeBannerBottom = () => {
  const navigate=useNavigate()
    const containerVariants :any= {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants:any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants:any = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 relative overflow-hidden rounded-3xl mx-6 sm:mx-12 lg:mx-20 my-12"
      >
        {/* Left Decorative Hands */}
        <div className="absolute left-0 top-0 w-24 h-full opacity-30 pointer-events-none">
          <svg
            viewBox="0 0 100 200"
            className="w-full h-full"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          >
            <path d="M 20 80 Q 15 100 20 120 Q 25 100 30 120 Q 35 100 40 120 Q 45 100 50 120" />
            <path d="M 25 100 L 25 140 M 35 100 L 35 140 M 45 100 L 45 140" />
            <circle cx="25" cy="85" r="8" />
          </svg>
        </div>

        {/* Right Decorative Hands and Gift */}
        <div className="absolute right-0 top-0 w-24 h-full opacity-30 pointer-events-none">
          <svg
            viewBox="0 0 100 200"
            className="w-full h-full"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          >
            <path d="M 80 80 Q 85 100 80 120 Q 75 100 70 120 Q 65 100 60 120 Q 55 100 50 120" />
            <rect x="55" y="60" width="30" height="30" rx="2" />
            <path d="M 62 60 L 62 50 M 70 60 L 70 50 M 78 60 L 78 50" />
            <path d="M 55 75 L 85 75" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center py-16 px-6">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-8"
          >
            Donate For People Who Are In Need!
          </motion.h1>
          <motion.button
            variants={buttonVariants}
            onClick={()=>{
              if(localStorage.getItem("token")){
                if(localStorage.getItem("role")=="ROLE_ADMIN"){
                  navigate("/admin")
                }else{
                  navigate("/user")
                }
                
              }else{
                navigate("/login")
              }
            }}
            whileHover="hover"
            className="bg-white text-teal-900 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Donate Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default HomeBannerBottom
