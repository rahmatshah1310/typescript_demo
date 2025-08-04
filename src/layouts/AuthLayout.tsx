import { Spinner } from "@components";
import { ROUTES } from "@constants";
import { useAuthContext } from "@context";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner type="beat" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
