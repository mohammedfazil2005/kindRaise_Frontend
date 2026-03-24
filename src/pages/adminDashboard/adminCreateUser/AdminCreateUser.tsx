
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toaster } from "../../../services/Toaster";
import { onCheckUsernameAlreadyExists } from "../../../services/apis/AuthApi";
import { createUser } from "../../../services/apis/UserApi";
import { AdminDashboardContext } from "../../../contexts/AdminDashboardContext";
import { ClipLoader } from "react-spinners";

const AdminCreateUser = () => {
    const [formData,setFormData]=useState({
        username:"",
        password:"",
        role:"USER",
        phone:"",
        fullName:"",
        status:"ACTIVE"
    })

    const [profilePhoto, setProfilePhoto] = useState<File|null>(null);
    const [preview, setPreview] = useState<string>("");

    const [checkingUsername, setCheckingUsername] = useState(false);
    const [usernameResponse, setUsernameResponse] = useState(Object);
    const [passwordChecker, setPasswordChecker] = useState(false);
    const [phoneNumberChecker, setPhoneNumberChecker] = useState(false);
    const [loader,setLoader]=useState(false)

    const {setUser}=useContext(AdminDashboardContext)!;

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
      }
    
      const handlePhotoChange = (e: any) => {
        const file = e.target.files?.[0];
    
        if (!file) return;
    
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        const maxSize = 5 * 1024 * 1024; // 5MB
    
    
        if (!allowedTypes.includes(file.type)) {
          toaster("Only JPG, JPEG, and PNG files are allowed.");
          return;
        }
    
    
        if (file.size > maxSize) {
          toaster("File size must be less than 5MB.");
          return;
        }
    
    
        setProfilePhoto(file);
    
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      };
    
      const checkingUsernameAlreadyExists = async (username: string) => {
        setCheckingUsername(true)
    
        try {
          const isAlreadyExists = await onCheckUsernameAlreadyExists(username)
          setUsernameResponse(isAlreadyExists)
          setCheckingUsername(false)
        } catch (error) {
          console.log(error)
        } finally {
          setCheckingUsername(false)
        }
      }

    
        const formChecker = () => {
            if (usernameResponse.status == true && !passwordChecker  && !phoneNumberChecker) return true;
            return false;
        }

        const onCreateUserClick=async(e:any)=>{
            e.preventDefault()
            if (!formChecker()) {
              toaster("Please fill out all required fields.")
              return;
            }
            setLoader(true)
            try {
                const formdataPayload=new FormData();
                formdataPayload.append("info",new Blob([JSON.stringify(formData)],{type:"application/json"}))
                formdataPayload.append("file",profilePhoto!);
                const apiResponse=await createUser(formdataPayload);
                toaster(apiResponse.message);
                resetData()
                setUser("user created")
            } catch (error) {
                console.log(error)
            }finally{
                  setLoader(false)
            }
        }

        const resetData = () => {
        setFormData({ ...formData, fullName: "", phone: "", username: "", password: "",  role: "USER",status:"ACTIVE" })
        setPreview("")
        setProfilePhoto(null)
    }


        

        useEffect(() => {
            if (!formData.username) {
            setUsernameResponse("")
            return;
            };
            if (formData.username.length <= 3) {
            setUsernameResponse({ status: false, message: "Username must have atleast four characters" })
            return;
            }
            const timer = setTimeout(() => {
            checkingUsernameAlreadyExists(formData.username);
            }, 500);
            return () => clearTimeout(timer);
        
        }, [formData.username]);

        useEffect(() => {
          setPasswordChecker(false)
          if (!formData.password) {
            return
          }
          if (formData.password.length <= 5) {
            setPasswordChecker(true)
            return;
          }
        }, [formData.password])

          useEffect(() => {
        setPhoneNumberChecker(false)
        if (!formData.phone) return;
        if (formData.phone.length != 10) {
        setPhoneNumberChecker(true)
        return
        }
        }, [formData.phone])



    return (
        <div className="w-full flex justify-center mt-8">

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
            >

              <div className="md:flex justify-between">
             <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Create New User
                </h2>
               <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
                    <img
                        src={preview?preview:'/unknownphoto.avif'}
                        className="w-full h-full object-cover"
                    />

            </div>
              </div>

                <form className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Full Name
                        </label>

                        <input
                         name="fullName"
                            value={formData.fullName}
                         onChange={handleChange}
                            type="text"
                            placeholder="Enter full name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                        />
                    </div>

                    {/* Username */}
                    <div className=" grid md:grid-cols-2 gap-3">
                       <div className="relative">
                         <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Username
                        </label>

                        <input
                        name="username" 
                        value={formData.username}
                         onChange={handleChange}
                            type="text"
                            placeholder="Enter username"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200
                         dark:border-gray-700 bg-white dark:bg-gray-800
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                        />
                        {checkingUsername && (
                  <div className="absolute right-3 top-10">
                    <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {usernameResponse && usernameResponse.status === true && (
                  <p className="text-green-500 text-xs m-2">Username is available. You can use it.</p>
                )}

                {usernameResponse && usernameResponse.status === false && (
                  <p className="text-red-500 text-xs m-2">{usernameResponse.message}</p>
                )}
                       </div>
                       <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Phone
                        </label>

                        <input
                        name="phone" 
                        value={formData.phone}
                         onChange={handleChange}
                            type="tel"
                            placeholder="Enter Phone"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                        />
                        {phoneNumberChecker && (
                  <p className="text-red-500 text-xs m-2">Please enter a valid 10-digit phone number.</p>
                )}
                    </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Password
                        </label>

                        <input
                        name="password" 
                        value={formData.password}
                         onChange={handleChange}
                            type="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                        />
                        {passwordChecker && (
                    <p className="text-red-500 text-xs m-2">  Password should be at least 6 characters.</p>
                  )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Role */}
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                                Role
                            </label>

                            <select
                            name="role" 
                        value={formData.role}
                         onChange={(e)=>setFormData({...formData,role:e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                            >
                                <option value={"USER"}>Donor</option>
                                <option value={"ADMIN"}>Admin</option>
                            </select>
                            
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                                Account Status
                            </label>

                            <select
                            onChange={(e)=>setFormData({...formData,status:e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200
                                 dark:border-gray-700 bg-white dark:bg-gray-800
                                focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-gray-300 "
                            >
                                <option value={"ACTIVE"}>Active</option>
                                <option value={"PENDING"}>Pending</option>
                            </select>
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Profile Image
                        </label>

                        <input
                        id="campaign_image_id"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handlePhotoChange}
                  className="hidden mt-2"
                        />
                        <motion.button type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById("campaign_image_id")?.click()} className=" flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-emerald-600 transition ">
                            <Upload size={16} />
                            Upload Image
                        </motion.button>
                      {profilePhoto && (
                <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg border 
                border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 w-fit">

                    {/* File Icon */}
                    <span className="text-blue-500">📄</span>

                    {/* File Name */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[180px]">
                    {profilePhoto.name}
                    </p>

                    {/* Remove Button */}
                    <button
                    onClick={() => {
                        setProfilePhoto(null),
                        setPreview("")
                    }}
                    className="text-red-500 hover:text-red-600 text-xs ml-2"
                    >
                    ✕
                    </button>
                </div>
                )}
                    </div>

                    {/* Button */}
                    <motion.button
                    onClick={onCreateUserClick}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
                    >
                      {loader?<ClipLoader size={18}/>:"Create User"}
                    </motion.button>

                </form>

            </motion.div>

        </div>
    );
};

export default AdminCreateUser;