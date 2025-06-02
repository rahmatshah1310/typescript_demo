import {
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { PublicRoute, ProtectedRoute } from "@common/AuthGuard";

import {
  Home,
  Profile,
  Explore,
  Login,
  SignUp,
  Notifications,
  CreatePost,
  Messages,
  NotFound,
} from "@pages";

import PostDetails from "@pages/Profile/components/PostDetails";

import AppLayout from "@common/AppLayout";
import PostDetails from "@pages/Profile/components/PostDetails";
import { ROUTES } from "@constants";
import { useAuth } from "@features/context/AuthContext";
import instagramIcon from "@assets/images/instagramIcon.png";
import metaText from "@assets/images/metaText.png";
import { ToastContainer } from "react-toastify";
import LoadingBar from "@components/common/LoadingBar";
import { useEffect } from "react";
import NProgress from "nprogress";

export default function ReactRouter() {
  const { loading } = useAuth();
  const location = useLocation();
  const navigationType = useNavigationType();
  const background = location.state?.backgroundLocation;

  // Handle route changes
  useEffect(() => {
    if (navigationType === "POP") {
      NProgress.start();
    }
  }, [navigationType]);

  // Handle initial loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <img src={instagramIcon} alt="Loading" className="w-20 h-20 mb-6" />
        <img
          src={metaText}
          alt="From Meta"
          className="w-20 h-10 absolute bottom-8"
        />
      </div>
    );
  }

  return (
    <>
      <LoadingBar />
      <Routes location={background || location}>
        {/* Public Routes */}
        <Route
          path={ROUTES.signup}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.login}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.explore} element={<Explore />} />
          <Route path={ROUTES.notifications} element={<Notifications />} />
          <Route path={ROUTES.create} element={<CreatePost />} />
          <Route path="/:username" element={<Profile />} />
          <Route path={ROUTES.messages} element={<Messages />} />
          <Route path="/message/:id" element={<Messages />} />
        </Route>

        {/* Catch-All 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Modal Route */}
      {background && (
        <Routes>
          <Route path="/p/:postId" element={<PostDetails isOpen />} />
        </Routes>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}