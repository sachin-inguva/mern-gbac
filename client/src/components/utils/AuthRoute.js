import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/auth-context";

export function AuthRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return <div>{children}</div>;
}
