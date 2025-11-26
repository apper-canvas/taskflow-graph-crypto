import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          "w-full px-3 py-2 border rounded-lg bg-surface text-gray-900 placeholder-gray-400 transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          error 
            ? "border-error focus:ring-error" 
            : "border-gray-300 hover:border-gray-400",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input