import React from 'react';

/**
 * Switch Component
 * 
 * A customizable toggle switch with:
 * - Smooth animations
 * - Accessibility support
 * - Customizable colors
 */
const Switch = ({ enabled, onChange, label, className = '' }) => {
  return (
    <label className={`flex items-center ${className}`}>
      {label && <span className="mr-2 text-sm font-medium text-gray-700">{label}</span>}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={() => onChange(!enabled)}
        />
        <div
          className={`block w-10 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
            enabled ? 'transform translate-x-4' : ''
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;