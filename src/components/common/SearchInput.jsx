/**
 * Search Input Component
 *
 * A reusable search input field with debounced onChange and clear functionality
 *
 * @param {Object} props - Component props
 * @param {string} props.value - Current search value
 * @param {Function} props.onChange - Callback when search value changes
 * @param {string} [props.placeholder='Search...'] - Input placeholder text
 * @param {number} [props.debounce=300] - Debounce delay in milliseconds
 * @returns {JSX.Element} Search input field
 */
const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  debounce = 300,
}) => {
  let debounceTimer;

  const handleChange = (e) => {
    const newValue = e.target.value;

    // Clear previous timer
    clearTimeout(debounceTimer);

    // Set new timer
    debounceTimer = setTimeout(() => {
      onChange(newValue);
    }, debounce);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        defaultValue={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Search icon */}
      <div className="absolute left-3 top-2.5 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {/* Clear button */}
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
