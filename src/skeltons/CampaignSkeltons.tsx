

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



export const CampaignDetailsSkeleton = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">

          {/* Hero Image */}
          <div className="w-full h-[420px] bg-gray-300 dark:bg-gray-700 rounded-3xl"></div>

          {/* Title + Org */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border dark:border-gray-700 space-y-6">

            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>
              </div>

              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            </div>

            <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

            <div className="flex justify-between">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>

          {/* About Campaign */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>

          {/* Updates */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>

            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-5 space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>

        </div>


        {/* RIGHT SIDEBAR */}
        <div className="space-y-8 sticky top-24 h-fit">

          {/* Donation Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border dark:border-gray-700 space-y-6">

            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-52"></div>

            <div className="grid grid-cols-3 gap-3">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-gray-300 dark:bg-gray-700 rounded-full"
                  ></div>
                ))}
            </div>

            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-40 mx-auto"></div>
          </div>

          {/* Volunteer */}
          <div className="bg-gray-800 rounded-xl p-6 space-y-3">
            <div className="h-5 bg-gray-600 rounded w-32"></div>
            <div className="h-3 bg-gray-600 rounded w-48"></div>
            <div className="h-10 bg-gray-600 rounded w-32"></div>
          </div>

        </div>

      </div>
    </section>
  );
};





export const DashboardCampaignUserCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border shadow-sm dark:border-gray-700 animate-pulse">
      <div className="flex items-center justify-between">

        <div className="space-y-3">
          <div className="h-3 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>

      </div>
    </div>
  );
};