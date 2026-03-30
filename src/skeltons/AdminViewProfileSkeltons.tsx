

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


export const TestimonialSkeleton = () => {
  return (
    <div className="mx-auto max-w-sm px-4 py-20 md:max-w-4xl md:px-8 lg:px-12 animate-pulse">
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
        
        {/* Image Skeleton */}
        <div>
          <div className="h-80 w-full rounded-3xl bg-gray-300 dark:bg-neutral-700"></div>
        </div>

        {/* Text Skeleton */}
        <div className="flex flex-col justify-between py-4">
          
          <div>
            {/* Name */}
            <div className="h-6 w-40 rounded bg-gray-300 dark:bg-neutral-700"></div>

            {/* Role */}
            <div className="mt-3 h-4 w-28 rounded bg-gray-200 dark:bg-neutral-600"></div>

            {/* Quote */}
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-600"></div>
              <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-neutral-600"></div>
              <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-neutral-600"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-12 md:pt-0">
            <div className="h-7 w-7 rounded-full bg-gray-300 dark:bg-neutral-700"></div>
            <div className="h-7 w-7 rounded-full bg-gray-300 dark:bg-neutral-700"></div>
          </div>
        </div>

      </div>
    </div>
  );
};