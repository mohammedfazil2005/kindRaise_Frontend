

export const ProfileSkelton = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow border dark:border-gray-700 mt-10 p-8 animate-pulse">

  {/* Heading */}
  <div className="mb-8">
    <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
    <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>

  {/* Profile Header */}
  <div className="flex items-center gap-6 mb-8">

    {/* Avatar */}
    <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>

    <div className="space-y-2">
      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>

  </div>

  {/* Form Skeleton */}
  <div className="grid md:grid-cols-2 gap-4 mb-8">

    <div>
      <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>

    <div>
      <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>

    <div>
      <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>

  </div>

  {/* Security Section */}
  <div className="mb-6">

    <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

    <div className="h-9 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-2"></div>

    <div className="h-3 w-72 bg-gray-200 dark:bg-gray-700 rounded"></div>

  </div>

  {/* Save Button */}
  <div className="flex justify-end">
    <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
  </div>

</div>
  )
}


