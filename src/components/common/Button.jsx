import React from "react";
import { FiLoader } from "react-icons/fi";

/**
 * Button Component
 *
 * A reusable button component with:
 * - Multiple variants (primary, secondary, outline, danger)
 * - Loading state
 * - Icon support
 * - Responsive sizing
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  className = "",
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-transparent",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-transparent",
    outline:
      "bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 border-gray-300",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-blue-500 border-transparent",
  };

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type="button"
      className={`
        inline-flex items-center justify-center rounded-md border
        font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <FiLoader className="animate-spin mr-2 h-4 w-4" />
          {children}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
