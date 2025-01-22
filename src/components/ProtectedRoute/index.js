import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isTokenExpired } from "../../utils/authStorage";


const ProtectedRoute = ({ children }) => {
  const { authenticated } = useSelector((state) => state.auth);
  if ( isTokenExpired()) {
    return <Navigate to="/employee-engagement/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
