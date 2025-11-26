import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const FilterToolbar = ({ 
  currentFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange 
}) => {
  const filterOptions = [
    { value: "all", label: "All", icon: "List" },
    { value: "active", label: "Active", icon: "Circle" },
    { value: "completed", label: "Completed", icon: "CheckCircle" }
  ]

  const sortOptions = [
    { value: "createdAt", label: "Created", icon: "Clock" },
    { value: "priority", label: "Priority", icon: "AlertTriangle" },
    { value: "dueDate", label: "Due Date", icon: "Calendar" },
    { value: "title", label: "Title", icon: "AlphabeticalOrder" }
  ]

  return (
    <div className="bg-surface rounded-xl border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                currentFilter === option.value
                  ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <ApperIcon name={option.icon} size={16} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm bg-surface"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterToolbar