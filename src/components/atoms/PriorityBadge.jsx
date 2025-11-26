import { cn } from "@/utils/cn"

const PriorityBadge = ({ priority, isOverdue = false }) => {
  const variants = {
    high: {
      color: "text-error",
      bg: "bg-error/10",
      border: "border-error/20"
    },
    medium: {
      color: "text-warning", 
      bg: "bg-warning/10",
      border: "border-warning/20"
    },
    low: {
      color: "text-info",
      bg: "bg-info/10", 
      border: "border-info/20"
    }
  }

  const variant = variants[priority] || variants.medium

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-200",
        variant.color,
        variant.bg,
        variant.border,
        isOverdue && "priority-pulse"
      )}
    >
      {priority === "high" && "High"}
      {priority === "medium" && "Medium"}  
      {priority === "low" && "Low"}
    </span>
  )
}

export default PriorityBadge