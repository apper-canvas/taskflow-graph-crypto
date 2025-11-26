import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const QuickAddBar = ({ lists }) => {
  const [taskTitle, setTaskTitle] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedListId, setSelectedListId] = useState("")
  const [priority, setPriority] = useState("medium")

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!taskTitle.trim()) {
      toast.error("Please enter a task title")
      return
    }

    // Get existing tasks from localStorage
    const existingTasks = JSON.parse(localStorage.getItem("taskflow-tasks") || "[]")
    
    // Create new task
    const newTask = {
      Id: Math.max(...existingTasks.map(t => t.Id), 0) + 1,
      title: taskTitle.trim(),
      description: "",
      priority,
      dueDate: null,
      listId: selectedListId || null,
      completed: false,
      createdAt: Date.now(),
      completedAt: null,
      order: existingTasks.length + 1
    }

    // Save to localStorage
    const updatedTasks = [...existingTasks, newTask]
    localStorage.setItem("taskflow-tasks", JSON.stringify(updatedTasks))

    // Reset form
    setTaskTitle("")
    setSelectedListId("")
    setPriority("medium")
    setIsExpanded(false)

toast.success("Task added successfully!")

    // Trigger a storage event to update other components
    window.dispatchEvent(new CustomEvent("storage", {
      detail: {
        key: "taskflow-tasks",
        newValue: JSON.stringify(updatedTasks)
      }
    }))
  }

  const priorityOptions = [
    { value: "high", label: "High", color: "text-error", bg: "bg-error/10" },
    { value: "medium", label: "Medium", color: "text-warning", bg: "bg-warning/10" },
    { value: "low", label: "Low", color: "text-info", bg: "bg-info/10" }
  ]

  return (
    <div className="sticky top-0 z-30 bg-surface border-b border-gray-200 shadow-sm">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick Add Input */}
          <div className="relative">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <ApperIcon name="Plus" size={14} className="text-white" />
              </div>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder="Add a new task..."
                className="flex-1 text-lg font-medium border-none outline-none bg-transparent placeholder-gray-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isExpanded ? "bg-primary/10 text-primary" : "hover:bg-gray-100 text-gray-400"
                )}
              >
                <ApperIcon name="Settings" size={16} />
              </button>
            </div>
          </div>

          {/* Expanded Options */}
          {isExpanded && (
            <div className="animate-fade-in-up bg-gray-50 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* List Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    List
                  </label>
                  <select
                    value={selectedListId}
                    onChange={(e) => setSelectedListId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="">No List</option>
                    {lists.map(list => (
                      <option key={list.Id} value={list.Id}>
                        {list.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <div className="flex space-x-2">
                    {priorityOptions.map(option => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPriority(option.value)}
                        className={cn(
                          "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          priority === option.value
                            ? cn(option.bg, option.color)
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false)
                    setTaskTitle("")
                    setSelectedListId("")
                    setPriority("medium")
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!taskTitle.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Add Task
                </button>
              </div>
            </div>
          )}

          {/* Simple Add Button for collapsed state */}
          {!isExpanded && taskTitle.trim() && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm"
              >
                Add Task
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default QuickAddBar