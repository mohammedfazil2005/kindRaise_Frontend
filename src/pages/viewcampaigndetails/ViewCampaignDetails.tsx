import { Users } from 'lucide-react';
import React, { useState } from 'react'

const ViewCampaignDetails = () => {
      const [selectedAmount, setSelectedAmount] = useState(50);

      const amounts = [25, 50, 100, 250, 500, 1000];
  return (
     <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">

          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://www.greenpeace.org/static/planet4-international-stateless/2024/05/0262516d-gp0su0pd6-1024x683.jpg"
              alt="Reforestation"
              className="w-full h-[400px] object-cover"
            />
            <span className="absolute top-6 left-6 bg-white text-emerald-600 text-xs font-semibold px-4 py-1 rounded-full">
              ENVIRONMENT
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Reforesting the Amazon: Planting 10,000 Native Trees
            </h1>

            {/* Organization Info */}
            <div className="flex items-center gap-4 mt-5">
              <img
                src="/org.jpg"
                alt="org"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  Global Earth Alliance
                </p>
                <p className="text-sm text-gray-500">
                  Verified Non-profit · Manaus, Brazil
                </p>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  $42,850
                </h2>
                <p className="text-sm text-gray-500">
                  Raised of $60,000 Target
                </p>
              </div>
              <div className="text-emerald-600 font-semibold text-lg">
                71% Funded
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-3 rounded-full mt-6">
              <div className="bg-emerald-500 h-3 rounded-full w-[71%]"></div>
            </div>

            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span>1,428 Donors</span>
              <span>12 Days Left</span>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              About this campaign
            </h2>

            <p className="text-gray-600 leading-relaxed">
              The Amazon rainforest is the lungs of our planet, but it is disappearing at an alarming rate.
              Our mission is to restore 50 hectares of critical wildlife corridors by planting 10,000 native tree species.
              These trees will provide habitat for endangered species and help sequester thousands of tons of carbon dioxide.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              Every dollar donated goes directly toward seedling procurement,
              local labor for planting, and ongoing monitoring for the first three years to ensure high survival rates.
              Join us in making a tangible impact on the future of our climate.
            </p>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">

          {/* Donation Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">
              Make a Donation
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Select an amount to support this cause
            </p>

            {/* Amount Buttons */}
            <div className="grid grid-cols-3 gap-4">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-2 rounded-full border font-medium transition
                    ${
                      selectedAmount === amount
                        ? "bg-emerald-100 border-emerald-500 text-emerald-600"
                        : "bg-gray-50 border-gray-300 text-gray-700 hover:border-emerald-400"
                    }
                  `}
                >
                  ${amount >= 1000 ? "1k" : amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">
                Enter custom amount
              </p>
              <input
                type="number"
                placeholder="$ 0.00"
                className="w-full border rounded-full px-5 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <button className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-full font-semibold transition">
              Donate Now
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              By donating, you agree to our Terms of Service and Privacy Policy.
              Secure payment via Stripe.
            </p>
          </div>

          {/* Volunteer Card */}
          <div className="bg-gray-900 text-white rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Users size={24} className="text-green-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Become a Volunteer</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Join our local teams for the next planting event in Manaus this spring.
                    </p>
                    <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg text-sm transition">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

        </div>

      </div>
    </section>
  )
}

export default ViewCampaignDetails
