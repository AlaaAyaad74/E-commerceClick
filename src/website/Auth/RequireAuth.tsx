import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
  children?: ReactNode; // Expect children if passed
}

function RequireAuth({ children }: RequireAuthProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />; // If children are passed, render them, otherwise render <Outlet>
}

export default RequireAuth;
