// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import React, { ReactElement } from "react";
import { getCurrentUser } from "../auth/authService";

interface ProtectedRouteProps {
  children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" replace />;
}
