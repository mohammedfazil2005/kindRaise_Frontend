

const HomeThird = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#0f172a] to-[#0b1f3a] text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>

          {/* Stars */}
          <div className="flex gap-1 mb-6 text-emerald-400">
            ★ ★ ★ ★ ★
          </div>

          {/* Testimonial Text */}
          <h2 className="text-3xl lg:text-4xl font-semibold leading-relaxed max-w-xl">
            "KindRaise helped us exceed our goal by 140% in just two weeks.
            The platform is incredibly intuitive."
          </h2>

          {/* User Info */}
          <div className="flex items-center gap-4 mt-8">
            <img
              src="/user.jpg"
              alt="user"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h5 className="font-semibold">Sarah Johnson</h5>
              <p className="text-sm text-gray-300">
                Director, GreenEarth Foundation
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center">

          {/* Background Image */}
          <img
            src="/donation-image.png"
            alt="Campaign"
            className="absolute -top-10 right-10 w-48 opacity-90"
          />

          {/* Glass Card */}
          <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-xl shadow-xl w-full max-w-sm">

            <p className="text-sm text-gray-300">Target $50,000</p>

            <h3 className="text-3xl font-bold mt-2">$42,500</h3>
            <p className="text-sm text-gray-300">RAISED</p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 h-2 rounded-full mt-6">
              <div className="bg-emerald-500 h-2 rounded-full w-[85%]"></div>
            </div>

            <div className="flex justify-between mt-4 text-sm text-gray-300">
              <span>412 Donors</span>
              <span>85%</span>
            </div>

            {/* Button */}
            <button className="mt-8 bg-emerald-500 hover:bg-emerald-600 transition w-full py-3 rounded-full font-semibold">
              Donate Now
            </button>

          </div>
        </div>

      </div>
    </section>
  )
}

export default HomeThird
