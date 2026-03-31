import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Eye, EyeOff, Verified, Bell, FolderHeart, HeartHandshake, Megaphone, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { onCheckUsernameAlreadyExists, onRegister } from "../../services/apis/AuthApi"
import { toaster } from "../../services/Toaster"
import { ClipLoader } from "react-spinners"


import { AuroraBackground } from "../../components/ui/aurora"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [usernameResponse, setUsernameResponse] = useState(Object)
  const [passwordChecker, setPasswordChecker] = useState(false)
  const [confirmPasswordChecker, setConfirmPasswordChecker] = useState(false)
  const [phoneNumberChecker, setPhoneNumberChecker] = useState(false)
  const [showProfilePhotoAdder, setShowProfilePhotoAdder] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState<string>("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "USER",
    status:"ACTIVE"
  })






  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e: any) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB


    if (!allowedTypes.includes(file.type)) {
      toaster("Only JPG, JPEG, and PNG files are allowed.");
      return;
    }


    if (file.size > maxSize) {
      toaster("File size must be less than 5MB.");
      return;
    }


    setProfilePhoto(file);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const checkingUsernameAlreadyExists = async (username: string) => {
    setCheckingUsername(true)

    try {
      const isAlreadyExists = await onCheckUsernameAlreadyExists(username)
      setUsernameResponse(isAlreadyExists)
      setCheckingUsername(false)
    } catch (error) {
      console.log(error)
    } finally {
      setCheckingUsername(false)
    }
  }

  const formChecker = () => {
    if (usernameResponse.status == true && !passwordChecker && !confirmPasswordChecker && !phoneNumberChecker && agreed) return true;
    return false;
  }

  const onContinueClick = async (e: any) => {
    e.preventDefault()
    if (!formChecker()) {
      toaster("Please fill out all required fields.")
      return
    }
    setShowProfilePhotoAdder(true)
  }

  const onCreateAccount = async () => {
    if (!profilePhoto) {
      toaster("Profile picture is required to create an account.");
      return;
    }
    setLoading(true)
    try {
      const multipartFormData = new FormData();

      multipartFormData.append("userinfo", new Blob([JSON.stringify(formData)], { type: "application/json" }));
      multipartFormData.append("file", profilePhoto);

      const response = await onRegister(multipartFormData);
      console.log(response)
      toaster(response.message)
      navigate("/login")
    } catch (error) {
      console.log(error)
      toaster("Something went wrong. Please contact the admin of KindRaise.")
    } finally {
      resetData()
      setLoading(false)
    }
  }

  const resetData = () => {
    setFormData({ ...formData, fullName: "", phone: "", username: "", password: "", confirmPassword: "", role: "USER",status:"ACTIVE" })
    setPreview("")
    setProfilePhoto(null)
  }



  useEffect(() => {
    if (!formData.username) {
      setUsernameResponse("")
      return;
    };
    if (formData.username.length <= 3) {
      setUsernameResponse({ status: false, message: "Username must have atleast four characters" })
      return;
    }
    const timer = setTimeout(() => {
      checkingUsernameAlreadyExists(formData.username);
    }, 500);
    return () => clearTimeout(timer);

  }, [formData.username]);

  useEffect(() => {
    setPasswordChecker(false)
    if (!formData.password) {
      return
    }
    if (formData.password.length <= 5) {
      setPasswordChecker(true)
      return;
    }
  }, [formData.password])

  useEffect(() => {
    setConfirmPasswordChecker(false)
    if (!formData.confirmPassword) return;
    if (formData.password != formData.confirmPassword) {
      setConfirmPasswordChecker(true)
      return
    }
  }, [formData.confirmPassword, formData.password])

  useEffect(() => {
    setPhoneNumberChecker(false)
    if (!formData.phone) return;
    if (formData.phone.length != 10) {
      setPhoneNumberChecker(true)
      return
    }
  }, [formData.phone])



  return (
    <>
    <AuroraBackground showRadialGradient={true} animationSpeed={15} className="pointer-events-none">
    <div className="min-h-screen flex items-center justify-center pointer-events-auto isolate">

     <div className="w-full max-w-6xl max-h-[640px] grid md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-xl">


    {/* LEFT SIDE - PREMIUM UI */}
    <div className="hidden md:flex flex-col justify-between p-10 h-full relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white">

      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl -top-10 -left-10"></div>
      <div className="absolute w-72 h-72 bg-black/10 rounded-full blur-3xl bottom-0 right-0"></div>

      {/* TOP CONTENT */}
      <div className="relative z-10">
        
        {/* Logo / Brand */}
        <img src="/logo.png" alt="logo" className="h-7 mb-2" />

        {/* Heading */}
        <h2 className="text-2xl font-bold leading-snug">
          Start Your  Fundraising Journey 
        </h2>

        <p className="text-white/80 text-xs mt-1 max-w-sm mb-3">
          Join thousands of people making a real impact. Create campaigns,
          donate securely, and track every contribution.
        </p>
      </div>

      {/* FEATURES */}
      <div className="relative z-10 space-y-4">

        {[
          { icon: Verified, title: "Verified Impact", desc: "Trusted by 10,000+ nonprofits." },
          { icon: Megaphone, title: "Explore Campaigns", desc: "Find causes that matter." },
          { icon: HeartHandshake, title: "Track Donations", desc: "See real-time impact." },
          { icon: FolderHeart, title: "Launch Campaigns", desc: "Start fundraising easily." },
          { icon: Bell, title: "Real-Time Updates", desc: "Instant notifications." },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition"
          >
            <div className="p-2 bg-white/20 rounded-lg">
              <item.icon size={18} />
            </div>

            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-white/80">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM TRUST */}
      <div className="relative z-10 text-xs text-white/70 mt-6">
        Trusted by creators worldwide 🌍
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="p-3 flex  overflow-y-auto items-center justify-center">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full "
      >
 <div className="w-full bg-white flex items-center justify-center p-3">

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full "
        >
          {!showProfilePhotoAdder && (
            <div>
              <img src="/logo.png" alt="logo" className="h-10 w-auto mb-4" />

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>

              <p className="text-gray-600 text-sm mb-8">
                Already have an account?{" "}
                <Link to={'/login'} className="text-emerald-600 font-semibold cursor-pointer">
                  Sign in
                </Link>
              </p>

            </div>
          )}

          {showProfilePhotoAdder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-5 mt-10 w-full"
            >

              {/* Back Button */}
              <button
                type="button"
                onClick={() => setShowProfilePhotoAdder(false)}
                className="self-start text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                ← Back
              </button>

              {/* Avatar Upload */}
              <label className="relative group cursor-pointer">

                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500 bg-gray-100 flex items-center justify-center shadow-md">

                  {preview ? (
                    <img
                      src={preview}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Upload</span>
                  )}

                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="text-white text-sm font-medium">
                    {profilePhoto ? " Change Photo" : "Select Photo"}
                  </span>
                </div>

                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

              </label>

              {/* Helper Text */}
              <p className="text-sm text-gray-600 text-center">
                Add a profile picture so others can recognize you
              </p>

              {/* File Info */}
              <p className="text-xs text-gray-400">
                Supported formats: JPG, PNG • Max size: 5MB
              </p>

              {/* Buttons */}
              <div className="w-full flex flex-col gap-3 mt-4">

                <motion.button onClick={onCreateAccount} disabled={loading} whileHover={!loading ? { scale: 1.03 } : {}} whileTap={{ scale: 0.97 }} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-full flex items-center justify-center shadow-lg">
                  {loading ? (
                    <ClipLoader size={20} color="#ffffff" />
                  ) : (
                    <>
                      Create Account<ArrowRight size={22} />
                    </>
                  )}
                </motion.button>

              </div>

            </motion.div>
          )}
          {!showProfilePhotoAdder && (
            <form className="space-y-4" onSubmit={onContinueClick}>



              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />

                <label className="absolute left-4 text-gray-500 text-xs transition-all  peer-placeholder-shown:top-4  peer-placeholder-shown:text-sm  peer-not-placeholder-shown:top-2  peer-not-placeholder-shown:text-xs  peer-focus:top-2  peer-focus:text-xs  peer-focus:text-emerald-600">
                  Full Name
                </label>
              </motion.div>

              {/* Username */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="relative"
              >
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />


                <label className="absolute left-4 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600">   Username
                </label>

                {/* Loader */}
                {checkingUsername && (
                  <div className="absolute right-3 top-4">
                    <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {usernameResponse && usernameResponse.status === true && (
                  <p className="text-green-500 text-xs m-2">Username is available. You can use it.</p>
                )}

                {usernameResponse && usernameResponse.status === false && (
                  <p className="text-red-500 text-xs m-2">{usernameResponse.message}</p>
                )}
              </motion.div>


              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />

                <label className="absolute left-4 text-gray-500 text-xs transition-all  peer-placeholder-shown:top-4  peer-placeholder-shown:text-sm  peer-not-placeholder-shown:top-2  peer-not-placeholder-shown:text-xs  peer-focus:top-2  peer-focus:text-xs  peer-focus:text-emerald-600">
                  Phone
                </label>
                {phoneNumberChecker && (
                  <p className="text-red-500 text-xs m-2">Please enter a valid 10-digit phone number.</p>
                )}
              </motion.div>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="relative"
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full px-4 pt-5 pb-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />

                  <label className="absolute left-4 text-gray-500 text-xs transition-all  peer-placeholder-shown:top-4  peer-placeholder-shown:text-sm  peer-not-placeholder-shown:top-2  peer-not-placeholder-shown:text-xs  peer-focus:top-2  peer-focus:text-xs  peer-focus:text-emerald-600">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  {passwordChecker && (
                    <p className="text-red-500 text-xs m-2">  Password should be at least 6 characters.</p>
                  )}
                </motion.div>



                {/* Confirm Password */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full px-4 pt-5 pb-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />

                  <label className="absolute left-4 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600">
                    Confirm Password
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  {confirmPasswordChecker && (
                    <p className="text-red-500 text-xs m-2"> Password confirmation does not match.</p>
                  )}
                </motion.div>

              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 text-xs lg:text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 accent-emerald-600"
                />
                <span>
                  I agree to the{" "}
                  <span className="text-emerald-600 font-medium cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-emerald-600 font-medium cursor-pointer">
                    Privacy Policy
                  </span>
                </span>
              </div>

              {/* Submit */}
              <motion.button
                onClick={onContinueClick}

                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-full transition-all shadow-lg shadow-emerald-200 flex items-center justify-center"
              >
                Continue <ArrowRight size={22} />
              </motion.button>

            </form>
          )}


        </motion.div>
      </div>

      </motion.div>
    </div>

  </div>
    </div>
   </AuroraBackground>
    </>
  )
}