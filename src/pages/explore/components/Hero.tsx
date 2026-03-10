

const Hero = () => {
  return (
    <section className="relative h-[400px] flex items-center justify-center text-center text-white">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://static.vecteezy.com/system/resources/previews/047/411/853/non_2x/wavy-abstract-background-of-indian-independence-theme-annual-holiday-template-design-for-banner-greeting-card-poster-free-vector.jpg"
          alt="Support Causes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Discover Causes to Support
        </h1>

        <p className="mt-4 text-gray-200">
          Join a global community of donors fueling change for the environment,
          education, and human rights.
        </p>

        {/* Search Box */}
        <div className="mt-8 flex bg-white rounded-full overflow-hidden shadow-lg max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for campaigns, causes, or locations..."
            className="flex-1 px-6 py-3 text-gray-700 outline-none"
          />
          <button className="bg-emerald-500 px-8 text-white font-semibold hover:bg-emerald-600 transition">
            Search
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
