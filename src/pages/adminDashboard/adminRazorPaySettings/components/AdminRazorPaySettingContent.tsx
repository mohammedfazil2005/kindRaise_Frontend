
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getRazorPayCreds, updateRazorPayCreds } from "../../../../services/apis/RazorPayApi";
import { RazorpaySkeleton } from "../../../../skeltons/AdminDashboardSkeltons";
import { toaster } from "../../../../services/Toaster";
import type { RazorPayInterface } from "../../../../interfaces/interfaces";
import { ClipLoader } from "react-spinners";

type AdminRazorPaySettingContentPropsType={
    setRazorPayUpdated:Dispatch<SetStateAction<string>>
}

const AdminRazorPaySettingContent = ({setRazorPayUpdated}:AdminRazorPaySettingContentPropsType) => {

    const [formData,setFormData]=useState<RazorPayInterface>({
        id:"string",
        name:"",
        apiKey:"",
        secretKey:"",
        mode:"",
        active:true
    })

    const [loader,setLoader]=useState(false)

    const {data,isLoading,refetch}=useQuery({
        queryKey:["AdminRazorPaySettingContentDetails"],
        queryFn:getRazorPayCreds,
        staleTime:1000*60*10
    })

    const onUpdateRazorPayCreds=async()=>{
        if(!formData.apiKey||!formData.secretKey){
            toaster("Please enter both Razorpay API Key and Secret Key.")
        }
        setLoader(true)
        try {
            console.log(formData)
            const apiResponse=await updateRazorPayCreds(formData)
            toaster(apiResponse.message)
            setRazorPayUpdated("Updated")
            refetch()
        } catch (error) {
            console.log(error)
        }finally{
            setLoader(false)
        }
    }

 

    useEffect(()=>{
        if(!data) return;
        setFormData(data);
    },[data])


    return (
        <>
        {isLoading?<RazorpaySkeleton/>:
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* LEFT SIDE - FORM */}
                <div className="space-y-5">

                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Razorpay Configuration
                    </h2>

                    {/* Key ID */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Razorpay Key ID
                        </label>

                        <input
                        value={formData.apiKey}
                        onChange={(e)=>setFormData({...formData,apiKey:e.target.value})}
                            type="text"
                            placeholder="Enter Razorpay Key ID"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-600 dark:text-white
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Secret Key */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Razorpay Secret Key
                        </label>

                        <input
                        value={formData.secretKey}
                        onChange={(e)=>setFormData({...formData,secretKey:e.target.value})}
                            type="password"
                            placeholder="Enter Razorpay Secret Key"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200  text-gray-600 dark:text-white
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Mode */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Payment Mode
                        </label>

                        <select
                        value={formData.mode}
                         onChange={(e)=>setFormData({...formData,mode:e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 
              dark:border-gray-700 bg-white dark:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 dark:text-white"
                        >
                            <option value={"TEST"}>Test Mode</option>
                            <option value={"LIVE"}>Live Mode</option>
                        </select>
                    </div>

                    {/* Button */}
                    <motion.button
                    disabled={loader}
                    onClick={onUpdateRazorPayCreds}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
                    >
                         {loader?<ClipLoader size={18}/>:"Save Settings"}
                       
                    </motion.button>

                </div>

                {/* RIGHT SIDE - IMAGE */}
                <div className="flex justify-center">

                    <motion.img
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/razorpay-icon.png"
                        alt="Razorpay"
                        className="w-56 h-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />

                </div>

            </div>

        </motion.div>
}
        </>
    );
};

export default AdminRazorPaySettingContent;