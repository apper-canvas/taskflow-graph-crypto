import { useState } from "react"
import { format, isToday, isPast, isTomorrow } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import PriorityBadge from "@/components/atoms/PriorityBadge"
import DueDateIndicator from "@/components/atoms/DueDateIndicator"
import { cn } from "@/utils/cn"

const TaskCard = ({ task, lists = [], onComplete, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const taskList = lists.find(list => list.Id === task.listId)
  
  const handleComplete = (e) => {
    e.stopPropagation()
    
    // Add completion animation class
    const card = e.target.closest('.task-card')
    if (card && !task.completed) {
      card.classList.add('task-complete-animation')
      setTimeout(() => {
        onComplete()
      }, 300)
    } else {
      onComplete()
    }
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit()
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <div
      className={cn(
        "task-card bg-surface rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group",
        task.completed && "opacity-60 bg-gray-50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEdit}
    >
      <div className="flex items-start space-x-4">
        {/* Completion Checkbox */}
        <button
          onClick={handleComplete}
          className={cn(
            "mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 hover:scale-110",
            task.completed
              ? "bg-success border-success text-white"
              : "border-gray-300 hover:border-primary"
          )}
        >
          {task.completed && (
            <ApperIcon name="Check" size={14} className="text-white" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3 className={cn(
                "font-semibold text-gray-900 mb-2 transition-all duration-200",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>

              {/* Description */}
              {task.description && (
                <p className={cn(
                  "text-gray-600 text-sm mb-3 line-clamp-2",
                  task.completed && "text-gray-400"
                )}>
                  {task.description}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex items-center space-x-3">
                {/* Priority Badge */}
                <PriorityBadge 
                  priority={task.priority} 
                  isOverdue={task.dueDate && isPast(new Date(task.dueDate)) && !task.completed}
                />

                {/* Due Date */}
                {task.dueDate && (
                  <DueDateIndicator dueDate={task.dueDate} completed={task.completed} />
                )}

                {/* List Tag */}
                {taskList && (
                  <div className="flex items-center space-x-1">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: taskList.color }}
                    />
                    <span className="text-xs text-gray-500 font-medium">
                      {taskList.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className={cn(
              "flex items-center space-x-2 transition-all duration-200",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            )}>
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-gray-400"
                title="Edit task"
              >
                <ApperIcon name="Edit2" size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors text-gray-400"
                title="Delete task"
              >
                <ApperIcon name="Trash2" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Celebration */}
      {task.completed && task.completedAt && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <ApperIcon name="CheckCircle" size={14} className="text-success" />
            <span>Completed {format(new Date(task.completedAt), "MMM d 'at' h:mm a")}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskCard