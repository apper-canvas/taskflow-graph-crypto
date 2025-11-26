import ApperIcon from "@/components/ApperIcon"

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-lg w-32 animate-pulse" />
        </div>
      </div>

      {/* Filter Toolbar Skeleton */}
      <div className="bg-surface rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse" />
            ))}
          </div>
          <div className="h-8 bg-gray-200 rounded-lg w-32 animate-pulse" />
        </div>
      </div>

      {/* Task Cards Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-surface rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-5 h-5 bg-gray-200 rounded border-2 mt-1 animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-lg w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-lg w-2/3 animate-pulse" />
                <div className="flex space-x-3">
                  <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded-full w-12 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="text-center py-8">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <ApperIcon name="Loader2" size={20} className="animate-spin" />
          <span className="text-sm">Loading your tasks...</span>
        </div>
      </div>
    </div>
  )
}

export default Loading