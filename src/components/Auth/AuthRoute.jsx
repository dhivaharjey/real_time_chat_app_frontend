import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import PageLoader from "../LoadingAnimations/PageLoader";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { authUser, isCheckingUserAuth } = useAuthStore();
  if (isCheckingUserAuth && !authUser) {
    return (
      <div className="h-dvh w-[100vw] flex items-center justify-center ">
        <PageLoader />
      </div>
    );
  }
  return !authUser ? <Outlet /> : <Navigate to="/" replace />;
};
export default AuthRoute;
