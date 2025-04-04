import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/LoadingAnimations/PageLoader";
import { ToastContainer } from "react-toastify";
import AuthRoute from "./components/Auth/AuthRoute";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const App = () => {
  const { checkAuth, authUser, isCheckingUserAuth } = useAuthStore();

  // console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, []);
  if (isCheckingUserAuth && !authUser) {
    return (
      <div className="h-dvh w-[100vw] flex items-center justify-center  ">
        <PageLoader />
      </div>
    );
  }
  return (
    <div>
      <ToastContainer autoClose={3000} />
      {authUser && <NavBar />}
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
