import  { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { toaster } from "../../../../services/Toaster";
import { createTestimonial } from "../../../../services/apis/TestimonialApi";
import { AdminDashboardContext } from "../../../../contexts/AdminDashboardContext";

const CreateTestimonial = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    message: "",
    rating: 0,
    status: true,
  });

  const [image, setImage] = useState<File|null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const{setTestimonialUpdate}=useContext(AdminDashboardContext)!

  const handleChange = (e:any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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

  const handleSubmit = async(e:any) => {
    e.preventDefault()
   try {
    setLoading(true)
    const formDataPayload=new FormData();

    formDataPayload.append("info",new Blob([JSON.stringify(formData)],{type:"application/json"}))
    formDataPayload.append("image",image!);

    const response=await createTestimonial(formDataPayload);
    toaster(response.message);
    resetForm()
    setTestimonialUpdate('updated')
   } catch (error) {
    toaster("Something went wrong please contact the kindRaise Admin.")
    console.log(error)
   }finally{
    setLoading(false)
   }
  };

  const resetForm=()=>{
    setFormData({...formData, name: "",
    role: "",
    company: "",
    message: "",
    rating: 0,
    status: true,})
    setPreview('')
    setImage(null)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-10 mt-10">
      
      {/* LEFT FORM */}
      <div className="lg:col-span-2 rounded-2xl">

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Add Testimonial
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Share user feedback and highlight their experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Aisha Rahman"
              className="mt-2 w-full p-4 text-black dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          {/* Role + Company */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-500">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Product Manager"
                className="mt-2 w-full p-4 text-black dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="TechNova Solutions"
                className="mt-2 w-full p-4 text-black dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-semibold text-gray-500">
              Message
            </label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write testimonial..."
              className="mt-2 w-full p-4 text-black dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-semibold text-gray-500">
              Rating
            </label>

            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: num }))
                  }
                  className={`cursor-pointer text-xl ${
                    num <= formData.rating
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Image Upload (Same style as campaign) */}
          <div>
            <label className="text-sm font-semibold text-gray-500">
              Profile Image
            </label>

            <div
              onClick={() => document.getElementById("testimonialImage")?.click()}
              className="mt-2 border-2 border-dashed border-gray-400 rounded-xl p-8 text-center cursor-pointer"
            >
              <Upload className="mx-auto mb-3 text-black dark:text-white" />

              <p className="text-gray-400">
                Drag image here or click upload
              </p>

              {image && (
                <p className="text-xs mt-3 text-gray-500 dark:text-gray-300">
                  Selected: {image.name}
                </p>
              )}

              <input
                id="testimonialImage"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </div>
          </div>

         

          {/* Submit */}
          <motion.button
            disabled={loading}
            className="mt-6 w-full rounded-xl py-4 font-semibold text-white shadow-md 
            bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900
            bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500"
          >
            {loading ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              "Submit Testimonial"
            )}
          </motion.button>
        </form>
      </div>

      {/* RIGHT PREVIEW */}

                <div className="
        relative p-5 rounded-2xl
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-700
        shadow-md hover:shadow-lg transition-all duration-300 h-[220px]
        ">

        {/* Top Section */}
        <div className="flex items-center gap-3">

            {/* Avatar */}
            <div className="relative">
            {preview ? (
                <img
                src={preview}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
            ) : (
                <div className="h-14 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
            )}
            </div>

            {/* Name + Role */}
            <div className="flex-1">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                {formData.name || "User Name"}
            </h4>

            <p className="text-xs text-gray-500 dark:text-gray-400">
                {formData.role || "Role"} · {formData.company || "Company"}
            </p>

            {/* ⭐ Rating */}
            <div className="flex gap-[2px] mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    className={`text-sm ${
                    i <= formData.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                >
                    ★
                </span>
                ))}
            </div>
            </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-gray-200 dark:bg-gray-700" />

        {/* Message */}
        <div className="relative">

            {/* Big Quote */}
            <span className="absolute -top-3 left-0 text-5xl text-gray-200 dark:text-gray-700 font-serif">
            “
            </span>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-6">
            {formData.message?.slice(0,174) ||
                "This platform made it incredibly easy to support meaningful causes. Highly recommended!"}
            </p>
        </div>

        {/* Bottom Accent */}
        <div className="mt-5 flex justify-end">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" />
        </div>

        </div>
       
    </div>
  );
};

export default CreateTestimonial;