import React, { useState } from 'react'
import { Heart, Share2, Check, Users } from 'lucide-react'

const CampaignDetails = () => {
     const [selectedAmount, setSelectedAmount] = useState('$50')
  const [customAmount, setCustomAmount] = useState('')
  const [showDonateSuccess, setShowDonateSuccess] = useState(false)

  const donationAmounts = ['$25', '$50', '$100', '$250', '$500', '$1k']

  const handleDonate = () => {
    setShowDonateSuccess(true)
    setTimeout(() => setShowDonateSuccess(false), 2000)
  }
  return (
     <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Section - Campaign Details */}
          <div className="lg:col-span-2">
            
            {/* Campaign Hero Image */}
            <div className="mb-6 rounded-3xl overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-laU6MLnORmZ3nkjiAk9C1waEVkzRk0.png"
                alt="Reforestation Amazon Campaign"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Campaign Title Section */}
            <div className="mb-8">
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                  ENVIRONMENT
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Reforesting the Amazon: Planting 10,000 Native Trees
              </h1>

              {/* Organization Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=gea"
                  alt="Global Earth Alliance"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">Global Earth Alliance</p>
                  <p className="text-sm text-gray-600">✓ Verified Non-profit</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-8">
                <span>📍 Manaus, Brazil</span>
              </div>
            </div>

            {/* Funding Stats */}
            <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
              <div className="mb-4">
                <p className="text-4xl font-bold text-gray-900 mb-2">$42,850</p>
                <p className="text-sm text-gray-600 mb-4">RAISED OF $60,000 TARGET</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '71%' }}></div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">71%</p>
                  <p className="text-sm text-gray-600">FUNDED</p>
                </div>
                <div className="flex gap-8 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">1,428 Donors</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">⏱ 12 Days left</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Campaign Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this campaign</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The Amazon rainforest is the lungs of our planet, but it is disappearing at an alarming rate. Our mission is to restore 50 hectares of critical wildlife corridors by planting 10,000 native tree species. These trees will provide habitat for endangered species and help sequester thousands of tons of carbon dioxide.
                </p>
                <p>
                  Every dollar donated goes directly toward seedling procurement, local labor for planting, and ongoing monitoring for the first three years to ensure high survival rates. Join us in making a tangible impact on the future of our climate.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Donation Panel */}
          <div className="lg:col-span-1">
            
            {/* Donation Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Make a Donation</h3>
              <p className="text-sm text-gray-600 mb-6">Select an amount to support this cause</p>

              {/* Donation Amount Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`py-3 rounded-lg font-semibold transition ${
                      selectedAmount === amount
                        ? 'bg-green-600 text-white border-2 border-green-600'
                        : 'bg-gray-100 text-gray-900 border-2 border-transparent hover:border-green-600'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  Enter custom amount
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <span className="text-gray-500 mr-2">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full mb-4 flex items-center justify-center gap-2 transition"
              >
                {showDonateSuccess ? (
                  <>
                    <Check size={20} /> Donated!
                  </>
                ) : (
                  <>
                    <Heart size={20} /> Donate Now
                  </>
                )}
              </button>

              {/* Terms Text */}
              <p className="text-xs text-gray-500 text-center mb-6">
                By donating, you agree to our Terms of Service and Privacy Policy. Secure payment via Stripe.
              </p>

              {/* Spread the Word */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-4 flex items-center justify-between">
                  Spread the word
                  <Share2 size={18} className="text-gray-600" />
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold transition">
                    Share
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold transition">
                    Copy
                  </button>
                </div>
              </div>

              {/* Volunteer CTA */}
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
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails
