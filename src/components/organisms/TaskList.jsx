import React, { useEffect, useState } from "react";
import TaskCard from "@/components/molecules/TaskCard";
import TaskFormModal from "@/components/molecules/TaskFormModal";
import FilterToolbar from "@/components/molecules/FilterToolbar";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";

const TaskList = ({ filter = "all", listId = null, title = "Tasks", lists = [] }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingTask, setEditingTask] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentFilter, setCurrentFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [draggedTask, setDraggedTask] = useState(null)

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const savedTasks = localStorage.getItem("taskflow-tasks")
      let allTasks = savedTasks ? JSON.parse(savedTasks) : []
      
      // Apply filters
      let filteredTasks = allTasks

      // Filter by list if specified
      if (listId) {
        filteredTasks = filteredTasks.filter(task => task.listId === parseInt(listId))
      }

      // Filter by date/status
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      switch (filter) {
        case "today":
          filteredTasks = filteredTasks.filter(task => {
            if (!task.dueDate) return false
            const dueDate = new Date(task.dueDate)
            dueDate.setHours(0, 0, 0, 0)
            return dueDate.getTime() === today.getTime()
          })
          break
        case "upcoming":
          filteredTasks = filteredTasks.filter(task => {
            if (!task.dueDate) return false
            const dueDate = new Date(task.dueDate)
            return dueDate >= tomorrow
          })
          break
      }

      // Apply status filter
      switch (currentFilter) {
        case "active":
          filteredTasks = filteredTasks.filter(task => !task.completed)
          break
        case "completed":
          filteredTasks = filteredTasks.filter(task => task.completed)
          break
      }

      // Apply sorting
      filteredTasks.sort((a, b) => {
        switch (sortBy) {
          case "priority":
            const priorityOrder = { high: 3, medium: 2, low: 1 }
            return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
          case "dueDate":
            if (!a.dueDate && !b.dueDate) return 0
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1
            return new Date(a.dueDate) - new Date(b.dueDate)
          case "title":
            return a.title.localeCompare(b.title)
          default: // createdAt
            return b.createdAt - a.createdAt
        }
      })

      setTasks(filteredTasks)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [filter, listId, currentFilter, sortBy])

  // Listen for storage changes (when tasks are added via quick add)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "taskflow-tasks") {
        loadTasks()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [filter, listId, currentFilter, sortBy])

  const handleCompleteTask = async (taskId) => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("taskflow-tasks") || "[]")
      const updatedTasks = savedTasks.map(task => 
        task.Id === taskId 
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? Date.now() : null
            }
          : task
      )
      
      localStorage.setItem("taskflow-tasks", JSON.stringify(updatedTasks))
      
      const task = updatedTasks.find(t => t.Id === taskId)
      toast.success(task.completed ? "Task completed!" : "Task reopened!")
      
      loadTasks()
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowEditModal(true)
  }

  const handleUpdateTask = async (taskData) => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("taskflow-tasks") || "[]")
      const updatedTasks = savedTasks.map(task =>
        task.Id === editingTask.Id
          ? { ...task, ...taskData }
          : task
      )
      
      localStorage.setItem("taskflow-tasks", JSON.stringify(updatedTasks))
      setShowEditModal(false)
      setEditingTask(null)
      toast.success("Task updated successfully!")
      
      loadTasks()
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const savedTasks = JSON.parse(localStorage.getItem("taskflow-tasks") || "[]")
        const updatedTasks = savedTasks.filter(task => task.Id !== taskId)
        
        localStorage.setItem("taskflow-tasks", JSON.stringify(updatedTasks))
        toast.success("Task deleted successfully!")
        
        loadTasks()
      } catch (error) {
        toast.error("Failed to delete task")
      }
    }
  }

  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e, targetTask) => {
    e.preventDefault()
    
    if (!draggedTask || draggedTask.Id === targetTask.Id) {
      setDraggedTask(null)
      return
    }

    // Reorder tasks
    const savedTasks = JSON.parse(localStorage.getItem("taskflow-tasks") || "[]")
    const draggedIndex = savedTasks.findIndex(task => task.Id === draggedTask.Id)
    const targetIndex = savedTasks.findIndex(task => task.Id === targetTask.Id)
    
    const updatedTasks = [...savedTasks]
    const [removed] = updatedTasks.splice(draggedIndex, 1)
    updatedTasks.splice(targetIndex, 0, removed)
    
    // Update order numbers
    updatedTasks.forEach((task, index) => {
      task.order = index + 1
    })
    
    localStorage.setItem("taskflow-tasks", JSON.stringify(updatedTasks))
    setDraggedTask(null)
    
    loadTasks()
  }

  if (loading) return <Loading />
  if (error) return <ErrorView message={error} onRetry={loadTasks} />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            {currentFilter !== "all" && ` • ${currentFilter}`}
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <FilterToolbar
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Task List */}
      {tasks.length === 0 ? (
        <Empty 
          title={currentFilter === "completed" ? "No completed tasks" : "No tasks found"}
          description={
            currentFilter === "completed" 
              ? "Tasks you complete will appear here."
              : filter === "today"
              ? "No tasks due today. Great job staying on top of things!"
              : filter === "upcoming"
              ? "No upcoming tasks scheduled."
              : "Start by adding your first task above."
          }
          actionText="Add Task"
          onAction={() => document.querySelector('input[placeholder="Add a new task..."]')?.focus()}
        />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.Id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, task)}
              className={cn(
                "transition-transform duration-200",
                draggedTask?.Id === task.Id && "transform rotate-2 scale-105 z-50 dragging"
              )}
            >
              <TaskCard
                task={task}
                lists={lists}
                onComplete={() => handleCompleteTask(task.Id)}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.Id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Edit Task Modal */}
      <TaskFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setEditingTask(null)
        }}
        onSubmit={handleUpdateTask}
        task={editingTask}
        lists={lists}
        title="Edit Task"
      />
    </div>
  )
}

export default TaskList