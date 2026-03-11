

export const CampaignCardSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-black animate-pulse">

      {/* Image Skeleton */}
      <div className="h-[220px] w-full bg-gray-700/50"></div>

      {/* Content */}
      <div className="px-3 py-3 space-y-3">

        {/* Title */}
        <div className="h-4 w-3/4 bg-gray-700 rounded"></div>

        {/* Description */}
        <div className="h-3 w-full bg-gray-700 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-700 rounded"></div>

        {/* Raised Amount */}
        <div className="h-3 w-32 bg-gray-700 rounded"></div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-gray-700 rounded-full"></div>

        {/* Goal & Days */}
        <div className="flex justify-between">
          <div className="h-2 w-16 bg-gray-700 rounded"></div>
          <div className="h-2 w-20 bg-gray-700 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-9 w-full bg-gray-700 rounded-xl"></div>

      </div>
    </div>
  );
};

