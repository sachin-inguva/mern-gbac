import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Outlet, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { SignIn } from "./components/SignIn";
import { AuthRoute, ErrorBoundary } from "./components/utils";
import { NavbarHeader } from "./components/utils/NavbarHeader";
import { HomeRouter } from "./routes/HomeRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route
              path="/"
              element={
                <AuthRoute>
                  <NavbarHeader />
                  <Outlet />
                </AuthRoute>
              }
            >
              {HomeRouter()}
            </Route>
            <Route path="*" element={() => <div>Page Not Found!</div>} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
