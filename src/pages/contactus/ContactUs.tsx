import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Rocket, Send } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toaster } from "../../services/Toaster";
import { createTicket } from "../../services/apis/TicketApi";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
export default function ContactUs() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message:"",
    readStatus:false
   
  });

  const [loader,setLoader]=useState(false);
  

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit=async()=>{
    setLoader(true)
    const payload={...formData,time:new Date().toLocaleString()}
    try {
       await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            payload,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        )

        await createTicket(formData);
        
        toaster("Your message has been sent successfully! Our team will get back to you shortly.");
        resetForm()
    } catch (error) {
        toaster("Something went wrong in email JS.")
        console.log(error)
    }finally{
          setLoader(false)
    }
  }

  const resetForm=()=>{
    setFormData({...formData,
          firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message:""
    })
  }

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800"
>

       <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 px-8 py-16 flex items-center"
>

        <div className="w-fullbg-gray-50 px-10 flex items-center">

        <div className="">

            {/* Small Heading */}
            <p className="text-sm tracking-widest uppercase text-emerald-600 mb-1">
            Contact KindRaise
            </p>

            {/* Main Heading */}
            <h2 className="text-4xl font-bold text-gray-900 mb-2 leading-tight flex items-center">
            We’re here to help 
            
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-md leading-relaxed mb-3">
            Whether you're starting a campaign, donating, or need support <br /> 
            our team is ready to assist you anytime.
            </p>

            {/* Divider */}
            <div className="w-16 h-1 bg-emerald-500 mb-10 rounded-full"></div>

            {/* Info (Clean list style instead of cards) */}
            <div className="space-y-3 text-gray-700">

            <div className="flex items-center gap-2">
                <span className="text-emerald-600 text-xl"><Phone/></span>
                <span className="font-medium">+91 99614 23960</span>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-emerald-600 text-xl"><Mail/></span>
                <span className="font-medium">support@kindraise.org</span>
            </div>

            <div className="flex items-start gap-3">
                <span className="text-emerald-600 text-xl"><MapPin/></span>
                <span className="font-medium leading-relaxed">
                Kerala, India 
                KindRaise Headquarters
                </span>
            </div>

            </div>

            {/* CTA BOX (Clean, not bulky) */}
            <div className="mt-14 p-6 bg-emerald-600 rounded-xl text-white shadow-lg">

            <h3 className="text-lg font-semibold mb-2 flex items-center">
                Start Making Impact Today <Rocket/>
            </h3>

            <p className="text-sm text-emerald-100 mb-4">
                Launch your fundraising campaign and help people in need.
            </p>

            <button onClick={()=>{
              if(localStorage.getItem("token")){
                navigate('/user')
              }else{
                navigate('/login')
                toaster("Please Login to continue")
              }
            }} className="bg-white text-emerald-700 px-5 py-2 rounded-md font-semibold hover:bg-gray-300 transition">
                Start Campaign
            </button>
            </div>

        </div>
        </div>
        </motion.div>

      {/* RIGHT SIDE - FORM */}
            <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] // custom smooth easing
        }}
        className="w-full lg:w-1/2 text-white px-[55px] py-[20px]"
        >

        <p className="text-sm tracking-widest uppercase opacity-80 mb-4">
          KindRaise Support
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mb-10">
          How Can We Help You?
        </h1>

        {/* FORM */}
        <div className="space-y-6">

          {/* Name */}
          <div className="flex gap-6">
            <input
            value={formData.firstName}
              name="firstName"
              onChange={handleChange}
              placeholder="First Name *"
              className="inputLine cursor-pointer"
            />
            <input
             value={formData.lastName}
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name *"
              className="inputLine cursor-pointer"
            />
          </div>

          <input
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder="Your Email *"
            className="inputLine cursor-pointer"
          />

          <input
            value={formData.phone}
            name="phone"
            onChange={handleChange}
            placeholder="Your Phone *"
            className="inputLine cursor-pointer"
          />

          <textarea
            value={formData.message}
          rows={10}
            name="messsage"
            onChange={(e)=>setFormData({...formData,message:e.target.value})}
            placeholder="How can we help you? Please explain your request clearly..."
            className="inputLine cursor-pointer"
          />

          

       

          {/* BUTTON */}
         <button
  onClick={handleSubmit}
  disabled={loader}
  className={`mt-8 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
    ${loader 
      ? "bg-emerald-400 cursor-not-allowed" 
      : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"}
    text-white shadow-md hover:shadow-lg`}
>
  {loader ? (
    <ClipLoader size={18} color="#fff" />
  ) : (
    <>
      <Send size={18} />
      Submit Request
    </>
  )}
</button>
        </div>
      </motion.div>

 
      <style >{`
        .inputLine {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.4);
          padding: 10px 0;
          color: white;
          font-size: 14px;
        }

        .inputLine::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .inputLine:focus {
          outline: none;
          border-bottom: 1px solid white;
        }
      `}</style>
    </motion.div>
  );
}