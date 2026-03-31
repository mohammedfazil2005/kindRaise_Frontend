import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { toaster } from "../../../services/Toaster";
import { changePassword, checkPassword } from "../../../services/apis/ProfileApi";
import { ClipLoader } from "react-spinners";

const UserOldPassword = () => {

  const id=useParams()['id']

  const [verified,setVerified]=useState(false)

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [loading1,setLoading1]=useState(false)
  const [loading2,setLoading2]=useState(false)

  const navigate=useNavigate()


  const [showPassword2, setShowPassword2] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password2, setPassword2] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmitNewPassword = async() => {

    if (password2.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password2 !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError('')
    setLoading2(true)
    try {
        const apiResponse=await changePassword(id!,password2);
        toaster(apiResponse.message)
        if(apiResponse.status){
            navigate('/user/profile')
        }
        
    } catch (error) {
        toaster("Something went wrong. Please Contact KindRaise Admin");
        console.log(error)
    }finally{
        setLoading2(false)
    }

    
  };

  const onCheckingPasswordIsVerified=async()=>{

    if(!password){
        toaster("Please enter your password.");
        return
    }
    setLoading1(true)
    try {
        const apiResponse=await checkPassword(id!,password);
        
        if(apiResponse.status){
            setVerified(true);
        }
    } catch (error) {
        toaster("Something went wrong. Please Contact KindRaise Admin");
        console.log(error);
    }finally{
        setLoading1(false)
    }
  }





  return (
      <>
    {!verified?<div className="flex justify-center items-center min-h-[70vh]">

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
       
        className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border dark:border-gray-700"
      >

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg">
            <Lock className="text-emerald-600 dark:text-emerald-400" size={20}/>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Verify Your Password
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          To continue changing your password, please confirm your current password.
          This helps keep your account secure.
        </p>

        {/* Password Input */}
        <div className="mb-6">

          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Current Password
          </label>

          <div className="relative mt-2">

            <motion.input
             onChange={(e)=>setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current password"
              className="cursor-pointer w-full border rounded-lg p-3 pr-10 text-gray-700 dark:text-gray-300 
              focus:ring-1 focus:ring-emerald-500 outline-none 
              dark:bg-gray-800 dark:border-gray-700"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-3">

         <motion.button onClick={onCheckingPasswordIsVerified} disabled={loading1}  initial={{ opacity: 0, y: 3 }}  whileInView={{ opacity: 1, y: 0 }}  transition={{ duration: 0.4 }}  className={`mt-1 w-full rounded-xl py-3 font-semibold text-white shadow-md  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900  bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500`}>
                    
          {loading1?(
            <ClipLoader size={20} color="#ffffff" />
             ):(
             <>
             Verify Password
            </>
         )}
    </motion.button>

        </div>

      </motion.div>

    </div>:
     <div className="flex justify-center items-center min-h-[70vh]">

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border dark:border-gray-700"
      >

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg">
            <Lock className="text-emerald-600 dark:text-emerald-400" size={20} />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Set New Password
          </h2>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Create a strong password to keep your account secure.
        </p>

        {/* New Password */}
        <div className="mb-5">

          <label className="text-sm text-gray-600 dark:text-gray-300">
            New Password
          </label>

          <div className="relative mt-2">

            <input
              type={showPassword2 ? "text" : "password"}
              value={password2}
              onChange={(e)=>setPassword2(e.target.value)}
              placeholder="Enter new password"
              className="w-full border rounded-lg p-3 pr-10 text-gray-700 dark:text-gray-300
              focus:ring-2 focus:ring-emerald-500 outline-none
              dark:bg-gray-800 dark:border-gray-700"
            />

            <button
              type="button"
              onClick={()=>setShowPassword2(!showPassword2)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword2 ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>

          </div>

        </div>

        {/* Confirm Password */}
        <div className="mb-3">

          <label className="text-sm text-gray-600 dark:text-gray-300">
            Confirm Password
          </label>

          <div className="relative mt-2">

            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border rounded-lg p-3 pr-10 text-gray-700 dark:text-gray-300
              focus:ring-2 focus:ring-emerald-500 outline-none
              dark:bg-gray-800 dark:border-gray-700"
            />

            <button
              type="button"
              onClick={()=>setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>

          </div>

        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        {/* Button */}
       <motion.button type="button" onClick={handleSubmitNewPassword} disabled={loading2}  initial={{ opacity: 0, y: 3 }}  whileInView={{ opacity: 1, y: 0 }}  transition={{ duration: 0.4 }}  className={`mt-1 w-full rounded-xl py-3 font-semibold text-white shadow-md  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900  bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500`}>
                    
          {loading2?(
            <ClipLoader size={20} color="#ffffff" />
             ):(
             <>
             Update Password
            </>
         )}
    </motion.button>


      </motion.div>

    </div>
    }

  
     
    </>
  );
};

export default UserOldPassword;