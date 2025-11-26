import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No items found",
  description = "Get started by creating your first item.",
  actionText = "Get Started",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        {/* Empty Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={40} className="text-primary" />
        </div>

        {/* Empty State Content */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Call to Action */}
        {onAction && (
          <Button 
            onClick={onAction}
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {actionText}
          </Button>
        )}

        {/* Motivational Message */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
          <p className="text-sm text-gray-600">
            💡 <strong>Pro tip:</strong> Use the quick add bar above to create tasks instantly, or explore the sidebar to organize your workflow.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Empty