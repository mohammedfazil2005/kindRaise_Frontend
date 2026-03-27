    

const HomeKindRaiseDetails = () => {
  return (
    <section className="w-full bg-gray-50 py-20 px-6 lg:px-20 h-screen">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
            KindRaise The{" "}
            <span className="text-emerald-500 font-extrabold">
              Smart Donation Platform
            </span>{" "}
            for Impactful Giving
          </h1>

          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            KindRaise is a modern donation platform designed to connect donors 
            with meaningful causes. It empowers individuals to contribute easily 
            while ensuring transparency, trust, and real impact.
          </p>

          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            From fundraising campaigns to real-time progress tracking, KindRaise 
            simplifies the entire donation experience. Our platform bridges the gap 
            between people who want to help and those who truly need it.
          </p>

          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            We believe in building a community driven by compassion, where every 
            contribution counts. Together, we create opportunities, change lives, 
            and make the world a better place.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex gap-4">
            <button className="px-6 w-[300px] py-3 bg-emerald-500 text-white rounded-md shadow-md hover:bg-emerald-600 transition">
              Start Donating
            </button>
            
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          

          <img
            src="/homedetailsimg.jpg"
            alt="KindRaise"
            className="relative w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default HomeKindRaiseDetails;