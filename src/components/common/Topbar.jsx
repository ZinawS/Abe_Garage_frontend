import React, { useState } from "react";
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";
import useAuth  from "../../hooks/useAuth";
import NotificationBell from "../notifications/NotificationBell";
import SearchInput from "./SearchInput";

/**
 * Topbar Component
 *
 * Provides the top navigation bar with:
 * - Mobile menu toggle
 * - Search functionality
 * - Notifications
 * - User dropdown
 */
const Topbar = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Mobile menu button and logo */}
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center md:hidden">
              <h1 className="text-lg font-bold text-blue-600">AutoRex</h1>
            </div>
          </div>

          {/* Search bar */}
          <div
            className={`${searchOpen ? "block" : "hidden"} md:block flex-1 max-w-md ml-4`}
          >
            <SearchInput
              placeholder="Search..."
              className="w-full"
              onBlur={() => setSearchOpen(false)}
              autoFocus
            />
          </div>

          {/* Right side icons */}
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-900 mr-2"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch className="h-6 w-6" />
            </button>

            <NotificationBell />

            {/* User dropdown */}
            <div className="ml-3 relative">
              <div className="flex items-center">
                <button
                  type="button"
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  id="user-menu"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </span>
                  </div>
                </button>
              </div>

              {/* Dropdown menu */}
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
