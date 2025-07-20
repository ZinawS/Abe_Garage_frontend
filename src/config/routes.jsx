import { lazy } from "react";

// Lazy load page components for better performance
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() =>
  import("../pages/auth/ForgotPasswordPage")
);
const ResetPasswordPage = lazy(() => import("../pages/auth/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("../pages/auth/VerifyEmailPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const CustomersPage = lazy(() => import("../pages/customers/CustomersPage"));
const CustomerDetailPage = lazy(() =>
  import("../pages/customers/CustomerDetailPage")
);
const CustomerPortalPage = lazy(() =>
  import("../pages/customers/CustomerPortalPage")
);
const EmployeesPage = lazy(() => import("../pages/employees/EmployeesPage"));
const VehiclesPage = lazy(() => import("../pages/vehicles/VehiclesPage"));
const VehicleDetailPage = lazy(() =>
  import("../pages/vehicles/VehicleDetailPage")
);
const ServicesPage = lazy(() => import("../pages/services/ServicesPage"));
const OrdersPage = lazy(() => import("../pages/orders/OrdersPage"));
const OrderDetailPage = lazy(() => import("../pages/orders/OrderDetailPage"));
const InventoryPage = lazy(() => import("../pages/inventory/InventoryPage"));
const InvoicePage = lazy(() => import("../pages/billing/InvoicePage"));
const ReportsPage = lazy(() => import("../pages/reports/ReportsPage"));
const ContactPage = lazy(() => import("../pages/contact/ContactPage"));
const BookingPage = lazy(() => import("../pages/booking/BookingPage")); // New booking page
const BookingManagementPage = lazy(() =>
  import("../pages/booking/BookingManagementPage")
); // For staff
const NotFoundPage = lazy(() => import("../pages/404"));
const UnauthorizedPage = lazy(() => import("../pages/UnauthorizedPage"));

const routes = [
  // Public routes
  {
    path: "/",
    component: HomePage,
    layout: "public",
    exact: true,
  },
  {
    path: "/about",
    component: AboutPage,
    layout: "public",
    exact: true,
  },
  {
    path: "/contact",
    component: ContactPage,
    layout: "public",
  },
  {
    path: "/book-service",
    component: BookingPage,
    layout: "public",
  },
  {
    path: "/unauthorized",
    component: UnauthorizedPage,
    layout: "public",
  },
  {
    path: "*",
    component: NotFoundPage,
    layout: "public",
  },
  // Authentication routes
  {
    path: "/login",
    component: LoginPage,
    layout: "auth",
  },
  {
    path: "/register",
    component: RegisterPage,
    layout: "auth",
  },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
    layout: "auth",
  },
  {
    path: "/reset-password/:token",
    component: ResetPasswordPage,
    layout: "auth",
  },
  {
    path: "/verify-email/:token",
    component: VerifyEmailPage,
    layout: "auth",
  },
  // Protected dashboard routes
  {
    path: "/dashboard",
    component: DashboardPage,
    layout: "dashboard",
    auth: true,
  },
  // Admin-only routes
  {
    path: "/employees",
    component: EmployeesPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin"],
  },
  {
    path: "/reports",
    component: ReportsPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin"],
  },
  // Management routes (admin + manager)
  {
    path: "/customers",
    component: CustomersPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager"],
  },
  {
    path: "/customers/:id",
    component: CustomerDetailPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager"],
  },
  {
    path: "/inventory",
    component: InventoryPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager"],
  },
  {
    path: "/invoices",
    component: InvoicePage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager"],
  },
  {
    path: "/manage-bookings",
    component: BookingManagementPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager"],
  },
  // Technician routes
  {
    path: "/vehicles",
    component: VehiclesPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager", "technician"],
  },
  {
    path: "/vehicles/:id",
    component: VehicleDetailPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager", "technician"],
  },
  {
    path: "/services",
    component: ServicesPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager", "technician"],
  },
  {
    path: "/orders",
    component: OrdersPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager", "technician"],
  },
  {
    path: "/orders/:id",
    component: OrderDetailPage,
    layout: "dashboard",
    auth: true,
    roles: ["admin", "manager", "technician"],
  },
  // Customer portal
  {
    path: "/my-account",
    component: CustomerPortalPage,
    layout: "dashboard",
    auth: true,
    roles: ["customer"],
  },
  {
    path: "/my-bookings",
    component: CustomerPortalPage,
    layout: "dashboard",
    auth: true,
    roles: ["customer"],
  },
];

export default routes;
