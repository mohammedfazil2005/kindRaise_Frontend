import  { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchLoggedInUserProfile, updateProfile } from "../../../services/apis/ProfileApi";
import { ProfileSkelton } from "../../../skeltons/ProfileSkelton";
import { toaster } from "../../../services/Toaster";
import { ClipLoader } from "react-spinners";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CampaignContext } from "../../../contexts/CampainContext";

const UserProfile = () => {
  const location = useLocation();

  const isChangePassword = location.pathname.includes("change-password")

  const [profile, setProfile] = useState({
    id:null,
    fullName: "John Doe",
    username: "john123",
    phone: "9876543210",
    password: "",
    confirmPassword: "",
    defaultFullName:"",
    defaultUsername:""
  });

  const [preview, setPreview] = useState('');
  const [file,setFile]=useState<File|null>(null);
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const {setProfileUpdated}=useContext(CampaignContext)!

  const handleChange = (e: any) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file)
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData=new FormData();

      formData.append("info",new Blob([JSON.stringify(profile)],{type:"application/json"}));
      
      if(file){
        formData.append("file",file);
      }

      const apiResponse=await updateProfile(profile.id!,formData);

      toaster(apiResponse.message)
      
    } catch (error) {
      toaster("Something went wrong. Please Contact KindRaise Admin");
      console.log(error);
    }finally{
      setProfileUpdated("updated")
      setLoading(false);
    }
  };

  const {data,isLoading}=useQuery({
    queryKey:['profile'],
    queryFn:fetchLoggedInUserProfile,
    staleTime:1000*60*10
  })

  useEffect(()=>{
    if(!data) return;
    setProfile({...data,defaultFullName:data.fullName,defaultUsername:data.username})
  },[data])

  return (
    <>
    {isChangePassword?(<Outlet/>):(   
    isLoading?<ProfileSkelton/>:
  
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow border dark:border-gray-700 mt-10 p-8"
    >

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account information and security
        </p>
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-3">

        <div className="relative">

          <img
            src={ preview? preview:import.meta.env.VITE_KINDRAISE_API_URL+`/user/profile/image/${profile.id}`}
            className="w-20 h-20 rounded-full object-cover border"
          />

          <label className="absolute bottom-0 right-0 bg-emerald-500 p-1 rounded-full cursor-pointer">
            <Camera size={14} className="text-white" />
            <input
              type="file"
              className="hidden"
              onChange={handleImage}
            />
          </label>

        </div>

        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white">
            {profile.defaultFullName}
          </h2>
          <p className="text-sm text-gray-500">{profile.defaultUsername}</p>
        </div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Personal Info */}
        <div>

        

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full text-gray-600 dark:text-gray-300  mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full text-gray-600 dark:text-gray-300 mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full text-gray-600 dark:text-gray-300   mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

          </div>

        </div>

        {/* Password Section */}
        <div className="mt-6">

          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Security
          </h3>

          <div className="flex items-center gap-4">
                {/* Change Password Button */}
                <button onClick={()=>navigate(`/user/profile/change-password/${profile.id}`)}  type="button"  className="  bg-emerald-500  text-white  px-4 py-2  rounded-lg  text-sm  font-semibold  hover:bg-emerald-600  transition  " >
                  Change Password
                </button>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Keep your account secure by updating your password regularly.
          </p>

      </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <motion.button disabled={loading}  initial={{ opacity: 0, y: 3 }}  whileInView={{ opacity: 1, y: 0 }}  transition={{ duration: 0.4 }}  className={`mt-6 w-full rounded-xl py-3 font-semibold text-white shadow-md  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900  bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500`}>
            
             {loading?(
               <ClipLoader size={20} color="#ffffff" />
             ):(
              <>
              Save Changes
              </>
             )}
            </motion.button>
        </div>

      </form>

    </motion.div>
     )}
    </>
  );
};

export default UserProfile;