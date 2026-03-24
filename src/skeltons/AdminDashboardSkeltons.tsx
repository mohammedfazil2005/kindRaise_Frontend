import { motion } from "framer-motion";


export const AdminDashboardCardSkeleton = () => {
  return (
    <div
      className="
      relative
      bg-white dark:bg-gray-900
      p-6 rounded-2xl
      border border-gray-200 dark:border-gray-700
      shadow-sm
      overflow-hidden
      animate-pulse
      "
    >
      {/* Icon Skeleton */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Title Skeleton */}
      <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-3" />

      {/* Value Skeleton */}
      <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-3" />

      {/* Subtitle Skeleton */}
      <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
    </div>
  );
};




export const AdminDashboardActivityRowSkeleton = () => {
  return (
    <div
      className="
      flex justify-between items-center
      border-b border-gray-200 dark:border-gray-700
      pb-4 last:border-none
      animate-pulse
      "
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        
        {/* Avatar Skeleton */}
        <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700" />

        {/* User Info */}
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-2 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        
        {/* Amount Skeleton */}
        <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded" />

        {/* Button Skeleton */}
        <div className="h-7 w-16 bg-gray-300 dark:bg-gray-700 rounded-lg" />

      </div>
    </div>
  );
};



export  function AdminCampaignRequestCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 * 0.1 }}
      className="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-700
        rounded-2xl
        p-5
        shadow-sm
        flex gap-5 items-center
        animate-pulse
      "
    >
      {/* Image Skeleton */}
      <div className="w-28 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 space-y-3">

        {/* Title */}
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Creator */}
        <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Category + Goal */}
        <div className="flex gap-4">
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

      </div>

      {/* Buttons Skeleton */}
      <div className="flex gap-2">

        <div className="h-7 w-14 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />

      </div>
    </motion.div>
  );
}




export const RazorpaySkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 animate-pulse">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-5">

          {/* Title */}
          <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>

          {/* Input 1 */}
          <div>
            <div className="h-4 w-32 mb-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>

          {/* Input 2 */}
          <div>
            <div className="h-4 w-40 mb-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>

          {/* Select */}
          <div>
            <div className="h-4 w-28 mb-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>

          {/* Button */}
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center">
          <div className="w-40 h-40 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        </div>

      </div>
    </div>
  );
};



 export const TransactionsHeaderSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">

      {/* TOP SECTION */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* ICON */}
          <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700"></div>

          {/* TITLE + SUBTITLE */}
          <div className="space-y-2">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-72 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

        </div>

      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* SEARCH */}
        <div className="flex-1 h-12 rounded-xl bg-gray-200 dark:bg-gray-800"></div>

        {/* STATUS FILTER */}
        <div className="w-full md:w-44 h-12 rounded-xl bg-gray-200 dark:bg-gray-800"></div>

        {/* CAMPAIGN FILTER */}
        <div className="w-full md:w-52 h-12 rounded-xl bg-gray-200 dark:bg-gray-800"></div>

      </div>

    </div>
  );
};
