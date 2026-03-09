import axios from 'axios';

import { useState } from 'react'

declare global {
  interface Window {
    Razorpay: any;
  }
}

const UserViewCampaign = () => {
      const [selectedAmount, setSelectedAmount] = useState('');

      const amounts = ["25", "50", "100", "250", "500", "1000"];

     const onDonate = async () => {

      let GlobaltransactionId:any;

          if(!selectedAmount) return;

          const payload = { amount:Number(selectedAmount),campaignId:"22857f95-1419-4e87-acbd-f359155322c8" };

          try {

            const orderResponse = await axios.post(
              "http://localhost:8080/api/razorpay/create",
              payload,
              {
                headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              }
            )

            console.log("Order Response",orderResponse)

            GlobaltransactionId=orderResponse.data.transaction_id

            const options = {
              key:orderResponse.data.key,
              amount:orderResponse.data.amount,
              currency:"INR",
              order_id:orderResponse.data.orderId,
            

              handler:async function(response:any){

                const paymentData = {
                  ...response,
                  transactionId:orderResponse.data.transaction_id,
                  amount:payload.amount,
                  transactionStatus:"SUCCESS",
                  PaymentReference:response.razorpay_payment_id,
                  campaignID:"22857f95-1419-4e87-acbd-f359155322c8",
                  razorpay_order_id:response.razorpay_order_id
                }

                console.log('Payment data',paymentData)

                

                await axios.post(
                  "http://localhost:8080/api/razorpay/verify",
                  paymentData,
                  {
                    headers:{
                      Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                  }
                )

                alert("Payment Verified!")

              }
            }

            const rzp = new window.Razorpay(options)

            rzp.on("payment.failed", async function(response:any){

              try{

                const failedData = {
                  transactionId:GlobaltransactionId,
                  amount:payload.amount,
                  transactionStatus:"FAILED",
                  PaymentReference:response?.error?.metadata?.payment_id,
                  campaignID:"22857f95-1419-4e87-acbd-f359155322c8",
                  razorpay_order_id:orderResponse.data.orderId
                }

                await axios.post(
                  "http://localhost:8080/api/razorpay/payment-failed",
                  failedData,
                  {
                    headers:{
                      Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                  }
                )

              }catch(err){
                console.error("Failed to update transaction:",err)
              }

              alert("Payment Failed")

            })

            rzp.open()

          } catch(error:any){
            console.error(error)
          }

     }
  return (
       <section className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">

    {/* LEFT CONTENT */}
    <div className="lg:col-span-2 space-y-10">

      {/* Hero Image */}
      <div className="relative rounded-3xl overflow-hidden group">

        <img
          src="https://www.greenpeace.org/static/planet4-international-stateless/2024/05/0262516d-gp0su0pd6-1024x683.jpg"
          alt="Reforestation"
          className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        <span className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800 text-xs font-semibold px-4 py-1 rounded-full text-emerald-600">
          ENVIRONMENT
        </span>

      </div>

      {/* Title */}
      <div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Reforesting the Amazon: Planting 10,000 Native Trees
        </h1>

        <div className="flex items-center gap-4 mt-6">

          <img
            src="/org.jpg"
            alt="org"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              Global Earth Alliance
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Verified Non-profit · Manaus, Brazil
            </p>
          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border dark:border-gray-700">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹42,850
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Raised of ₹60,000 goal
            </p>
          </div>

          <div className="text-emerald-600 font-semibold text-lg">
            71% Funded
          </div>

        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mt-6 overflow-hidden">
          <div className="bg-emerald-500 h-3 rounded-full w-[71%]"></div>
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
          <span>👥 1,428 Donors</span>
          <span>⏳ 12 Days Left</span>
        </div>

      </div>

      {/* About Campaign */}
      <div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          About this campaign
        </h2>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          The Amazon rainforest is the lungs of our planet, but it is disappearing
          at an alarming rate. Our mission is to restore 50 hectares of critical
          wildlife corridors by planting 10,000 native tree species.
        </p>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
          Every donation helps procure seedlings, support local farmers,
          and maintain long-term ecological monitoring to ensure success.
        </p>

      </div>

      {/* Updates */}
      <div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Latest Updates
        </h2>

        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-5">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            🌱 First 1,000 trees planted successfully! Thank you to all our supporters.
          </p>
          <span className="text-xs text-gray-400">
            2 days ago
          </span>
        </div>

      </div>

    </div>

    {/* RIGHT SIDEBAR */}
    <div className="space-y-8 sticky top-24 h-fit">

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

        <button
          onClick={onDonate}
          className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-full font-semibold transition"
        >
          Donate Now
        </button>

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

      </div>

    </div>

  </div>
</section>
  )
}

export default UserViewCampaign
