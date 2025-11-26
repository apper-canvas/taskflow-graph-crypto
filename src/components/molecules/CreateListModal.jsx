import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const CreateListModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("")
  const [color, setColor] = useState("#6366F1")
  const [error, setError] = useState("")

  const colorOptions = [
    "#6366F1", // Primary
    "#8B5CF6", // Secondary  
    "#EC4899", // Accent
    "#10B981", // Success
    "#F59E0B", // Warning
    "#EF4444", // Error
    "#3B82F6", // Info
    "#8B7355", // Brown
    "#6B7280", // Gray
    "#059669", // Emerald
    "#DC2626", // Red
    "#7C3AED"  // Violet
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError("List name is required")
      return
    }
    
    onSubmit({ name: name.trim(), color })
    setName("")
    setColor("#6366F1")
    setError("")
  }

  const handleClose = () => {
    setName("")
    setColor("#6366F1")
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-scale-in">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Create New List</h3>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                List Name
              </label>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
                placeholder="Enter list name..."
                error={error}
                autoFocus
              />
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose Color
              </label>
              <div className="grid grid-cols-6 gap-3">
                {colorOptions.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    onClick={() => setColor(colorOption)}
                    className={cn(
                      "w-10 h-10 rounded-full transition-all duration-200 hover:scale-110",
                      color === colorOption 
                        ? "ring-2 ring-offset-2 ring-gray-400 scale-110" 
                        : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
                    )}
                    style={{ backgroundColor: colorOption }}
                  >
                    {color === colorOption && (
                      <ApperIcon name="Check" size={16} className="text-white mx-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">Preview:</div>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-medium text-gray-900">
                  {name || "Your list name"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!name.trim()}
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105"
              >
                Create List
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateListModal