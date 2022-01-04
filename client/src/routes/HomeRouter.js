import React from "react";
import { Route } from "react-router-dom";

import { AuthRoute, PageNotFound } from "../components/utils";
import { ManageUsers } from "../components/ManageUsers";
import { Dashboard } from "../components/Dashboard";
import { Logout } from "../components/Logout";
import { Schedule } from "../components/Schedule";
import { Reports } from "../components/Reports";
import { useAuth } from "../context/auth-context";
import { Permissions } from "../components/Permissions";
import { Groups } from "../components/Groups";

const componentMapping = (route) => {
  switch (route) {
    case "manage-users":
      return <ManageUsers />;
    case "dashboard":
      return <Dashboard />;
    case "schedules":
      return <Schedule />;
    case "reports":
      return <Reports />;
    case "permissions":
      return <Permissions />;
    case "groups":
      return <Groups />;

    default:
      return <PageNotFound />;
  }
};

export function HomeRouter() {
  const { user } = useAuth();

  const userRoutes = user?.permission?.tabs?.map((tab) => {
    return (
      <Route
        key={tab}
        path={tab}
        element={<AuthRoute>{componentMapping(tab)}</AuthRoute>}
      />
    );
  });

  return (
    <React.Fragment>
      {userRoutes}
      <Route
        path="logout"
        element={
          <AuthRoute>
            <Logout />
          </AuthRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </React.Fragment>
  );
}
