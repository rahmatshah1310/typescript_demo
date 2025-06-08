import React from "react";
import { ROUTES } from "@constants";
import { SignUp ,Login} from "@pages";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import {AuthLayout,AppLayout} from "@layouts";
import {Home,Profile} from "@pages";

const AppRoutes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path={ROUTES.auth} element={<AuthLayout />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
          <Route path="/:username" element={<Profile />} />
      </Route>
    </RouterRoutes>
  );
};

export default AppRoutes;
