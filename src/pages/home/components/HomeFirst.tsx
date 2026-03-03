import { Plus, Share2, HandHeart } from "lucide-react";
function HomeFirst() {
  return (
    <>
      <section className="py-20  text-center">
      <h2 className="text-4xl font-extrabold">Your Journey in 3 Steps</h2>
      <p className="text-gray-500 mt-3 max-w-xl mx-auto">
        We've streamlined the fundraising process so you can focus on what matters most: your mission.
      </p>

      <div className="grid md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto px-6">

        {/* Step 1 */}
        <div>
          <div className="bg-emerald-500 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white">
            <Plus />
          </div>
          <h3 className="mt-6 font-bold text-lg">1. Create</h3>
          <p className="text-gray-500 mt-2 text-sm font-semibold">
            Start your campaign in minutes with our intuitive builder. No technical skills,required
          </p>
         
        </div>

        {/* Step 2 */}
        <div>
          <div className="bg-emerald-500 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white">
            <Share2 />
          </div>
          <h3 className="mt-6 font-bold text-lg">2. Share</h3>
          <p className="text-gray-500 mt-2 text-sm font-semibold">
            Reach your community with built-in tools and email automation, and easy social sharing.
          </p>
         
        </div>

        {/* Step 3 */}
        <div>
          <div className="bg-emerald-500 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white">
            <HandHeart />
          </div>
          <h3 className="mt-6 font-bold text-lg">3. Impact</h3>
          <p className="text-gray-500 mt-2 text-sm font-semibold">
            Receive funds directly and change lives with seamless payouts. and transparent reporting
          </p>
          
        </div>

      </div>
        
    </section>
    <div className="flex justify-center items-center">
  <iframe 
    width="1060" 
    height="415" 
    src="https://www.youtube.com/embed/CiFoHm7HD94?si=AgWpJGt9z0YtGfMc"
    title="YouTube video player"
    frameBorder="0"
    allowFullScreen>
  </iframe>
</div>
    </>
  )
}

export default HomeFirst
