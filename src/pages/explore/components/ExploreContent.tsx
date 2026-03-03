import React, { useState } from 'react'

const categories = [
  "All Categories",
  "Environment",
  "Education",
  "Health",
  "Animal Welfare",
  "Human Rights",
];
const ExploreContent = () => {
    const [active, setActive] = useState("All Categories");
  return (
     <section className="bg-gray-100 py-7">
      <div className="max-w-7xl mx-auto px-6">

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border
              ${
                active === category
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50 hover:border-emerald-400"
              }
            `}
          >
            {category}
        </button>
      ))}
    </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <div className="relative">
              <img
                src="https://marketplace.canva.com/EAGVQcTw2Jo/1/0/1131w/canva-orange-and-pink-gradient-minimalist-cancer-awareness-poster-uq9iTx_nzCI.jpg"
                alt="Campaign"
                className="w-full h-40 object-cover"
              />
              <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full">
                ENVIRONMENT
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg">
                Amazon Reforestation Project
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Help us plant 10,000 native trees to restore habitat...
              </p>

              {/* Progress */}
              <div className="mt-4">
                <p className="text-emerald-600 font-semibold text-sm">
                  $45,230 raised
                </p>

                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[75%]"></div>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Goal: $60,000</span>
                  <span>12 Days Left</span>
                </div>
              </div>

              <button className="mt-4 w-full bg-gray-100 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
                View Campaign
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ExploreContent
