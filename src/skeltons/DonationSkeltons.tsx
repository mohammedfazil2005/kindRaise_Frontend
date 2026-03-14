export const DonationCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 p-4 animate-pulse space-y-3">

      {/* Title */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>

      {/* Donation text */}
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>

      {/* Raised */}
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2">

        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>

        <div className="h-7 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

      </div>

    </div>
  );
};

export const DonationStatsCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse">

      <div className="flex items-center justify-between">

        {/* Left Content */}
        <div className="space-y-3">

          {/* Title */}
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>

          {/* Value */}
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>

          {/* Small text */}
          <div className="h-3 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>

        </div>

        {/* Icon */}
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>

      </div>

    </div>
  );
};