import { CreditCard, ShieldCheck, Headphones } from "lucide-react";
function HomeTwo() {
  return (
   <section className="bg-[#f8fafc] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center flex-wrap gap-6">
          <div>
            <h2 className="text-3xl font-extrabold">Why Choose KindRaise?</h2>
            <p className="text-gray-500 max-w-xl">
              Powerful features designed to maximize your fundraising potential.
            </p>
          </div>

          <button className="bg-gray-900 text-white px-6 py-3 rounded-full">
            View All Features
          </button>
        </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">

  {/* Card 1 */}
  <div style={{background:'url("https://img.freepik.com/premium-vector/white-abstract-background-white-grey-gray-abstract-modern-background-design-designed-poster-template-web-backdrop-banner-social-media-template-app-background-business-presentation_249611-12555.jpg")'}} className="roup relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:-translate-y-3">
    <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-lg mb-4">
      <CreditCard className="text-emerald-600 w-6 h-6" />
    </div>

    <h4 className="font-semibold text-lg text-gray-800">
      Low Platform Fees
    </h4>

    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
      Flat fee structure with no hidden costs.
    </p>
  </div>

  {/* Card 2 */}
  <div  style={{background:'url("https://img.freepik.com/premium-vector/white-abstract-background-white-grey-gray-abstract-modern-background-design-designed-poster-template-web-backdrop-banner-social-media-template-app-background-business-presentation_249611-12555.jpg")'}} className="roup relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:-translate-y-3">
    <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-lg mb-4">
      <ShieldCheck className="text-emerald-600 w-6 h-6" />
    </div>

    <h4 className="font-semibold text-lg text-gray-800">
      Secure Payments
    </h4>

    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
      Enterprise-grade encryption and PCI compliance.
    </p>
  </div>

  {/* Card 3 */}
  <div style={{background:'url("https://img.freepik.com/premium-vector/white-abstract-background-white-grey-gray-abstract-modern-background-design-designed-poster-template-web-backdrop-banner-social-media-template-app-background-business-presentation_249611-12555.jpg")'}} className="broup relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:-translate-y-3 ">
    <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-lg mb-4">
      <Headphones className="text-emerald-600 w-6 h-6" />
    </div>

    <h4 className="font-semibold text-lg text-gray-800">
      24/7 Expert Support
    </h4>

    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
      Dedicated team available around the clock.
    </p>
  </div>

</div>
      </div>
    </section>
  )
}

export default HomeTwo
