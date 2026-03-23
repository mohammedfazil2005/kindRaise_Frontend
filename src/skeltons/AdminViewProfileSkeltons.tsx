

export const AdminViewProfileHeaderSkeleton = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg">

        {/* TOP STRIP */}
        <div className="h-28 bg-gray-200 dark:bg-gray-800" />

        {/* CONTENT */}
        <div className="px-6 pb-6">
          
          {/* AVATAR + NAME */}
          <div className="flex items-end gap-5 -mt-14">
            
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-gray-900" />

            {/* Name Section */}
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
              <div className="h-4 w-56 bg-gray-200 dark:bg-gray-800 rounded-md" />
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
            
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2"
              >
                <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            ))}
          </div>

          {/* STATUS BADGE */}
          <div className="mt-6">
            <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

