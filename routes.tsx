import { ROUTES } from "@constants";
import { Home, Login, Profile, SignUp } from "@pages";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppLayout } from "@layouts";
import { PostDetails } from "@components";

const AppRoutes: React.FC = () => {
  return (
    <>
      <RouterRoutes>
        <Route path={ROUTES.auth}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path=":username" element={<Profile />} />
          <Route path="p/:postId" element={<PostDetails />} />
        </Route>
      </RouterRoutes>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover draggable theme="colored" />
    </>
  );
};

export default AppRoutes;
