import { format, isToday, isPast, isTomorrow } from "date-fns"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const DueDateIndicator = ({ dueDate, completed = false }) => {
  if (!dueDate) return null

  const date = new Date(dueDate)
  const isOverdue = isPast(date) && !completed && !isToday(date)
  const isDueToday = isToday(date)
  const isDueTomorrow = isTomorrow(date)

  let displayText = ""
  let iconName = "Calendar"
  let colorClass = "text-gray-500"
  let bgClass = "bg-gray-100"

  if (isOverdue) {
    displayText = "Overdue"
    iconName = "AlertCircle"
    colorClass = "text-error"
    bgClass = "bg-error/10"
  } else if (isDueToday) {
    displayText = "Today"
    iconName = "Clock"
    colorClass = "text-accent"
    bgClass = "bg-accent/10"
  } else if (isDueTomorrow) {
    displayText = "Tomorrow"
    iconName = "Clock"
    colorClass = "text-warning"
    bgClass = "bg-warning/10"
  } else {
    displayText = format(date, "MMM d")
    iconName = "Calendar"
    colorClass = "text-gray-500"
    bgClass = "bg-gray-100"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200",
        colorClass,
        bgClass,
        completed && "opacity-60"
      )}
    >
      <ApperIcon name={iconName} size={12} />
      <span>{displayText}</span>
    </div>
  )
}

export default DueDateIndicator