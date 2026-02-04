import { UserRole } from "../context/AuthContext";

export const redirectByRole = (role: UserRole) => {
  switch (role) {
    case "customer":
      return "/customer/dashboard";

    case "vendor":
    case "event-planner":
    case "freelance-planner":
      return "/vendor/dashboard";

    case "admin":
    case "super-admin":
      return "/admin/dashboard";

    default:
      return "/";
  }
};
