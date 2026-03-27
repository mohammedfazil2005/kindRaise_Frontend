import { ShieldCheck, CreditCard, BadgeCheck } from "lucide-react";

function HomeTwo() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-emerald-50 overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-300/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>

          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Trusted & Secure{" "}
            <span className="text-emerald-500">Payments</span>
          </h2>

          <p className="text-gray-500 mt-4 text-sm">
            KindRaise ensures every donation is processed safely using
            industry-leading payment systems. We prioritize security,
            transparency, and reliability for every transaction.
          </p>

          {/* FEATURES */}
          <div className="mt-5 space-y-4">

            {/* Item 1 */}
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 group-hover:scale-110 transition">
                <ShieldCheck className="text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Advanced Security
                </h4>
                <p className="text-gray-500 text-xs">
                  All transactions are protected with encryption and secure protocols.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 group-hover:scale-110 transition">
                <CreditCard className="text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Seamless Payments
                </h4>
                <p className="text-gray-500 text-xs">
                  Fast and smooth payment experience with multiple payment options.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 group-hover:scale-110 transition">
                <BadgeCheck className="text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Razorpay Powered
                </h4>
                <p className="text-gray-500 text-xs">
                  Integrated with Razorpay for trusted, reliable, and widely accepted payments.
                </p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <button className="mt-5 w-[300px] bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-3 rounded-md shadow-lg transition">
           Get Started
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          {/* Glow */}
          <div className="absolute inset-0 bg-emerald-400/10 blur-2xl rounded-3xl"></div>

          {/* Image */}
          <img
            src="/razorpayperson.png"
            alt="Secure Payment"
            className="relative rounded-3xl w-full object-cover  transition duration-500"
          />

        </div>

      </div>
    </section>
  );
}

export default HomeTwo;