import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import { SignIn } from "./components/SignIn";
import { Home } from "./components/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const PageNotFound = () => {
  return (
    <div>
      You don't have enough permissions to access this page, contact Admin
    </div>
  );
};

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/dashboard" element={<div>dashboard</div>} />
            <Route path="/reports" element={<div>reports</div>} />
            <Route path="/schedules" element={<div>schedules</div>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
