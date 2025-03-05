import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PublicRoute = () => {
  // const accessToken = Cookie.get("accessToken");
  const { user } = useAuth();
  const location = useLocation(); // 🔥 현재 페이지 확인

  if (
    user &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    return <Navigate to={"/profile"} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
