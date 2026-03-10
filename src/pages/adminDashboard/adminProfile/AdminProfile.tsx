import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const AdminProfile = () => {

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@email.com",
    phone: "9876543210",
    password: "",
    confirmPassword: ""
  });

  const [preview, setPreview] = useState(
    "https://i.pravatar.cc/150?img=1"
  );

  const handleChange = (e: any) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(profile);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow border dark:border-gray-700 mt-10 p-8"
    >

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account information and security
        </p>
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-3">

        <div className="relative">

          <img
            src={preview}
            className="w-20 h-20 rounded-full object-cover border"
          />

          <label className="absolute bottom-0 right-0 bg-emerald-500 p-1 rounded-full cursor-pointer">
            <Camera size={14} className="text-white" />
            <input
              type="file"
              className="hidden"
              onChange={handleImage}
            />
          </label>

        </div>

        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Personal Info */}
        <div>

        

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full text-gray-600 dark:text-gray-300  mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full text-gray-600 dark:text-gray-300 mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full text-gray-600 dark:text-gray-300   mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

          </div>

        </div>

        {/* Password Section */}
        <div className="mt-6">

            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Security
            </h3>

            <div className="flex items-center gap-4">
              <button  type="button"  className="  bg-emerald-500  text-white  px-4 py-2  rounded-lg  text-sm  font-semibold  hover:bg-emerald-600  transition  " >
                  Change Password
                </button>
             </div>

            <p className="text-xs text-gray-400 mt-2">
                Keep your account secure by updating your password regularly.
            </p>

        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition"
          >
            Save Changes
          </button>
        </div>

      </form>

    </motion.div>
  );
};

export default AdminProfile;