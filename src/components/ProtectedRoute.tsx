// src/components/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // 1. Check if the user has the admin token
  const token = localStorage.getItem("admin_token");

  // 2. If no token is found, kick them out to the login page immediately.
  // "replace" ensures they can't click the browser Back button to return here.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. If token exists, render the child route (the AdminDashboard).
  return <Outlet />;
};

export default ProtectedRoute;