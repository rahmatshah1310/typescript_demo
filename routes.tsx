import React from "react";
import { ROUTES } from "@constants";
import { Login, SignUp } from "@pages";
import { Routes as RouterRoutes, Route } from "react-router-dom";
// import { AuthLayout, AppLayout } from "@layouts";
// import { Home, Profile } from "@pages";
import { ToastContainer } from "react-toastify";
// import SignUp from "src/pages/Signup";
// import Login from "src/pages/Login";
// import PostDetails from "./src/pages/Profile/components/PostDetails";

const AppRoutes: React.FC = () => {
  return (
    <>
      {" "}
      <RouterRoutes>
        <Route path={ROUTES.auth}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path=":username" element={<Profile />} />
        {/* <Route path="p/:postId" element={<PostDetails isOpen />} /> */}
        {/* </Route> */}
      </RouterRoutes>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover draggable theme="colored" />
    </>
  );
};

export default AppRoutes;
