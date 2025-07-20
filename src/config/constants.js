/**
 * Application Constants
 *
 * Centralized location for all application constants and enums
 */

export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  TECHNICIAN: "technician",
  CUSTOMER: "customer",
};

export const SERVICE_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: "credit_card",
  DEBIT_CARD: "debit_card",
  CASH: "cash",
  CHECK: "check",
  BANK_TRANSFER: "bank_transfer",
  OTHER: "other",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
};

export const VEHICLE_TYPES = {
  CAR: "car",
  TRUCK: "truck",
  SUV: "suv",
  VAN: "van",
  MOTORCYCLE: "motorcycle",
  OTHER: "other",
};

export const INVENTORY_STATUS = {
  IN_STOCK: "in_stock",
  LOW_STOCK: "low_stock",
  OUT_OF_STOCK: "out_of_stock",
};

export const NOTIFICATION_TYPES = {
  SYSTEM: "system",
  SERVICE: "service",
  PAYMENT: "payment",
  APPOINTMENT: "appointment",
};

export const DATE_FORMATS = {
  SHORT_DATE: "MM/dd/yyyy",
  LONG_DATE: "MMMM dd, yyyy",
  DATE_TIME: "MM/dd/yyyy hh:mm a",
};

export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 25, 50],
};
