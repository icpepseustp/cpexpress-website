import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../auth/Auth";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/admin-login" />;
  }
  return children;
};

export default ProtectedRoute;