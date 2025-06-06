// src/common/routes/AuthGuards.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@constants";
import instagramIcon from "@assets/images/instagramIcon.png";
import metaText from "@assets/images/metaText.png";
import { useAuth } from "@context";

// Spinner component for reusability
const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-black">
    <img src={instagramIcon} alt="Loading" className="w-10 h-10 mb-6" />
    <img
      src={metaText}
      alt="From Meta"
      className="w-20 h-10 absolute bottom-8"
    />
  </div>
);

const AuthLayout:React.FC=()=>{
  const { userData, loading } = useAuth();
  const location = useLocation();

  // While auth state is loading
  if (loading) return <LoadingScreen />;

  // If already logged in, redirect to their profile
  if (userData) {
    return (
      <Navigate to="/" replace state={{ from: location }} />
    );
  }

   if (!userData) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return(
    <React.Fragment>
      <Outlet/>
    </React.Fragment>
  )
}

export default AuthLayout;