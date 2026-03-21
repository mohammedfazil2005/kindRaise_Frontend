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