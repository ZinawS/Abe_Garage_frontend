import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiTool,
  FiShoppingCart,
  FiFileText,
  FiPieChart,
  FiSettings,
} from "react-icons/fi";
import useAuth  from "../../hooks/useAuth";

/**
 * Sidebar Component
 *
 * Provides main navigation for the application with:
 * - Role-based menu items
 * - Active link highlighting
 * - Collapsible sections
 */
const Sidebar = () => {
  const { user, hasRole } = useAuth();

  // Navigation items
  const navigation = [
    {
      name: "Dashboard",
      to: "/",
      icon: FiHome,
      roles: ["admin", "manager", "technician", "receptionist"],
    },
    {
      name: "Customers",
      to: "/customers",
      icon: FiUsers,
      roles: ["admin", "manager", "receptionist"],
    },
    {
      name: "Vehicles",
      to: "/vehicles",
      icon: FiTool,
      roles: ["admin", "manager", "technician", "receptionist"],
    },
    {
      name: "Services",
      to: "/services",
      icon: FiTool,
      roles: ["admin", "manager", "technician"],
    },
    {
      name: "Orders",
      to: "/orders",
      icon: FiShoppingCart,
      roles: ["admin", "manager", "technician", "receptionist"],
    },
    {
      name: "Inventory",
      to: "/inventory",
      icon: FiShoppingCart,
      roles: ["admin", "manager"],
    },
    {
      name: "Reports",
      to: "/reports",
      icon: FiPieChart,
      roles: ["admin", "manager"],
    },
    {
      name: "Employees",
      to: "/employees",
      icon: FiUsers,
      roles: ["admin"],
    },
    {
      name: "Settings",
      to: "/settings",
      icon: FiSettings,
      roles: ["admin"],
    },
  ];

  // Filter navigation based on user roles
  const filteredNavigation = navigation.filter((item) =>
    item.roles.some((role) => hasRole(role))
  );

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center px-4">
            <h1 className="text-xl font-bold text-blue-600">AutoRex</h1>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    location.pathname === item.to
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User profile */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs font-medium text-gray-500">
                {user?.roles?.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
