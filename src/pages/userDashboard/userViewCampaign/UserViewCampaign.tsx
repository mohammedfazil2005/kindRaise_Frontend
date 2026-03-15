import { useQuery } from '@tanstack/react-query';


import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchSingleCampaign } from '../../../services/apis/CampaignApi';
import moment from 'moment';
import { Hourglass, Users } from 'lucide-react';
import {CampaignDetailsSkeleton} from '../../../skeltons/CampaignSkeltons';
import { fetchProfileById } from '../../../services/apis/ProfileApi';
import { createOrder, failedOrder, verifyOrder } from '../../../services/apis/RazorPayApi';
import { toaster } from '../../../services/Toaster';
import { CampaignContext } from '../../../contexts/CampainContext';
import { motion } from 'framer-motion';


declare global {
  interface Window {
    Razorpay: any;
  }
}

const UserViewCampaign = () => {
      const [selectedAmount, setSelectedAmount] = useState('');
      const id=useParams()['id']!

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

    

     useEffect(()=>{
      console.log(profileData)
     },[profileData])

     useEffect(()=>{
      console.log(campaign)
     },[campaign])


  return (
    <>
    {isLoading||isProfileLoading?<CampaignDetailsSkeleton/>:
       <section className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">

    
        <div className="lg:col-span-2 space-y-10">

      {/* Hero Image */}
      <div className="relative rounded-3xl overflow-hidden group">

        <img
          src={import.meta.env.VITE_KINDRAISE_API_URL+`/campaign/image/campaign/${campaign.id}`}
          alt="Reforestation"
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
            src={import.meta.env.VITE_KINDRAISE_API_URL+`/user/profile/image/${profileData.id}`}
            alt="org"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {profileData?.fullName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            {profileData?.role === "USER" ? "Community Member" : "Platform Administrator"}
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

      {campaign.status=="ACTIVE"?
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
                  ? "bg-emerald-100 dark:bg-emerald-900 border-emerald-500 text-emerald-600"
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
      <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-6">

        <h4 className="font-bold text-lg mb-2">
          Become a Volunteer
        </h4>

        <p className="text-sm text-gray-300 mb-4">
          Join our next planting event and help restore forests.
        </p>

        <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg text-sm transition">
          Learn More
        </button>

      </div>:
      </>
      :  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border dark:border-gray-700 text-center">

    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Donations Unavailable
    </h3>

    <p className="text-sm text-gray-500 dark:text-gray-400">
      {campaign.status === "PENDING" && "This campaign is waiting for admin approval."}
      {campaign.status === "REJECTED" && "This campaign was rejected and cannot accept donations."}
      {campaign.status === "COMPLETED" && "This campaign has successfully completed."}
    </p>

  </div>
      }

    </div>

  </div>
</section>
    }
    </>
  )
}

export default UserViewCampaign
