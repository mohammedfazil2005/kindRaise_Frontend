import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

const CreateCampaign = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    deadline: "",
    categoryId: "",
    image: null
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e:any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImage = (e:any) => {

    const file = e.target.files[0];

    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }

  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    console.log(formData);
  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-8"
    >

      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Create Campaign
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Campaign Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
            placeholder="Enter campaign title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
            placeholder="Describe your campaign"
          />
        </div>

        {/* Goal Amount */}
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Goal Amount (₹)
          </label>

          <input
            type="number"
            name="goalAmount"
            value={formData.goalAmount}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
            placeholder="Enter fundraising goal"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Deadline
          </label>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="text-gray-600 dark:text-gray-300 mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Category
          </label>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800  text-gray-600 dark:text-gray-300 dark:border-gray-700"
          >
            <option value="">Select Category</option>
            <option value="5eeb05d0-8596-4632-9bae-3d191d529d7c">Education</option>
            <option value="c1">Medical</option>
            <option value="c2">Animals</option>
            <option value="c3">Environment</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Campaign Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="mt-2 hidden"
            id="campaign_image_id"
          />
         <motion.button type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById("campaign_image_id")?.click()} className=" flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-emerald-600 transition ">
        <Upload size={16} />
        Upload Image
        </motion.button>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 h-40 rounded-lg object-cover"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition"
        >
          Create Campaign
        </button>

      </form>

    </motion.div>

  );
};

export default CreateCampaign;