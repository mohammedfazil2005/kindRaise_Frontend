export const NotificationSkeleton = () => {
  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse">
      
      <div className="flex justify-between items-start">

        <div className="space-y-2 w-full">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        </div>

        <div className="w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

      </div>

      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mt-3"></div>

    </div>
  );
};