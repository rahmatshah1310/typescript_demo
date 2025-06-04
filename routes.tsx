import React from "react";
import { ROUTES } from "@constants";
import { SignUp ,Login} from "@pages";
import { Routes as RouterRoutes, Route } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path={ROUTES.signup} element={<SignUp />} />
      <Route path={ROUTES.login} element={<Login />} />
    </RouterRoutes>
  );
};

export default AppRoutes;
