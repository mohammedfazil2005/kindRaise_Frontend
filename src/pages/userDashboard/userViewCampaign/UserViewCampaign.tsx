import { useQuery } from '@tanstack/react-query';


import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchSingleCampaign } from '../../../services/apis/CampaignApi';
import moment from 'moment';
import { CheckCircle, Clock, Hourglass, Users, XCircle } from 'lucide-react';
import {CampaignDetailsSkeleton} from '../../../skeltons/CampaignSkeltons';
import { fetchProfileById } from '../../../services/apis/ProfileApi';
import { createOrder, failedOrder, verifyOrder } from '../../../services/apis/RazorPayApi';
import { toaster } from '../../../services/Toaster';
import { CampaignContext } from '../../../contexts/CampainContext';
import { motion,AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { createTestimonial } from '../../../services/apis/TestimonialApi';
import { ClipLoader } from 'react-spinners';


declare global {
  interface Window {
    Razorpay: any;
  }
}

const UserViewCampaign = () => {
    const [open,setOpen]=useState(false);
      const [selectedAmount, setSelectedAmount] = useState('');
      const id=useParams()['id']!
      const [showTestimonialModal, setShowTestimonialModal] = useState(false);
      const [testimonialLoading,setTestimonialLoading]=useState(false)
      const [testimonial, setTestimonial] = useState({
        rating: 0,
        message: ""
      });

      const amounts = ["25", "50", "100", "250", "500", "1000"];

       const {data:campaign,isLoading,refetch}=useQuery({
        queryKey:['campaign',id],
        queryFn:()=>fetchSingleCampaign(id),
        enabled:!!id
     })

     const {setPaymentAdded}=useContext(CampaignContext)!

     const {data:profileData,isLoading:isProfileLoading}=useQuery({
      queryKey:['profile'],
      queryFn:()=>fetchProfileById(campaign.user_id),
      enabled:!!campaign
     })

     const onDonate = async () => {
         let GlobaltransactionId:any;
          if(!selectedAmount) return;
          const payload = { amount:Number(selectedAmount),campaignId:id };
          try {
            const orderResponse =await createOrder(payload)

            console.log("Order Response",orderResponse)

            GlobaltransactionId=orderResponse.transaction_id

            const options = {
              key:orderResponse.key,
              amount:orderResponse.amount,
              currency:"INR",
              order_id:orderResponse.orderId,
              handler:async function(response:any){

                const paymentData = {
                  ...response,
                  transactionId:orderResponse.transaction_id,
                  amount:payload.amount,
                  transactionStatus:"SUCCESS",
                  PaymentReference:response.razorpay_payment_id,
                  campaignID:id,
                  razorpay_order_id:response.razorpay_order_id
                }
                console.log('Payment data',paymentData)
                await verifyOrder(paymentData)
                refetch()
                toaster("❤️ Donation successfull! Your support makes a real difference.");
                setPaymentAdded("Payment done.")
                setShowTestimonialModal(true);
              }
            }
            const rzp = new window.Razorpay(options)

            rzp.on("payment.failed", async function(response:any){
              try{

                const failedData = {
                  transactionId:GlobaltransactionId,
                  amount:payload.amount,
                  transactionStatus:"FAILED",
                  PaymentReference:response.payment_id,
                  campaignID:id,
                  razorpay_order_id:orderResponse.data.orderId
                }
                await failedOrder(failedData);
              }catch(err){
                console.error("Failed to update transaction:",err)
              }

              toaster("Payment Failed")

            })

            rzp.open()

          } catch(error:any){
            console.error(error)
          }finally{
            setSelectedAmount('')
          }

     }

     const onSubmitTestimonial=async()=>{
      try {
           setTestimonialLoading(true);
        const formDataPayload=new FormData();
        formDataPayload.append("info",new Blob([JSON.stringify(testimonial)],{type:'application/json'})) ;
        await createTestimonial(formDataPayload);
        setShowTestimonialModal(false);
        toaster("Thanks for sharing your feedback! It helps others trust KindRaise.")
      } catch (error) {
        console.log(error)
      }finally{
        setTestimonialLoading(false);
      }
     }

    

     useEffect(()=>{
      console.log(profileData)
     },[profileData])

     useEffect(()=>{
      console.log(campaign)
     },[campaign])

        useEffect(() => {
      if (showTestimonialModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showTestimonialModal]);


  return (
    <>
    {isLoading||isProfileLoading?<CampaignDetailsSkeleton/>:
       <section className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">

      {/* Hero Image */}
      <div className="relative rounded-3xl overflow-hidden group" onClick={()=>{
            setOpen(true)
            console.log("clicked")
          }}>

        <img
        
          src={import.meta.env.VITE_KINDRAISE_API_URL+`/campaign/image/campaign/${campaign?.id}`}
          alt="Campaign Image"
          className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        <span className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800 text-xs font-semibold px-4 py-1 rounded-full text-emerald-600">
          {campaign?.category_title}
        </span>

      </div>

      {/* Title */}
      <div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
        {campaign?.title}
        </h1>

        <div className="flex items-center gap-4 mt-6">

          <img
          src={
         campaign?.id
            ? import.meta.env.VITE_KINDRAISE_API_URL+`/user/profile/image/${profileData?.profile?.id}`
            : "/unknownphoto.avif"
          }
            alt="org"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {profileData?.profile?.fullName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            {profileData?.profile?.role === "USER" ? "Community Member" : "Platform Administrator"}
            </p>
          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border dark:border-gray-700">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{campaign?.amount.toLocaleString("en-IN")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Raised of ₹{campaign?.goalAmount?.toLocaleString("en-In")} goal
            </p>
          </div>

          <div className="text-emerald-600 font-semibold text-lg">
            {((campaign?.amount / campaign?.goalAmount) * 100).toFixed(1)}% Funded
          </div>

        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mt-6 overflow-hidden">
          <div className="bg-emerald-500 h-3 rounded-full" style={{ width: `${(campaign.amount / campaign.goalAmount) * 100}%` }}></div>
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
  
        <span className="flex items-center gap-2">
          <Users size={18} className="text-blue-500" />
          {campaign?.totalDonors} {campaign?.totalDonors==1?"Donor":"Donors"}
        </span>

        <span className="flex items-center gap-2">
          <Hourglass size={18} className="text-orange-500" />
          {moment(campaign.deadline).diff(moment(), "days")} Days Left
        </span>

        </div>

      </div>

      {/* About Campaign */}
      <div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          About this campaign
        </h2>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {campaign?.description}
        </p>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
         Every contribution on KindRaise helps bring meaningful ideas to life. Your support empowers communities, fuels important initiatives, and creates lasting positive impact.
        </p>

      </div>

    </div>

    {/* RIGHT SIDEBAR */}
    <div className="space-y-8 sticky top-24 h-fit">

      {campaign?.status=="ACTIVE"?
      <>
      {/* Donation Card */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border dark:border-gray-700">

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Support this campaign
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Choose an amount to contribute
        </p>

        {/* Amount buttons */}
        <div className="grid grid-cols-3 gap-3">

          {amounts.map((amount) => (

            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`py-2 rounded-full border text-sm font-medium transition
              ${
                selectedAmount === amount
                  ? "bg-emerald-100 dark:bg-emerald-900 border-emerald-500 text-white "
                  : "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
              }`}
            >
              ₹{amount}
            </button>

          ))}

        </div>

        {/* Custom */}
        <input
          type="number"
          placeholder="Enter amount"
          value={selectedAmount}
          onChange={(e)=>setSelectedAmount(e.target.value)}
          className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white mt-6 rounded-full px-5 py-3 outline-none focus:border-emerald-500"
        />
           <motion.button onClick={onDonate} initial={{ opacity: 0, y: 3 }}  whileInView={{ opacity: 1, y: 0 }}  transition={{ duration: 0.4 }}  className="mt-6 w-full rounded-full py-3 font-semibold text-white shadow-md  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-900  bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500">
             Donate Now
            </motion.button>

        <p className="text-xs text-gray-400 text-center mt-4">
          🔒 Secure payments • 100% verified campaign
        </p>

      </div>

      {/* Volunteer */}
      <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-4">

        <h4 className="font-bold text-lg mb-2">
          Become a Volunteer
        </h4>

        <p className="text-sm text-gray-300 mb-4">
          Join our next planting event and help restore forests.
        </p>

        <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg text-sm transition">
          Learn More
        </button>

      </div>
      </>
      : 
      
  <div className="mt-6 space-y-4">

  {campaign.status === "PENDING" && (
    <StatusCard
      icon={Clock}
      title="Awaiting Approval"
      description="Your campaign is under review. It will go live once approved by the admin."
      color="bg-yellow-400"
      badge="Pending"
    />
  )}

  {campaign.status === "REJECTED" && (
    <StatusCard
      icon={XCircle}
      title="Not Approved"
      description="This campaign didn’t meet guidelines. Update details and resubmit."
      color="bg-red-500"
      badge="Rejected"
    />
  )}

  {campaign.status === "COMPLETED" && (
    <StatusCard
      icon={CheckCircle}
      title="Campaign Completed"
      description={
        campaign?.amount === campaign?.goalAmount
          ? "Successfully reached the goal and made an impact."
          : "Marked as completed by the campaign owner."
      }
      color="bg-emerald-500"
      badge="Completed"
    />
  )}

</div>
      }

    </div>

  </div>
    </section>
    
    }
    <AnimatePresence>
  {showTestimonialModal && (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowTestimonialModal(false)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
      >

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent blur-2xl opacity-40" />

        {/* Card */}
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl dark:border dark:border-gray-700 shadow-2xl rounded-2xl">

          {/* 🔥 Header */}
          <div className="flex flex-col items-center text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6">
            
            <img
              src="/logo.png"
              alt="KindRaise"
              className="h-12 mb-2 drop-shadow-md"
            />

            <h3 className="text-lg font-semibold tracking-wide flex items-center gap-4">
              Thank You for Your Support
            </h3>

            <p className="text-xs opacity-90 mt-1">
              Tell us about your experience with KindRaise
            </p>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5">

            {/* ⭐ Rating */}
            <div className="text-center">
              <p className="text-sm text-gray-800 dark:text-gray-400 mb-2">
                How was your experience?
              </p>

              <div className="flex justify-center gap-2">
                {[1,2,3,4,5].map((num)=>(
                  <motion.span
                    key={num}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={()=>setTestimonial(prev=>({...prev,rating:num}))}
                    className={`cursor-pointer text-3xl transition ${
                      num <= testimonial.rating
                        ? "text-yellow-400 drop-shadow-md"
                        : "text-gray-800 dark:text-gray-600"
                    }`}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <textarea
                rows={4}
                value={testimonial.message}
                onChange={(e)=>setTestimonial(prev=>({...prev,message:e.target.value}))}
                placeholder="How was your experience with KindRaise?"
                className="w-full p-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2">

              {/* Skip */}
              <button
                onClick={()=>setShowTestimonialModal(false)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Maybe later
              </button>

              {/* Submit */}
                        <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={onSubmitTestimonial}
              disabled={
                testimonialLoading ||
                !testimonial.message.trim() ||
                testimonial.rating === 0
              }
              className={`
                px-4 py-2 text-sm font-medium rounded-full
                flex items-center justify-center gap-2
                transition-all duration-300
                ${
                  testimonialLoading ||
                  !testimonial.message.trim() ||
                  testimonial.rating === 0
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg"
                }
              `}
            >
              {testimonialLoading ? (
                <ClipLoader size={14} color="white" />
              ) : (
                "Submit Feedback"
              )}
            </motion.button>

            </div>

          </div>

        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
        <Lightbox
      open={open}
      close={() => setOpen(false)}
      slides={[
        {
          src: campaign?.id
            ? `${import.meta.env.VITE_KINDRAISE_API_URL}/campaign/image/campaign/${campaign?.id}`
            : "",
        },
      ]}
      styles={{
        container: { backgroundColor: "rgba(0,0,0,0.85)" },
      }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
      }}
    />
    </>
  )
}

export default UserViewCampaign


const StatusCard = ({ icon: Icon, title, description, color, badge }:any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`relative flex items-start gap-4 p-5 rounded-2xl border 
      bg-white dark:bg-gray-900 
      border-gray-200 dark:border-gray-800 
      hover:shadow-lg transition-all duration-300 group`}
    >
      
      {/* LEFT ACCENT LINE */}
      <div className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${color}`} />

      {/* ICON */}
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:scale-105 transition">
        <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      {/* BADGE */}
      <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
        {badge}
      </span>
    </motion.div>
  );};