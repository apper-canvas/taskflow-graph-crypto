import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const ErrorView = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertTriangle" size={32} className="text-error" />
        </div>

        {/* Error Message */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-8">
          {message}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center space-x-4">
          {onRetry && (
            <Button onClick={onRetry} className="bg-gradient-to-r from-primary to-secondary">
              <ApperIcon name="RotateCcw" size={16} className="mr-2" />
              Try Again
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Refresh Page
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600">
            If this problem persists, try refreshing the page or check your internet connection.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorView