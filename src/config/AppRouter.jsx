import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import LoadingSpinner from "../components/common/LoadingSpinner";
import routes from "./routes";

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullPage />}>
      <Routes>
        {routes.map((route) => {
          const Layout =
            route.layout === "public"
              ? PublicLayout
              : route.layout === "auth"
              ? AuthLayout
              : DashboardLayout;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.auth ? (
                  <ProtectedRoute roles={route.roles}>
                    <Layout>
                      <route.component />
                    </Layout>
                  </ProtectedRoute>
                ) : (
                  <Layout>
                    <route.component />
                  </Layout>
                )
              }
              exact={route.exact}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;