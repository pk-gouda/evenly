import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage"; // placeholder

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  // canonical auth route (supports ?mode=signin|signup)
  { path: "/auth", element: <AuthPage /> },
  // friendly routes:
  { path: "/login", element: <AuthPage initial="signin" /> },
  { path: "/signup", element: <AuthPage initial="signup" /> },

  { path: "/dashboard", element: <DashboardPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
