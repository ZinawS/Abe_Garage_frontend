/**
 * Reusable Card Component
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Content to be rendered inside the card
 * @param {string} [props.className] - Additional CSS classes for customization
 * @param {string} [props.title] - Optional title for the card
 * @param {string} [props.subtitle] - Optional subtitle for the card
 * @returns {JSX.Element} A styled card component
 */
const Card = ({ children, className = '', title, subtitle }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;