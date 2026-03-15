import  { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { toaster } from "../../../services/Toaster";
import { useQuery } from "@tanstack/react-query";
import { createCampaign, fetchAllCategories, fetchSingleCampaign, updateCampaign, updateCampaignStatus } from "../../../services/apis/CampaignApi";
import type { CategoryInterface } from "../../../interfaces/interfaces";
import { ClipLoader } from "react-spinners";
import { CampaignContext } from "../../../contexts/CampainContext";
import { useParams } from "react-router-dom";
import { EditCampaignSkeleton } from "../../../skeltons/CampaignSkeltons";

const UserEditCampaign = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: 0,
    deadline: "",
    categoryId: "",
    status:''
   
  });

  const [preview, setPreview] = useState<string|null>("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const {setCampaignCreated}=useContext(CampaignContext)!

  const id=useParams()['id']!
  
    const {data:categories,isLoading:isCategoriesLoading}=useQuery({
     queryKey:['categories'],
     queryFn:fetchAllCategories,
     staleTime:1000*60*10,  
   })

   const {data:campaign,isLoading:isCampaignLoading,refetch:refetchCampaign}=useQuery({
    queryKey:['editcampaign',id],
    queryFn:()=>fetchSingleCampaign(id),
    enabled:!!id
   })

   useEffect(()=>{
    if(!campaign) return;
    setFormData({...campaign,categoryId:campaign.category_id})
   },[campaign])

   useEffect(()=>{
    if(formData){
        console.log(formData)
    }
   },[formData])

  const validateField = (name: string, value: any) => {
    let error = "";

    if (name === "title" && value.length < 5) {
      error = "Title must be at least 5 characters";
    }

    if (name === "description" && value.length < 20) {
      error = "Description must be at least 20 characters";
    }

    if (name === "goalAmount" && value <= 0) {
      error = "Goal amount must be greater than 0";
    }

    if (name === "deadline") {
      const today = new Date();
      const selected = new Date(value);

      if (selected <= today) {
        error = "Deadline must be a future date";
      }
    }

    setErrors((prev: any) => ({
      ...prev,
      [name]: error
    }));
  };

  // input change
  const handleChange = (e: any) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
     [name]: name === "goalAmount" ? Number(value) : value
    });

    validateField(name, value);
  };

  // image upload
  const handleImage = (e: any) => {

    const file = e.target.files[0];

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


    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // drag drop
  const handleDrop = (e: any) => {

    e.preventDefault();

    const file = e.dataTransfer.files[0];

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
    

    if (file) {
     setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // submit
  const handleSubmit = async (e: any) => {

    e.preventDefault();
    if(!checkFormIsValid()){
      toaster("Please fill in all required fields before submitting the campaign.")
      return;
    }
    setLoading(true)
    try {
      
      const formDataPayload=new FormData();
      formDataPayload.append("campaign",new Blob([JSON.stringify(formData)],{type:"application/json"}));
      if(image){
        formDataPayload.append("file",image!);
      }
      const apiResponse=await updateCampaign(id,formDataPayload);
      toaster(apiResponse.message);
      setCampaignCreated(apiResponse.message);
    } catch (error) {
      toaster("Something went wrong on Updating a campaign.");
      console.log(error);
    }finally{
      setLoading(false);
      refetchCampaign()
    }

    
  };
  
  // check from is valid
  const checkFormIsValid=()=>{
    const isFormValid = formData.title && formData.description && formData.goalAmount && formData.deadline && formData.categoryId && !errors.title && !errors.description && !errors.goalAmount && !errors.deadline;
    return isFormValid;
  }

  const changeCampaignStatus=async(status:string)=>{
    try {
        const apiResponse=await updateCampaignStatus(status,id);
        toaster(apiResponse.message);
        refetchCampaign();
    } catch (error) {
        console.log(error)
        toaster("Something went wrong while changing the status.")
    }
  }

  

  return (
    <>
    {isCampaignLoading?<EditCampaignSkeleton/>:
    <div className="grid lg:grid-cols-3 gap-10 mt-10">
            <div className="lg:col-span-2 rounded-2xl ">

                  <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Start a New Campaign
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Share your cause and submit your campaign for admin review.
          </p>
        </div>

              <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title */}
              <div>
              <label className="text-sm font-semibold text-gray-500">
              Campaign Title
              </label>

              <input  type="text"  name="title"  value={formData.title}  onChange={handleChange}  placeholder="Help build a school for rural children"  className="mt-2 w-full p-4 text-black dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 "
              />

              {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
              </div>


              {/* Description */}
              <div>
              <label className="text-sm font-semibold text-gray-500">
              Description
              </label>

              <textarea rows={5} name="description" value={formData.description} onChange={handleChange} maxLength={1000}  className="mt-2 w-full p-4 text-black dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 "
              />

              <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">
              {formData.description.length}/1000 characters
              </span>

              {errors.description && (
              <span className="text-red-500">{errors.description}</span>
              )}
              </div>
              </div>


              {/* Goal + Deadline Grid */}
              <div className="grid md:grid-cols-2 gap-6">

              <div>
              <label className="text-sm font-semibold text-gray-500">
              Goal Amount
              </label>

              <input type="number" name="goalAmount" value={formData.goalAmount==0?"":formData.goalAmount} onChange={handleChange} className="mt-2 w-full p-4 text-black dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
              </div>

              <div>
              <label className="text-sm font-semibold text-gray-500">
              Deadline
              </label>

              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="mt-2 w-full p-4 text-black dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
              </div>

              </div>


              {/* Category */}
              <div className="pb-5">
              <label className="text-sm font-semibold text-gray-500">
              Category
              </label>

              <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="mt-2 w-full p-4 text-black dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800">
              <option value="" disabled>Select Category</option>
              {isCategoriesLoading? 
              <option disabled>Loading categories...</option>
              :categories?.map((each:CategoryInterface)=>(
                 <option value={each?.id}>{each?.title}</option>
              ))}
              </select>
              </div>


              {/* Upload */}
              <div>

              <label className="text-sm font-semibold text-gray-500">
              Campaign Image
              </label>

              <div
              onClick={()=>document.getElementById("campaignimage")?.click()}
              onDrop={handleDrop}
              onDragOver={(e)=>e.preventDefault()}
              className="mt-3 border-2 border-dashed border-gray-400 rounded-xl p-8 text-center cursor-pointer"
              >

              <Upload className="mx-auto mb-3 text-black dark:text-white"/>

              <p className="text-gray-400">
              Drag image here or click upload
              </p>
            {!image&&(
               <p className="text-xs text-gray-400 mt-1">
               Upload an image in JPG, JPEG, or PNG format (max size: 5MB).
               </p>
            )}
             {image && (
            <p className="text-xs mt-3 text-gray-500 dark:text-gray-300">
              Selected File: {image.name}. <br /> <span className="text-emerald-500 underline ">You can view the image in the preview above.</span>
            </p>
             )}
              <input  id="campaignimage"  type="file"  accept="image/*"  onChange={handleImage}  className="mt-3 hidden"
              />

              </div>

              </div>

              <motion.button disabled={loading}  initial={{ opacity: 0, y: 3 }}  whileInView={{ opacity: 1, y: 0 }}  transition={{ duration: 0.4 }}  className={`mt-6 w-full rounded-xl py-4 font-semibold text-white shadow-md  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900  bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500`}>
            
             {loading?(
               <ClipLoader size={20} color="#ffffff" />
             ):(
              <>
               Save Changes
              </>
             )}
            </motion.button>
              </form>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 h-fit">

            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
            Campaign Preview
            </h3>

            {/* Image */}
          
            <img
            src={preview?preview:import.meta.env.VITE_KINDRAISE_API_URL+`/campaign/image/campaign/${campaign.id}`}
            alt={campaign.title}
            className="rounded-xl h-48 w-full object-cover mb-4"
            />
           


            {/* Title */}
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
            {formData.title || "Campaign Title"}
            </h4>


            {/* Description */}
            <p className="text-sm text-gray-500 mt-2 line-clamp-3">
            {formData.description || "Campaign description will appear here"}
            </p>


            {/* Progress */}
            <div className="mt-4">

            <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-emerald-500">
            ₹{formData?.goalAmount?.toLocaleString("en-IN")}
            </span>

            <span className="text-gray-400">
            Goal
            </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full">

            <div className="h-2 bg-emerald-500 rounded-full w-1/4"></div>

            </div>

            </div>

            <p className="text-xs text-gray-400 mt-3">
            Deadline: {formData.deadline || "Not set"}
            </p>

            <div className="border-t border-gray-200 dark:border-gray-700 my-5"></div>

{/* Danger Zone */}
                {campaign.status=="ACTIVE"&&(
                    <div>
            <h4 className="text-sm font-semibold text-amber-500 mb-2">
            Campaign Action
            </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Mark this campaign as completed once your goal has been achieved or the campaign has finished. 
                After completion, the campaign will stop accepting new donations.
                </p>
                 <div className="flex flex-col gap-3">
                <motion.button
                onClick={()=>changeCampaignStatus("COMPLETED")}
                className="mt-2 w-full rounded-xl py-3 font-semibold text-white shadow-md  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900  bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500"
                >
                Mark as Completed
                </motion.button>
              </div>

                </div>
                )}

            </div>

        </div>
    }
    </>
  );
};

export default UserEditCampaign;