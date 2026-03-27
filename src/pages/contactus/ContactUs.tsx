import { useState, useEffect } from "react";

const FloatingDot = ({ className, style }:any) => (
  <div className={`absolute rounded-full opacity-40 ${className}`} style={style} />
);

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.phone && formData.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 relative overflow-hidden">

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 blur-3xl"></div>

      {/* Floating Dots */}
      <FloatingDot className="w-5 h-5 bg-white" style={{ top: "120px", left: "200px" }} />
      <FloatingDot className="w-4 h-4 bg-emerald-300" style={{ top: "250px", right: "180px" }} />
      <FloatingDot className="w-6 h-6 bg-green-200" style={{ bottom: "200px", left: "300px" }} />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center pt-16 pb-24 px-4"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}
      >
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Get in Touch with KindRaise
        </h1>

        <p className="text-emerald-100 text-center max-w-xl mb-12">
          Have questions about donations, campaigns, or fundraising?  
          Our KindRaise team is here to help you make an impact 💚
        </p>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">

          {/* LEFT SIDE */}
          <div className="flex-1 text-white space-y-6">

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>

              <div className="space-y-4 text-sm">
                <p>📞 +91 98765 43210</p>
                <p>📧 support@kindraise.org</p>
                <p>📍 Kerala, India</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-3">Why Contact Us?</h2>

              <ul className="text-sm space-y-2 list-disc ml-4 text-emerald-100">
                <li>Start your own fundraising campaign</li>
                <li>Need help with donations</li>
                <li>Report issues or get support</li>
                <li>Partnership & collaboration</li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div
            className="flex-1 bg-white rounded-2xl shadow-2xl p-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.3s",
            }}
          >
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name *"
                className="input"
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="input"
              />
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone *"
              className="input mb-4"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="input mb-4"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className="input mb-6 resize-none"
            />

            {/* Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg text-white font-bold text-sm tracking-widest uppercase 
              bg-gradient-to-r from-emerald-500 to-emerald-700 
              hover:from-emerald-600 hover:to-emerald-800 
              transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 active:scale-95"
            >
              {submitted ? "✓ Message Sent!" : "Send Message"}
            </button>

            <p className="text-center text-gray-400 text-xs mt-4">
              We respect your privacy. Your data is safe with KindRaise.
            </p>
          </div>
        </div>
      </div>

      {/* Tailwind Input Style */}
      <style >{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14px;
          background: #f9fafb;
          transition: all 0.2s ease;
        }

        .input:focus {
          outline: none;
          border-color: #10b981;
          background: white;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }
      `}</style>
    </div>
  );
}