import { NavLink } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"
import CreateListModal from "@/components/molecules/CreateListModal"
import { useState } from "react"
import { toast } from "react-toastify"

const Sidebar = ({ lists, onAddList, onDeleteList }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreateList = (listData) => {
    const newList = {
      Id: Math.max(...lists.map(l => l.Id), 0) + 1,
      ...listData,
      createdAt: Date.now(),
      order: lists.length + 1
    }
    onAddList(newList)
    setShowCreateModal(false)
    toast.success("List created successfully!")
  }

  const handleDeleteList = (listId) => {
    if (window.confirm("Are you sure you want to delete this list? All tasks in this list will be deleted.")) {
      onDeleteList(listId)
      toast.success("List deleted successfully!")
    }
  }

  const navItems = [
    { 
      path: "/", 
      name: "All Tasks", 
      icon: "Inbox",
      exact: true
    },
    { 
      path: "/today", 
      name: "Today", 
      icon: "Calendar"
    },
    { 
      path: "/upcoming", 
      name: "Upcoming", 
      icon: "Clock"
    }
  ]

  return (
    <>
      <div className="w-80 h-screen bg-surface border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
              <p className="text-sm text-gray-500">Organize your workflow</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Overview
            </div>
            
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary shadow-sm" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-r-full" />
                    )}
                    <ApperIcon 
                      name={item.icon} 
                      size={20} 
                      className={cn(
                        "transition-colors",
                        isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                      )} 
                    />
                    <span className="font-medium">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Custom Lists */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                My Lists
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-primary"
                title="Create new list"
              >
                <ApperIcon name="Plus" size={16} />
              </button>
            </div>

            <div className="space-y-1">
              {lists.map((list) => (
                <div key={list.Id} className="group relative">
                  <NavLink
                    to={`/list/${list.Id}`}
                    className={({ isActive }) => cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                      isActive 
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary shadow-sm" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-r-full" />
                        )}
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: list.color }}
                        />
                        <span className="font-medium flex-1 truncate">{list.name}</span>
                      </>
                    )}
                  </NavLink>
                  
                  <button
                    onClick={() => handleDeleteList(list.Id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-100 hover:text-red-600 transition-all duration-200 text-gray-400"
                    title="Delete list"
                  >
                    <ApperIcon name="Trash2" size={14} />
                  </button>
                </div>
              ))}
              
              {lists.length === 0 && (
                <div className="text-center py-8">
                  <ApperIcon name="Folder" size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 mb-2">No custom lists yet</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Create your first list
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-success to-info rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Stay organized</p>
                <p className="text-xs text-gray-500">Keep your tasks in sync</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateListModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateList}
      />
    </>
  )
}

export default Sidebar