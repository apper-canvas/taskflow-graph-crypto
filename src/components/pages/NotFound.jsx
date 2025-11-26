import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="FileX" size={64} className="text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">!</span>
          </div>
        </div>

        {/* Error Content */}
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have vanished into the task void. 
          Let's get you back to organizing your workflow.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105 w-full sm:w-auto"
          >
            <ApperIcon name="Home" size={16} className="mr-2" />
            Go to All Tasks
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
            Go Back
          </Button>
        </div>

        {/* Quick Navigation */}
        <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/today")}
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 transition-colors text-sm text-gray-700 hover:text-gray-900"
            >
              <ApperIcon name="Calendar" size={16} />
              <span>Today</span>
            </button>
            <button
              onClick={() => navigate("/upcoming")}
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 transition-colors text-sm text-gray-700 hover:text-gray-900"
            >
              <ApperIcon name="Clock" size={16} />
              <span>Upcoming</span>
            </button>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Having trouble? The best way to get things done is to start with your tasks.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound