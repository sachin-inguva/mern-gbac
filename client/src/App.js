import React, { Fragment } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Outlet, Route, Router, Routes, useRoutes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { SignIn } from "./components/SignIn";
import { Home } from "./components/Home";
import { ManageUsers } from "./components/ManageUsers";
import { AuthRoute, ErrorBoundary, PageNotFound } from "./components/utils";
import { AuthProvider, useAuth } from "./context/auth-context";
import { NavbarHeader } from "./components/utils/NavbarHeader";
import { Logout } from "./components/Logout";
import { Reports } from "./components/Reports";
import { Schedule } from "./components/Schedule";
import { Dashboard } from "./components/Dashboard";
import { GroupBasedRoutes } from "./routes/group-based-routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const componentMapping = (route) => {
  switch (route) {
    case "manage-users":
      return <ManageUsers />;
    case "dashboard":
      return <Dashboard />;
    // case 'manage-users':
    // return <ManageUsers/>

    default:
      break;
  }
};

function App() {
  const { user } = useAuth();

  // const userRoutes = user.permission.tabs.map((tab) => {
  //   return {
  //     path: tab,
  //     element: <AuthRoute>{componentMapping(tab)}</AuthRoute>,
  //   };
  // });

  // const element = useRoutes([
  //   {
  //     path: "/",
  //     element: (
  //       <AuthRoute>
  //         <NavbarHeader />
  //         <Outlet />
  //       </AuthRoute>
  //     ),
  //     children: userRoutes,
  //   },
  // ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <NavbarHeader />
                  <Outlet />
                </AuthRoute>
              }
            >
              <Route
                path="dashboard"
                element={
                  <AuthRoute>
                    <Dashboard />
                  </AuthRoute>
                }
              />
              <Route
                path="reports"
                element={
                  <AuthRoute>
                    <Reports />
                  </AuthRoute>
                }
              />
              <Route
                path="schedules"
                element={
                  <AuthRoute>
                    <Schedule />
                  </AuthRoute>
                }
              />
              <Route
                path="manage-users"
                element={
                  <AuthRoute>
                    <ManageUsers />
                  </AuthRoute>
                }
              />
              <Route
                path="permissions"
                element={<AuthRoute>schedules</AuthRoute>}
              />
              <Route
                path="groups"
                element={
                  <AuthRoute>
                    <div>schedules</div>
                  </AuthRoute>
                }
              />
              <Route
                path="logout"
                element={
                  <AuthRoute>
                    <Logout />
                  </AuthRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/login" element={<SignIn />} />
            <Route path="*" element={() => <div>Page Not Found!</div>} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
