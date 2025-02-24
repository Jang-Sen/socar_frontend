import React from "react";
import Cookie from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const accessToken = Cookie.get("accessToken");

  return accessToken ? <Navigate to={"/profile"} replace /> : <Outlet />;
};

export default PublicRoute;
