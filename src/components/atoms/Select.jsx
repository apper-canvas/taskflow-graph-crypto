import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Select = forwardRef(({ 
  className, 
  options = [],
  error,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      <select
        className={cn(
          "w-full px-3 py-2 border rounded-lg bg-surface text-gray-900 transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          error 
            ? "border-error focus:ring-error" 
            : "border-gray-300 hover:border-gray-400",
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Select.displayName = "Select"

export default Select